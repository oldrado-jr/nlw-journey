import { prisma } from '../../../lib/prisma';
import { CreateParticipantDto } from '../dto/create-participant.dto';
import { UpdateParticipantDto } from '../dto/update-participant.dto';

const create = async (createParticipantDto: CreateParticipantDto) => {
  return prisma.participant.create({ data: createParticipantDto });
};

const update = async (updateParticipantDto: UpdateParticipantDto) => {
  const { id, is_confirmed } = updateParticipantDto;

  return prisma.participant.update({
    where: { id },
    data: { is_confirmed },
  });
};

const findById = async (id: string) => {
  return prisma.participant.findUnique({ where: { id } });
};

const findAll = async (tripId: string) => {
  return prisma.participant.findMany({ where: { trip_id: tripId } });
};

export const ParticipantRepository = { create, update, findById, findAll };
