import { SaveAddressSchema } from "../schema/save-address.schema";
import { GetAddressType } from "../types/address.type";
import { api } from "./api.config";

export const _getAddresses = async () =>
  await api.get<GetAddressType>("/address?limit=30");

export const _addAddress = async (data: SaveAddressSchema) =>
  await api.post("/address", data);

export const _deleteAddress = async (id: string) =>
  await api.delete(`/address/${id}`);

export const _editAddress = async (payload: {
  id: string;
  data: SaveAddressSchema;
}) => api.patch(`/address/${payload.id}`, payload.data);
