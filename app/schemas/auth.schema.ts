// src/schemas/auth.schema.ts
import { z } from "zod";
import { UserSchema } from "./user.schema";

export const SignupSchema = UserSchema.extend({
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "رمز عبور و تائید یکسان نیستند",
});

export type SignupFormType = z.infer <typeof SignupSchema>

export const LoginSchema = UserSchema.pick({
    email: true,
    password: true,
})
export type LoginFormType = z.infer<typeof LoginSchema>;