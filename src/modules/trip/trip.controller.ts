import type { CreateTripDto } from './dto/create-trip.dto';
import type { UpdateTripDto } from './dto/update-trip.dto';
import { TripService } from './trip.service';

const create = async (createTripDto: CreateTripDto) => {
  return TripService.create(createTripDto);
};

const update = async (updateTripDto: UpdateTripDto) => {
  const { id } = updateTripDto;
  await TripService.findById(id);

  return TripService.update(updateTripDto);
};

const findById = async (id: string) => {
  return TripService.findById(id);
};

const confirm = async (
  updateTripDto: Pick<UpdateTripDto, 'id' | 'is_confirmed'>,
) => {
  TripService.confirm(updateTripDto);
};

const findTripLinks = async (tripId: string) => {
  return TripService.findTripLinks(tripId);
};

const findTripActivities = async (tripId: string) => {
  return TripService.findTripActivities(tripId);
};

const findTripParticipants = async (tripId: string) => {
  return TripService.findTripParticipants(tripId);
};

export const TripController = {
  create,
  update,
  findById,
  confirm,
  findTripLinks,
  findTripActivities,
  findTripParticipants,
};
