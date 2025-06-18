import { SigninSchema } from "../schema/signin.schema";
import { SignupSchema } from "../schema/signup.schema";
import { api } from "./api.config";
import { AuthenticationType } from "../types/auth.type";

export const _signin = async (data: SigninSchema) =>
  await api.post<AuthenticationType>("/auth/login", data);

export const _signup = async (data: SignupSchema) =>
  await api.post<AuthenticationType>("/auth/signup", data);
