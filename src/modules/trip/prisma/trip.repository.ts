import { prisma } from '../../../lib/prisma';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';

const create = async (createTripDto: CreateTripDto) => {
  const {
    destination,
    starts_at,
    ends_at,
    owner_name,
    owner_email,
    emails_to_invite,
  } = createTripDto;

  return prisma.trip.create({
    data: {
      destination,
      starts_at,
      ends_at,
      participants: {
        createMany: {
          data: [
            {
              name: owner_name,
              email: owner_email,
              is_owner: true,
              is_confirmed: true,
            },
            ...emails_to_invite.map((email) => ({ email }))
          ],
        },
      },
    },
  });
};

const update = async (updateTripDto: UpdateTripDto) => {
  const { id, ...tripData } = updateTripDto;

  return prisma.trip.update({
    where: { id },
    data: tripData,
  });
};

const findById = async (id: string) => {
  return prisma.trip.findUnique({
    where: { id },
    select: {
      id: true,
      destination: true,
      starts_at: true,
      ends_at: true,
      is_confirmed: true,
    },
  });
};

const findTripLinks = async (tripId: string) => {
  return prisma.trip.findUnique({
    where: { id: tripId },
    include: { links: true },
  });
};

const findTripActivities = async (tripId: string) => {
  return prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      activities: {
        orderBy: {
          occurs_at: 'asc',
        },
      },
    },
  });
};

const findTripParticipants = async (tripId: string, isOwner?: boolean) => {
  return prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    include: {
      participants: {
        where: {
          is_owner: isOwner,
        },
        select: {
          id: true,
          name: true,
          email: true,
          is_confirmed: true,
        },
      },
    },
  });
};

export const TripRepository = {
  create,
  update,
  findById,
  findTripLinks,
  findTripActivities,
  findTripParticipants,
};
