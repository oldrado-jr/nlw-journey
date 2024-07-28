import { prisma } from '../../../lib/prisma';
import { CreateActivityDto } from '../dto/create-activity.dto';

const create = async (createActivityDto: CreateActivityDto) => {
  return prisma.activity.create({ data: createActivityDto });
};

export const ActivityRepository = { create };
