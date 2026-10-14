// Test fixture for the DevDigest CI review: deliberately insecure code.
import { Client } from "pg";

const DB_PASSWORD = "SuperSecret-Prod-Passw0rd!";

export async function findUserByName(name: string) {
  const db = new Client({ host: "db.internal", user: "admin", password: DB_PASSWORD });
  await db.connect();
  // SQL built by string concatenation with user input
  const res = await db.query("SELECT * FROM users WHERE name = '" + name + "'");
  return res.rows;
}