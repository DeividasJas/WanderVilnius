import postgres from "postgres";
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'prod') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config({ path: '.env.dev' });
}

const ssl =
  process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false;


const sql = postgres({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT,
  ssl
});

export default sql;
