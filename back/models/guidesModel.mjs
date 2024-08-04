import sql from '../postgres.mjs';

export const pg_getGuideByEmail = async (email) => {
  const user = await sql`
    SELECT * FROM guides
    WHERE email = ${email}`;
  return user[0];
};

export const pg_getGuideByPhoneNumber = async (phone_number) => {
  const user = await sql`
    SELECT * FROM guides
    WHERE phone_number = ${phone_number}`;
  return user[0];
};

export const pg_postGuide = async (name, lastname, description, phone_number, email, age) => {
  try {
    const new_guide = await sql`
    INSERT INTO guides (name, lastname, description, phone_number, email, age)
    VALUES (${name}, ${lastname}, ${description}, ${phone_number}, ${email}, ${age})
    RETURNING *
    `;
    return new_guide;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const pg_getGuideById = async (id) => {
  const guide = await sql`
  SELECT * 
  FROM guides
  WHERE ID = ${id}`
  return guide[0]
}

export const pg_getGuides = async () => {
  const guides = await sql`
  SELECT * FROM guides`
  return guides
}