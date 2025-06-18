import { api } from "./api.config";
import { UserType } from "../types/user.type";
import { ProfileSchema } from "../schema/profile.schema";

export const _getProfile = async () => await api.get<UserType>("/user/profile");

export const _updateProfile = async (data: ProfileSchema) =>
  await api.patch("/user/profile", data);
