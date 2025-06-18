import { GetTransactionsType } from "../types/transaction.type";
import { api } from "./api.config";

export const _getTransactions = async (page: number) =>
  await api.get<GetTransactionsType>(`/payment-reference?page=${page}`);
