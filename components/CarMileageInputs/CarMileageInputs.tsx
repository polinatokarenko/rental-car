import css from "./CarMileageInputs.module.css";
import { SearchParams } from "@/types/params";

interface CarMileageInputsProps {
    minMileage?: string;
    maxMileage?: string;
    onSetParam: (key: keyof SearchParams, value: string) => void;
}

export default function CarMileageInputs( {minMileage, maxMileage, onSetParam }: CarMileageInputsProps) {
    return (
        <div className={css.carMileageContainer}>
          <label className={css.carMileageLabel}>Car mileage / km</label>
          <div>
            <input className={`${css.input} ${css.fromInput}`} type="number" placeholder="From" value={minMileage ?? ''} onChange={(e) => {onSetParam('minMileage', e.target.value);}}/>
            <input className={`${css.input} ${css.toInput}`} type="number" placeholder="To" value={maxMileage ?? ''} onChange={(e) => {onSetParam('maxMileage', e.target.value);}}/>
          </div>
        </div>
    )
}