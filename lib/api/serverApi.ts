import nextServer from "./api";
import type { Car } from "@/types/car";
import type { SearchParams } from "@/types/params";
import type { GetCarsResponse } from "@/types/responses";

export const runtime = "nodejs";

export async function getCars(params: SearchParams): Promise<GetCarsResponse> {
  const res = await nextServer.get<GetCarsResponse>("/cars", { params });
  return res.data;
}

export async function getCarById(id: string): Promise<Car> {
  const res = await nextServer.get<Car>(`/cars/${id}`);
  return res.data;
}