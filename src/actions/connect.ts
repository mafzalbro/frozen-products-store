import mysql, { Connection, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { config } from 'dotenv';

config();

// Function to create a new database connection
export async function getConnection(): Promise<Connection> {
  return mysql.createConnection({
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
  });
}

// Function to execute a query
export async function query<T extends RowDataPacket[]>(sql: string, params: any[] = []): Promise<[T, ResultSetHeader]> {
  const connection = await getConnection();
  try {
    // Execute the query and get results
    const [results, metadata] = await connection.execute<T>(sql, params);

    // Ensure correct types
    return [results as T, metadata as unknown as ResultSetHeader];
  } finally {
    await connection.end(); // Ensure the connection is closed after query execution
  }
}
