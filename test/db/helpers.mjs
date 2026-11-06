// A fresh schema per test file against DATABASE_URL, so files can run in any order.
import { connect, migrate } from "../../src/db.mjs";

export async function freshClient(name) {
  const client = await connect();
  const schema = `t_${name}_${process.pid}`;
  // pgvector lives in public, not in a test schema whose DROP would take it away from a parallel file.
  await client.query("CREATE EXTENSION IF NOT EXISTS vector SCHEMA public").catch((e) => { if (e.code !== "23505" && e.code !== "42710") throw e; });
  await client.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
  await client.query(`CREATE SCHEMA ${schema}`);
  await client.query(`SET search_path TO ${schema}, public`);
  await migrate(client);
  return { client, async done() { await client.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`); await client.end(); } };
}
