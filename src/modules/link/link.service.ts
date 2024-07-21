import { CreateLinkDto } from './dto/create-link.dto';
import { LinkRepository } from './prisma/link.repository';

const create = async (createLinkDto: CreateLinkDto) => {
  return LinkRepository.create(createLinkDto);
};

const findAll = async (tripId: string) => {
  return LinkRepository.findAll(tripId);
};

export const LinkService = { create, findAll };
