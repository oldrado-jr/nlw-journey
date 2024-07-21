import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';

const create = async (createActivityDto: CreateActivityDto) => {
  return ActivityService.create(createActivityDto);
};

const findAll = async (tripId: string) => {
  return ActivityService.findAll(tripId);
};

export const ActivityController = { create, findAll };
