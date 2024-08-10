import { prisma } from '../../../lib/prisma';
import type { CreateLinkDto } from '../dto/create-link.dto';

const create = async (createLinkDto: CreateLinkDto) => {
  return prisma.link.create({ data: createLinkDto });
};

export const LinkRepository = { create };
