import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import CatalogClient from "./Catalog.client";
import { getCars } from "@/lib/api/serverApi";
import { SearchParams } from "@/types/params";

type CatalogProps = {
  params: SearchParams;
};

export default async function Catalog({ params }: CatalogProps) {
  const { brand, price, minMileage, maxMileage, perPage, page } = await params;

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

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CatalogClient />
    </HydrationBoundary>
  );
};