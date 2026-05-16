import nextServer from "./api";
import type { Car } from "@/types/car";
import type { FilterParams, SearchParams } from "@/types/params";
import type { GetCarsResponse } from "@/types/responses";

export async function getCars(params: SearchParams): Promise<GetCarsResponse> {
  const res = await nextServer.get<GetCarsResponse>("/cars", { params });
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
interface createBookingRequestProps {
  carId: string;
  name: string;
  email: string;
  comment: string;
}

export async function createBookingRequest(params: createBookingRequestProps) {
  const res = await nextServer.post<string>(`cars/${params.carId}/booking-requests`, {
    name: params.name,
    email: params.email,
    comment: params.comment
  });

  return res.data;
}