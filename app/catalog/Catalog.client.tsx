"use client"
import { useQuery } from "@tanstack/react-query";

import Dropdown from "@/components/Dropdown/Dropdown"
import CarMileageInputs from "@/components/CarMileageInputs/CarMileageInputs";
import CarsList from "@/components/CarsList/CarsList";
import { getCars } from "@/lib/api/clientApi";
import type { SearchParams } from "@/types/params";
import { getAvailableFilters } from "@/lib/api/clientApi";
import { keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CatalogClientProps = {
  queryParams: SearchParams;
};

export default function CatalogClient({ queryParams }: CatalogClientProps ) {
  //useQuerys
  const { data } = useQuery({
    queryKey: ["cars", queryParams],
    queryFn: () => getCars(queryParams),
    placeholderData: keepPreviousData,
  });

  const availableFilters = useQuery({
    queryKey: ["filters"],
    queryFn: () => getAvailableFilters(),
    placeholderData: keepPreviousData,
  });

  //filters
  const brands: string[] = availableFilters.data?.brands || [];

  const minPrice: number = availableFilters.data?.price.min || 10;
  const maxPrice: number = availableFilters.data?.price.max || 120;
  const prices: string[] = [];

  for (let price = minPrice; price <= maxPrice; price += 10) {
    prices.push(String(price));
  }

  //localParams
  const [localParams, setLocalParams] = useState<SearchParams>(queryParams);

  //settingLocalParams
  const onSetParam = (key: keyof SearchParams, value: string) => {
    setLocalParams(prev => ({ ...prev, [key]: value }));
  }

  //search
  const router = useRouter();

  const onSearch = () => {
    const filteredParams = Object.fromEntries(
      Object.entries(localParams).filter(([_, value]) => value !== '' && value !== undefined)
    );
    const params = new URLSearchParams(filteredParams as Record<string, string>);
    router.push('/catalog?' + params.toString())
  }

  //clearParams
  const onClear = () => {
    setLocalParams({});
    router.push('/catalog');
  }

  return (
    <section>
      <div>
        <Dropdown id={'brand'} label={'Car brand'} currentValue={localParams.brand} options={brands} onSetParam={onSetParam} defaultButtonText={'Choose a brand'} />
        <Dropdown id={'price'} label={'Price/1 hour'} currentValue={localParams.price ? `To $${localParams.price}` : undefined} options={prices} onSetParam={onSetParam} defaultButtonText={'Choose a price'} />
        <CarMileageInputs minMileage={localParams.minMileage} maxMileage={localParams.maxMileage} onSetParam={onSetParam} />
        <div>
          <button type="button" onClick={onSearch}>Search</button>
          <button type="button" onClick={onClear}>Clear filters</button>
        </div>
        <CarsList data={data} />
      </div>
    </section>
  )
}