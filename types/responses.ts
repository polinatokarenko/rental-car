import type { Car } from "@/types/car";

export interface GetCarsResponse {
    cars: Car[];
    totalCars: number;
    page: number;
    totalPages: number;
}