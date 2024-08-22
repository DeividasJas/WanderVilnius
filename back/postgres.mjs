import postgres from 'postgres';

const sql = postgres({
  host: 'localhost', // Postgres server
  port: 5432, // Postgres server port
  database: 'vilnius_tours', // Database name
  username: 'jasas', // Database username
  password: '', // Database password
});

export default sql;