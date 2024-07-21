import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantService } from './participant.service';

const create = async (createParticipantDto: CreateParticipantDto) => {
  return ParticipantService.create(createParticipantDto);
};

const update = async (updateParticipantDto: UpdateParticipantDto) => {
  return ParticipantService.update(updateParticipantDto);
};

const findById = async (id: string) => {
  return ParticipantService.findById(id);
};

const findAll = async (tripId: string) => {
  return ParticipantService.findAll(tripId);
};

export const ParticipantController = { create, update, findById, findAll };
