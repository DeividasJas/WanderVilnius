import sql from '../postgres.mjs';

export const pg_newRegistration = async (user_id, tour_id, tour_time_id) => {
  const registration = await sql`
    INSERT INTO registrations (user_id, tour_id, tour_time_id)
    VALUES(${user_id}, ${tour_id}, ${tour_time_id})
    RETURNING *`;
  return registration[0];
};
