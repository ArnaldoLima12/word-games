import pg from 'pg';
import { config } from 'dotenv';

const { Pool } = pg;

const connect = new Pool({
  connectionString: process.env.POSTGRES_URL
});


export default connect;