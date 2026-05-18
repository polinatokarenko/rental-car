import { GetCarsResponse } from "@/types/responses";
import Image from "next/image";
import css from "./CarsList.module.css";
import Link from "next/link";

interface CarListProps {
    data: GetCarsResponse | undefined;
}

export default function CarsList({ data }: CarListProps) {
  return (
    <div className={css.carsListContainer}>
      <ul className={css.carsList}>
        {data?.cars.map((car, index) => (
          <li className={css.cardContainer} key={car.id}>
            <Image className={css.carImage} src={car.img} alt={car.description} width={244} height={268} priority={index === 0} />
            <div className={css.cardContentContainer}>
              <div className={css.carNameContainer}>
                <p className={css.carNameText}>
                  {car.brand} <span className={css.carNameSpan}>{car.model}</span>, {car.year}
                </p>
                <p className={css.carNameText}>${car.rentalPrice}</p>
              </div>
              <ul className={css.carDetailsList}>
                <li className={css.carDetailsElement}>{car.location.city}</li>
                <li className={css.carDetailsElement}>{car.location.country}</li>
                <li className={css.carDetailsElement}>{car.rentalCompany}</li>
                <li className={css.carDetailsElement}>{car.type}</li>
                <li className={css.carDetailsElement}>{car.mileage}</li>
              </ul>
            </div>
            <Link href={`/catalog/${car.id}`}>
              <button className={css.readMoreButton} type="button">Read more</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}