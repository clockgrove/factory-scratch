// A fresh schema per test file against DATABASE_URL, so files can run in any order.
import { connect, migrate } from "../../src/db.mjs";

export async function freshClient(name) {
  const client = await connect();
  const schema = `t_${name}_${process.pid}`;
  await client.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
  await client.query(`CREATE SCHEMA ${schema}`);
  await client.query(`SET search_path TO ${schema}, public`);
  await migrate(client);
  return { client, async done() { await client.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`); await client.end(); } };
}
