import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { db } from "@/lib/mongodb";

export const auth = betterAuth({
  // Connect Better Auth to MongoDB
  database: mongodbAdapter(db),

  // Enable email and password authentication
  emailAndPassword: {
    enabled: true,
  },

  // Application URL
  baseURL: process.env.BETTER_AUTH_URL,

  // Secret key
  secret: process.env.BETTER_AUTH_SECRET,
});
