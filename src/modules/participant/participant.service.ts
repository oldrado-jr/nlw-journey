import { sendMail } from '../../common/utils';
import { env } from '../../config/env';
import { HttpCode } from '../../enums/http-code';
import { HttpError } from '../../errors/http-error';
import { dayjs } from '../../lib/dayjs';
import { TripService } from '../trip/trip.service';
import type { CreateParticipantDto } from './dto/create-participant.dto';
import type { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantRepository } from './prisma/participant.repository';

const create = async (createParticipantDto: CreateParticipantDto) => {
  const { email, trip_id } = createParticipantDto;

  const trip = await TripService.findById(trip_id);
  const participant = await ParticipantRepository.create(createParticipantDto);

  const { destination, starts_at, ends_at } = trip;

  const formattedStartDate = dayjs(starts_at).format('LL');
  const formattedEndDate = dayjs(ends_at).format('LL');

  const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`;

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

  return participant;
};

const update = async (updateParticipantDto: UpdateParticipantDto) => {
  return ParticipantRepository.update(updateParticipantDto);
};

const findById = async (id: string) => {
  const participant = await ParticipantRepository.findById(id);

  if (!participant) {
    throw new HttpError(HttpCode.NOT_FOUND, 'Participant not found.');
  }

  return participant;
};

export const ParticipantService = { create, update, findById };
