"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // for testing transition
  // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  // await sleep(2000);

  //  safeParse validate the fields without throwing errors when validation fails,
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  return { success: "Email sent" };
};
