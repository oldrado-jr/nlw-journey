import { HttpCode } from '../../enums/http-code';
import { HttpError } from '../../errors/http-error';
import { dayjs } from '../../lib/dayjs';
import { TripService } from '../trip/trip.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ActivityRepository } from './prisma/activity.repository';

const create = async (createActivityDto: CreateActivityDto) => {
  const { occurs_at, trip_id } = createActivityDto;
  const trip = await TripService.findById(trip_id);

  const { starts_at, ends_at } = trip;

  if (
    dayjs(occurs_at).isBefore(starts_at)
    || dayjs(occurs_at).isAfter(ends_at)
  ) {
    throw new HttpError(HttpCode.BAD_REQUEST, 'Invalid activity date.');
  }

  return ActivityRepository.create(createActivityDto);
};

const findAll = async (tripId: string) => {
  const [trip, activities] = await Promise.all([
    TripService.findById(tripId),
    ActivityRepository.findAll(tripId),
  ]);

  const { starts_at, ends_at } = trip;

  const differenceInDaysBetweenStartAneEnd = dayjs(ends_at).diff(starts_at, 'days');

  return Array.from({
    length: differenceInDaysBetweenStartAneEnd + 1,
  }).map((_, index) => {
    const date = dayjs(starts_at).add(index, 'days');

    return {
      date: date.toDate(),
      activities: activities.filter(({ occurs_at }) => dayjs(occurs_at).isSame(date, 'day')),
    };
  });
};

export const ActivityService = { create, findAll };
