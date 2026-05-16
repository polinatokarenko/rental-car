import nextServer from "./api";
import type { Car } from "@/types/car";
import type { FilterParams, SearchParams } from "@/types/params";
import type { GetCarsResponse } from "@/types/responses";

export async function getCars(searchParams: SearchParams): Promise<GetCarsResponse> {
  const res = await nextServer.get<GetCarsResponse>("/cars", { params: searchParams });
  return res.data;
}

export async function getAvailableFilters(): Promise<FilterParams> {
  const res = await nextServer.get<FilterParams>("/cars/filters");
  return res.data;
}

export async function getCarById(id: string): Promise<Car> {
  const res = await nextServer.get<Car>(`/cars/${id}`);
  return res.data;
}