import { CreateOrderSchema } from "../schema/create-order.schema";
import { PaymentRefSchema } from "../schema/payment-ref.schema";
import {
  GetOrderDetailResponse,
  GetOrdersResponse,
  Order,
  OrderDetail,
} from "../types/order.type";
import { api } from "./api.config";

export const _getOrders = async (page: number) =>
  await api.get<GetOrdersResponse>(`/order?page=${page}`);

export const _getOrder = async (orderID: string) =>
  await api.get<Order>(`/order/${orderID}`);

export const _getOrderDetail = async (orderID: string) =>
  await api.get<GetOrderDetailResponse>(`/order/${orderID}/order-details`);

export const _createOrder = async (data: CreateOrderSchema) =>
  await api.post<Order>("/order", data);

export const _addPaymentReference = async (payload: {
  id: string;
  data: PaymentRefSchema;
}) => await api.patch(`/order/${payload.id}/payment-reference`, payload.data);
