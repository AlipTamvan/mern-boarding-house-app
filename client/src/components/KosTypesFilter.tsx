import { kosTypes } from "../config/kos-options-config";

type Props = {
  selectedKosType: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const KosTypesFilter = ({ selectedKosType, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Tipe Kos</h4>
      {kosTypes.map((kosType, index) => (
        <label className="flex items-center space-x-2" key={index}>
          <input
            type="checkbox"
            className="rounded"
            value={kosType}
            checked={selectedKosType.includes(kosType)}
            onChange={onChange}
          />
          <span>{kosType} Type</span>
        </label>
      ))}
    </div>
  );
};
export default KosTypesFilter;
