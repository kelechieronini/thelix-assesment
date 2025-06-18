import { start } from "repl";
import { api } from "./api.config";
import { StatsType } from "../types/stats.type";
import { GetProductResponseType } from "../types/product.type";
import { BestSellerResponseType } from "../types/best-sellers.type";

export type StatsQuery = {
  startDate: string;
  endDate: string;
};

export const getTotalOrdersStats = async ({ startDate, endDate }: StatsQuery) =>
  await api.get<StatsType>(
    `/stats/total-order?start_date=${startDate}&end_date=${endDate}`,
  );

export const getTotalCustomerStats = async ({
  startDate,
  endDate,
}: StatsQuery) =>
  await api.get<StatsType>(
    `/stats/total-customer?start_date=${startDate}&end_date=${endDate}`,
  );

export const getTotalProductsSoldStats = async ({
  startDate,
  endDate,
}: StatsQuery) =>
  await api.get<StatsType>(
    `/stats/total-products-sold?start_date=${startDate}&end_date=${endDate}`,
  );

export const getTotalRevenueStats = async ({
  startDate,
  endDate,
}: StatsQuery) =>
  await api.get<StatsType>(
    `/stats/total-revenue?start_date=${startDate}&end_date=${endDate}`,
  );

export const getBestSellers = async () =>
  await api.get<BestSellerResponseType>("/stats/best-sellers");
