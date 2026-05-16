"use client"
import { useQuery } from "@tanstack/react-query";

import Select from "@/components/Select/Select"
import { getCars } from "@/lib/api/clientApi";
import type { SearchParams } from "@/types/params";
import { getAvailableFilters } from "@/lib/api/clientApi";

type CatalogClientProps = {
  queryParams: SearchParams;
};

export default function CatalogClient({ queryParams }: CatalogClientProps ) {
  const { data } = useQuery({
    queryKey: ["cars", queryParams],
    queryFn: () => getCars(queryParams),
  });

  const availableFilters = useQuery({
    queryKey: ["filters"],
    queryFn: () => getAvailableFilters(),
  });

  const brands: string[] = availableFilters.data?.brands || [];

  const minPrice: number = availableFilters.data?.price.min || 10;
  const maxPrice: number = availableFilters.data?.price.max || 120;

  const prices: string[] = [];

  for (let price = minPrice; price <= maxPrice; price += 10) {
    prices.push(String(price));
  }

  return (
    <div>
      <Select id={'brand'} label={'Car brand'} options={brands}/>
      <Select id={'price'} label={'Price/1 hour'} options={prices}/>
    </div>
  )
}