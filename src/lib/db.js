import pg from 'pg';
const { Pool } = pg;

const connect = new Pool({
  connectionString: process.env.DB_URL
});

export default connect;