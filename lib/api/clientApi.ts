import nextServer from "./api";
import type { Car } from "@/types/car";

interface GetCarsParams {
    brand?: string;
    price?: string;
    minMileage?: number;
    maxMileage?: number;
    perPage?: number;
    page?: number;
}

interface GetCarsResponse {
    cars: Car[];
    totalCars: number;
    page: number;
    totalPages: number;
}

export async function getCars(params: GetCarsParams): Promise<GetCarsResponse> {
  const res = await nextServer.get<GetCarsResponse>("/cars", { params });
  return res.data;
}

export async function getCarById(id: string): Promise<Car> {
  const res = await nextServer.get<Car>(`/cars/${id}`);
  return res.data;
}
interface createBookRequestParams {
  carId: string;
  name: string;
  email: string;
  comment: string;
}

export async function createBookRequest(params: createBookRequestParams) {
  const res = await nextServer.post<string>("cars")
}