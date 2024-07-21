import { prisma } from '../../../lib/prisma';
import { CreateLinkDto } from '../dto/create-link.dto';

const create = async (createLinkDto: CreateLinkDto) => {
  return prisma.link.create({ data: createLinkDto });
};

const findAll = async (tripId: string) => {
  return prisma.link.findMany({ where: { trip_id: tripId } });
};

export const LinkRepository = { create, findAll };
