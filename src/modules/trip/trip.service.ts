import { sendMail } from '../../common/utils';
import { env } from '../../config/env';
import { HttpCode } from '../../enums/http-code';
import { HttpError } from '../../errors/http-error';
import { dayjs } from '../../lib/dayjs';
import { ParticipantRepository } from '../participant/prisma/participant.repository';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripRepository } from './prisma/trip.repository';

const create = async (createTripDto: CreateTripDto) => {
  const {
    starts_at,
    ends_at,
    destination,
    owner_name,
    owner_email,
  } = createTripDto;

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

const confirm = async (updateTripDto: Pick<UpdateTripDto, 'id' | 'is_confirmed'>) => {
  const trip = await TripRepository.update(updateTripDto);

  const { id, destination, starts_at, ends_at } = trip;

  const formattedStartDate = dayjs(starts_at).format('LL');
  const formattedEndDate = dayjs(ends_at).format('LL');

  const participants = await ParticipantRepository.findAll(id);

  Promise.all(
    participants.filter(({ is_owner }) => !is_owner).map(async ({ id, email }) => {
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

export const TripService = { create, update, findById, confirm };
