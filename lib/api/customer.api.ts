import { api } from "./api.config";
import { Customer, GetCustomersResponse } from "../types/customer.type";
import { GetOrdersResponse } from "../types/order.type";

export const _getCustomers = async (page: number) =>
  await api.get<GetCustomersResponse>(`/customer?page=${page}`);

export const _getCustomer = async (id: string) =>
  await api.get<Customer>(`/customer/${id}`);

export const _getCustomerOrder = async (customerId: string, page: number) =>
  await api.get<GetOrdersResponse>(
    `/customer/${customerId}/order?page=${page}`
  );
