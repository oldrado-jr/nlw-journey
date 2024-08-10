import { HttpCode } from '../../enums/http-code';
import { HttpError } from '../../errors/http-error';
import { dayjs } from '../../lib/dayjs';
import { TripService } from '../trip/trip.service';
import type { CreateActivityDto } from './dto/create-activity.dto';
import { ActivityRepository } from './prisma/activity.repository';

const create = async (createActivityDto: CreateActivityDto) => {
  const { occurs_at, trip_id } = createActivityDto;
  const trip = await TripService.findById(trip_id);

  const { starts_at, ends_at } = trip;

  if (
    dayjs(occurs_at).isBefore(starts_at) ||
    dayjs(occurs_at).isAfter(ends_at)
  ) {
    throw new HttpError(HttpCode.BAD_REQUEST, 'Invalid activity date.');
  }

  return ActivityRepository.create(createActivityDto);
};

export const ActivityService = { create };
