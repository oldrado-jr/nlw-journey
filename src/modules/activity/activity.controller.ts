import { ActivityService } from './activity.service';
import type { CreateActivityDto } from './dto/create-activity.dto';

const create = async (createActivityDto: CreateActivityDto) => {
  return ActivityService.create(createActivityDto);
};

export const ActivityController = { create };
