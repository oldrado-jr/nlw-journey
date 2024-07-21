import { prisma } from '../../../lib/prisma';
import { CreateActivityDto } from '../dto/create-activity.dto';

const create = async (createActivityDto: CreateActivityDto) => {
  return prisma.activity.create({ data: createActivityDto });
};

const findAll = async (tripId: string) => {
  return prisma.activity.findMany({
    where: { trip_id: tripId },
    orderBy: {
      occurs_at: 'asc',
    },
  });
};

export const ActivityRepository = { create, findAll };
