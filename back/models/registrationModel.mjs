import sql from "../postgres.mjs";

export const pg_newRegistration = async (user_id, tour_id, tour_time_id) => {
  await sql`
  UPDATE tour_times
    SET registered_participants = registered_participants + 1
    WHERE id = ${tour_time_id}`;

  const registration = await sql`
    INSERT INTO registrations (user_id, tour_id, tour_time_id)
    VALUES(${user_id}, ${tour_id}, ${tour_time_id})
    RETURNING *`;
  return registration[0];
};
export const pg_maximum_participants = async (tour_id) => {
  const result = await sql`
  SELECT maximum_participants
  FROM tours
  WHERE tours.id = ${tour_id}`;
  return result[0].maximum_participants;
};

export const pg_registered_participants = async (tour_time_id) => {
  const result = await sql`
  SELECT registered_participants
  FROM tour_times
  WHERE tour_times.id = ${tour_time_id}`;
  return result[0].registered_participants;
};
