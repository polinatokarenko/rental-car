import { SearchParams } from "@/types/params";

interface CarMileageInputsProps {
    minMileage?: string;
    maxMileage?: string;
    onSetParam: (key: keyof SearchParams, value: string) => void;
}

export default function CarMileageInputs( {minMileage, maxMileage, onSetParam }: CarMileageInputsProps) {
    return (
        <div>
          <label>Car mileage / km</label>
          <div>
            <input type="number" placeholder="From" value={minMileage ?? ''} onChange={(e) => {onSetParam('minMileage', e.target.value);}}/>
            <input type="number" placeholder="To" value={maxMileage ?? ''} onChange={(e) => {onSetParam('maxMileage', e.target.value);}}/>
          </div>
        </div>
    )
}