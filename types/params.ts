export type SearchParams = {
    brand?: string | undefined;
    price?: string | undefined;
    minMileage?: string | undefined;
    maxMileage?: string | undefined;
    perPage?: string | undefined;
    page?: string | undefined;
}

export type FilterParams = {
    brands: string[];
    price: {
        min: number;
        max: number;
    };
}