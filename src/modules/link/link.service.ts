import { CreateLinkDto } from './dto/create-link.dto';
import { LinkRepository } from './prisma/link.repository';

const create = async (createLinkDto: CreateLinkDto) => {
  return LinkRepository.create(createLinkDto);
};

export const LinkService = { create };
