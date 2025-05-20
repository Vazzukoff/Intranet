import { readFileSync } from "fs";
import path from "path";

import { config } from "@/config/environment";
import * as db from "@/db";

async function seed() {
  try {
    console.log(`Seeding database: ${config.DB_NAME}`);

    const sql = readFileSync(
      path.join(__dirname, "../seeds/seed.sql")
    ).toString();

    await db.query(sql);
    console.log(`Database ${config.DB_NAME} seeded successfully.`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await db.closeConnection();
  }
}

// Handle the promise and process exit properly
seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Database seeding failed:", error);
    process.exit(1);
  });