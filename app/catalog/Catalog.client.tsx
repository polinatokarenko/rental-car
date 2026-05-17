"use client"
import { useQuery } from "@tanstack/react-query";

import Select from "@/components/Select/Select"
import { getCars } from "@/lib/api/clientApi";
import type { SearchParams } from "@/types/params";
import { getAvailableFilters } from "@/lib/api/clientApi";
import { keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
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
  const router = useRouter();

  const onSetParam = (key: keyof SearchParams, value: string) => {
    setLocalParams(prev => ({ ...prev, [key]: value }));
  }

  //search
  const onSearch = () => {
    const params = new URLSearchParams(localParams as Record<string, string>);
    router.push('/catalog?' + params.toString())
  }

  //clearParams
  const onClear = () => {
    setLocalParams({});
    setResetKey(prev => prev + 1);
    setMileageFrom('');
    setMileageTo('');
    router.push('/catalog');
  }

  const [mileageFrom, setMileageFrom] = useState(queryParams.minMileage);
  const [mileageTo, setMileageTo] = useState(queryParams.maxMileage);
  const [resetKey, setResetKey] = useState(0);

  return (
    <section>
      <div>
        <Select key={`brand-${resetKey}`} id={'brand'} label={'Car brand'} options={brands} onSetParam={onSetParam} defaultButtonText={'Choose a brand'}/>
        <Select key={`price-${resetKey}`} id={'price'} label={'Price/1 hour'} options={prices} onSetParam={onSetParam} defaultButtonText={'Choose a price'} />
          <div>
            <label>Car mileage / km</label>
            <div>
              <input type="number" placeholder="From" value={mileageFrom} onChange={(e) => {onSetParam('minMileage', e.target.value); setMileageFrom(e.target.value);}}/>
              <input type="number" placeholder="To" value={mileageTo} onChange={(e) => {onSetParam('maxMileage', e.target.value); setMileageTo(e.target.value);}}/>
            </div>
          </div>
          <button type="button" onClick={onSearch}>Search</button>
          <button type="button" onClick={onClear}>Clear filters</button>
      </div>
      {data?.cars.map((car) => <img key={car.id} src={car.img}></img>)}
    </section>
  )
}