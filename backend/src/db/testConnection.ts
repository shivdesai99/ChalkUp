import pool from './db';

const testConnection = async (): Promise<void> => {
  console.log('Starting test connection...'); // Debug log

  try {
    const result = await pool.query<{ now: Date }>('SELECT NOW()');
    console.log('Database time:', result.rows[0].now); // Log the database response
  } catch (error) {
    console.error('Error testing the database connection:', error); // Log errors
  } finally {
    await pool.end();
    console.log('Pool closed.'); // Confirm pool closure
  }
};

testConnection();
