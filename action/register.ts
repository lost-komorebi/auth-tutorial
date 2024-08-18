"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // for testing transition
  // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  // await sleep(2000);

  //  safeParse validate the fields without throwing errors when validation fails,
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validateFields.data;
  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // ensure the email is not taken
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }
  // insert user into database
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //TODO: Send verification token email

  return { success: "User created!" };
};
