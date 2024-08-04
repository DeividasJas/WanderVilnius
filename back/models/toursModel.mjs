import sql from '../postgres.mjs';

export const pg_postTour = async (
  name,
  description,
  is_group,
  location,
  maximum_participants,
  registered_participants
) => {
  try {
    const newTour = await sql`
    INSERT INTO tours (name, description, is_group, location, maximum_participants)
    VALUES (${name}, ${description}, ${is_group}, ${location}, ${maximum_participants})
    RETURNING *
    `;
    return newTour[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const pg_getGroupTours = async () => {
  const groupTours = await sql`
  SELECT * FROM tours
  WHERE is_group = true`;
  return groupTours;
};

export const pg_getSoloTours = async () => {
  const groupTours = await sql`
  SELECT * FROM tours
  WHERE is_group = false`;
  return groupTours;
};

export const pg_getTourById = async (id) => {
  const tour = await sql`
  SELECT * FROM tours
  WHERE id = ${id}`;
  return tour[0];
};

export const pg_deleteTour = async (id) => {
    await sql`
    DELETE FROM tours
    WHERE id = ${id}`

    const deletedTour = await sql`
    SELECT * FROM tours
    WHERE id = ${id}`
    return deletedTour[0]
}

export const pg_registerNewTourTime = async (tour_id, tour_date_time) => {
  const tourTime = await sql`
  INSERT INTO tour_times (tour_id, tour_date_time)
  VALUES (${tour_id}, ${tour_date_time})
  RETURNING *`
  return tourTime[0]
}

export const pg_deleteTourTime = async (id) => {
  const deletedTime = await sql`
  DELETE FROM tour_times
  WHERE id = ${id}`
  return deletedTime
}