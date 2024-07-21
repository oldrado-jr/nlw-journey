export type UpdateTripDto = {
  id: string;
  destination?: string;
  starts_at?: Date;
  ends_at?: Date;
  is_confirmed?: boolean;
};
