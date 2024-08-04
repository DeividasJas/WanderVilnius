import sql from '../postgres.mjs';

export const pg_getAllUsers = async () => {
  try {
    const allUsers = await sql`
    SELECT id, name, lastname, email, phone_number, role
    FROM USERS`;
    return allUsers;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const pg_getUserById = async (id) => {
  const user = await sql`
  SELECT id, name, lastname, email, phone_number, role
  FROM users
  WHERE id = ${id}`
  return user[0]
}

export const pg_getUserByEmail = async (email) => {
  const user = await sql`
    SELECT * FROM users
    WHERE email = ${email}`;
  return user[0];
};

export const pg_getUserByPhoneNumber = async (phone_number) => {
  const user = await sql`
    SELECT * FROM users
    WHERE phone_number = ${phone_number}`;
  return user[0];
};

export const pg_postUser = async (
  name,
  lastname,
  email,
  phone_number,
  password
) => {
  try {
    const newUser = await sql`
    INSERT INTO users (name, lastname, email, phone_number, password)
    VALUES (${name}, ${lastname}, ${email}, ${phone_number}, ${password})
    RETURNING *
    `;
    return newUser[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

// export const pg_getUserById