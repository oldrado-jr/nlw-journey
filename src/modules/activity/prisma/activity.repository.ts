import { prisma } from '../../../lib/prisma';
import type { CreateActivityDto } from '../dto/create-activity.dto';

const create = async (createActivityDto: CreateActivityDto) => {
  return prisma.activity.create({ data: createActivityDto });
};

export const ActivityRepository = { create };
