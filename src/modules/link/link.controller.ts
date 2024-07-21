import { TripService } from '../trip/trip.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { LinkService } from './link.service';

const create = async (createLinkDto: CreateLinkDto) => {
  const { trip_id } = createLinkDto;
  await TripService.findById(trip_id);

  return LinkService.create(createLinkDto);
};

const findAll = async (tripId: string) => {
  await TripService.findById(tripId);

  return LinkService.findAll(tripId);
};

export const LinkController = { create, findAll };
