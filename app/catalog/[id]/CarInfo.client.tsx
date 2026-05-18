"use client"

import css from "./CarInfo.module.css";
import { getCarById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import Image from "next/image";

interface CarInfoClientProps {
    id: string;
}

export default function CarInfoClient({ id }: CarInfoClientProps) {
    const { data } = useQuery({
        queryKey: ["car", id],
        queryFn: () => getCarById(id),
        placeholderData: keepPreviousData,
    });

    return (
        <section>
            {data ?
              <div className={css.pageContent}>
                  <Image className={css.carImg} src={data.img} alt={data.description} width={640} height={512}/>
                  <div className={css.carInfoContainer}>
                    <div className={css.firstBlockCarInfo}>
                        <div>
                            <h2>{data.brand} {data.model}, {data.year}</h2>
                            <p>Article: {data.id}</p>
                        </div>
                        <div>
                            <svg width={12} height={15} fill="var(--main)">
                                <use href="/icons/sprite.svg#location-icon"></use>
                            </svg> {data.location.city}, {data.location.country}
                        </div>
                        <p>${data.rentalPrice}</p>
                        <p>The Buick Enclave is a stylish and spacious SUV known for its comfortable ride and luxurious features.</p>
                    </div>
                    <div className={css.secondBlockCarInfo}>
                        <div className={css.rentalConditionsContainer}>
                            <p>Rental Conditions:</p>
                            <ul className={css.rentalConditionsList}>
                                {data.rentalConditions.map((condition, index) => (
                                    <li key={`condition-${index}`}>
                                        <svg key={`condition-${index}`} width={16} height={16} fill="var(--main)">
                                            <use href="/icons/sprite.svg#condition-icon"></use>
                                        </svg>
                                        {condition}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={css.carSpecificationsContainer}>
                            <p>Car Specifications:</p>
                            <ul className={css.carSpecificationsList}>
                                <li>Year: {data.year}</li>
                                <li>Type: {data.type}</li>
                                <li>Fuel Consumption: {data.fuelConsumption}</li>
                                <li>Engine: {data.engine}</li>
                                <li>Mileage: {data.mileage}</li>
                            </ul>
                        </div>
                    </div>
                  </div>
              </div>
            : false}
        </section>
    )
}