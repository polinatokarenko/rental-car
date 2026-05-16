import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import CatalogClient from "./Catalog.client";
import { getAvailableFilters, getCars } from "@/lib/api/serverApi";
import type { SearchParams } from "@/types/params";

type CatalogProps = {
  searchParams: SearchParams;
};

export default async function Catalog({ searchParams }: CatalogProps) {
  const { brand, price, minMileage, maxMileage, perPage, page } = await searchParams;

  const queryClient = new QueryClient();

  const queryParams: SearchParams = {
    ...(brand !== undefined && { brand }),
    ...(price !== undefined && { price }),
    ...(minMileage !== undefined && { minMileage }),
    ...(maxMileage !== undefined && { maxMileage }),
    ...(perPage !== undefined && { perPage }),
    ...(page !== undefined && { page }),
  };

  await queryClient.prefetchQuery({
    queryKey: ["cars", queryParams],
    queryFn: () => getCars(queryParams),
  });

  await queryClient.prefetchQuery({
    queryKey: ["filters"],
    queryFn: () => getAvailableFilters(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CatalogClient queryParams={queryParams} />
    </HydrationBoundary>
  );
};