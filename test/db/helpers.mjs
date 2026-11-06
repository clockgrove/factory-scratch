// A fresh schema per test file against DATABASE_URL, so files can run in any order.
import { connect, migrate } from "../../src/db.mjs";

export async function freshClient(name) {
  const client = await connect();
  const schema = `t_${name}_${process.pid}`;
  // Serialise setup across test files and keep pgvector in public, so concurrent files neither race
  // on CREATE EXTENSION nor drop the extension with their schema.
  await client.query("SELECT pg_advisory_lock(hashtext('factory-test-db'))");
  try {
    await client.query("CREATE EXTENSION IF NOT EXISTS vector SCHEMA public");
    await client.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
    await client.query(`CREATE SCHEMA ${schema}`);
    await client.query(`SET search_path TO ${schema}, public`);
    await migrate(client);
  } finally {
    await client.query("SELECT pg_advisory_unlock(hashtext('factory-test-db'))");
  }
  return { client, async done() { await client.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`); await client.end(); } };
}
