import { env } from "@/data/env/server";
import { defineConfig } from "drizzle-kit";

//? Refer Documentaion to setup

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
