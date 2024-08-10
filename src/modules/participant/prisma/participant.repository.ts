import { prisma } from '../../../lib/prisma';
import type { CreateParticipantDto } from '../dto/create-participant.dto';
import type { UpdateParticipantDto } from '../dto/update-participant.dto';

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
  return prisma.participant.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      is_confirmed: true,
    },
  });
};

export const ParticipantRepository = { create, update, findById };
