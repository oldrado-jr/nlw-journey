import { sendMail } from '../../common/utils';
import { env } from '../../config/env';
import { HttpCode } from '../../enums/http-code';
import { HttpError } from '../../errors/http-error';
import { dayjs } from '../../lib/dayjs';
import type { CreateTripDto } from './dto/create-trip.dto';
import type { UpdateTripDto } from './dto/update-trip.dto';
import { TripRepository } from './prisma/trip.repository';

const create = async (createTripDto: CreateTripDto) => {
  const { starts_at, ends_at, destination, owner_name, owner_email } =
    createTripDto;

  if (dayjs(starts_at).isBefore(new Date())) {
    throw new HttpError(HttpCode.BAD_REQUEST, 'Invalid trip start date.');
  }

  if (dayjs(ends_at).isBefore(starts_at)) {
    throw new HttpError(HttpCode.BAD_REQUEST, 'Invalid trip end date.');
  }

  const trip = await TripRepository.create(createTripDto);

  const formattedStartDate = dayjs(starts_at).format('LL');
  const formattedEndDate = dayjs(ends_at).format('LL');

  const confirmationLink = `${env.API_BASE_URL}/trips/${trip.id}/confirm`;

  sendMail({
    to: {
      name: owner_name,
      address: owner_email,
    },
    subject: `Confirme sua viagem para ${destination} em ${formattedStartDate}`,
    html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
        <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de
        <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
        <p></p>
        <p>Para confirmar sua viagem, clique no link abaixo:</p>
        <p></p>
        <p>
            <a href="${confirmationLink}" target="_blank">Confirmar viagem</a>
        </p>
        <p></p>
        <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
      </div>
    `.trim(),
  });

  return trip;
};

const update = async (updateTripDto: UpdateTripDto) => {
  const { starts_at, ends_at } = updateTripDto;

  if (dayjs(starts_at).isBefore(new Date())) {
    throw new HttpError(HttpCode.BAD_REQUEST, 'Invalid trip start date.');
  }

  if (dayjs(ends_at).isBefore(starts_at)) {
    throw new HttpError(HttpCode.BAD_REQUEST, 'Invalid trip end date.');
  }

  return TripRepository.update(updateTripDto);
};

const findById = async (id: string) => {
  const trip = await TripRepository.findById(id);

  if (!trip) {
    throw new HttpError(HttpCode.NOT_FOUND, 'Trip not found.');
  }

  return trip;
};

const confirm = async (
  updateTripDto: Pick<UpdateTripDto, 'id' | 'is_confirmed'>,
) => {
  await TripRepository.update(updateTripDto);

  const trip = await TripRepository.findTripParticipants(
    updateTripDto.id,
    false,
  );

  if (!trip) {
    throw new HttpError(HttpCode.NOT_FOUND, 'Trip not found.');
  }

  const { destination, starts_at, ends_at, participants } = trip;

  const formattedStartDate = dayjs(starts_at).format('LL');
  const formattedEndDate = dayjs(ends_at).format('LL');

  Promise.all(
    participants.map(async ({ id, email }) => {
      const confirmationLink = `${env.API_BASE_URL}/participants/${id}/confirm`;

      sendMail({
        to: email,
        subject: `Confirme sua presença na viagem para ${destination} em ${formattedStartDate}`,
        html: `
          <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
            <p>Você foi convidado(a) para participar de uma viagem para <strong>${destination}</strong> nas datas de
            <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
            <p></p>
            <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
            <p></p>
            <p>
                <a href="${confirmationLink}" target="_blank">Confirmar viagem</a>
            </p>
            <p></p>
            <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
          </div>
        `.trim(),
      });
    }),
  );
};

const findTripLinks = async (tripId: string) => {
  const trip = await TripRepository.findTripLinks(tripId);

  if (!trip) {
    throw new HttpError(HttpCode.NOT_FOUND, 'Trip not found.');
  }

  return trip.links;
};

const findTripActivities = async (tripId: string) => {
  const trip = await TripRepository.findTripActivities(tripId);

  if (!trip) {
    throw new HttpError(HttpCode.NOT_FOUND, 'Trip not found.');
  }

  const { starts_at, ends_at, activities } = trip;

  const differenceInDaysBetweenStartAneEnd = dayjs(ends_at).diff(
    starts_at,
    'days',
  );

  return Array.from({
    length: differenceInDaysBetweenStartAneEnd + 1,
  }).map((_, index) => {
    const date = dayjs(starts_at).add(index, 'days');

    return {
      date: date.toDate(),
      activities: activities.filter(({ occurs_at }) =>
        dayjs(occurs_at).isSame(date, 'day'),
      ),
    };
  });
};

const findTripParticipants = async (tripId: string) => {
  const trip = await TripRepository.findTripParticipants(tripId);

  if (!trip) {
    throw new HttpError(HttpCode.NOT_FOUND, 'Trip not found.');
  }

  return trip.participants;
};

export const TripService = {
  create,
  update,
  findById,
  confirm,
  findTripLinks,
  findTripActivities,
  findTripParticipants,
};
