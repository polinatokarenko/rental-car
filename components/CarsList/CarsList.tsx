import { GetCarsResponse } from "@/types/responses";
import Image from "next/image";

interface CarListProps {
    data: GetCarsResponse | undefined;
}

export default function CarsList({ data }: CarListProps) {
  return (
    <div>
      <ul>
        {data?.cars.map((car, index) => (
          <li key={car.id}>
            <Image src={car.img} alt={car.description} width={244} height={268} priority={index === 0} />
            <div>
              <div>
                <p>{car.brand} <span>{car.model}</span>, {car.year}</p>
                <p>${car.rentalPrice}</p>
              </div>
              <div>
                <ul>
                  <li><p>{car.location.country}</p></li>
                  <li><p>{car.location.city}</p></li>
                  <li><p>{car.rentalCompany}</p></li>
                  <li><p>{car.type}</p></li>
                  <li><p>{car.mileage}</p></li>
                </ul>
              </div>
            </div>
            <button type="button">Read more</button>
          </li>
        ))}
      </ul>
    </div>
  );
}