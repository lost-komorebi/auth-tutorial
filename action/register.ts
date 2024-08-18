"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // for testing transition
  // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  // await sleep(2000);

  //  safeParse validate the fields without throwing errors when validation fails,
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }
  return { success: "Email sent" };
};
