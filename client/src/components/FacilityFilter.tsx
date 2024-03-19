import { kosFacilities } from "../config/kos-options-config";
type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const FacilityFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Fasilitas Kos</h4>
      {kosFacilities.map((kosFacility, index) => (
        <label className="flex items-center space-x-2" key={index}>
          <input
            type="checkbox"
            className="rounded"
            value={kosFacility}
            checked={selectedFacilities.includes(kosFacility)}
            onChange={onChange}
          />
          <span>{kosFacility} Type</span>
        </label>
      ))}
    </div>
  );
};
export default FacilityFilter;
