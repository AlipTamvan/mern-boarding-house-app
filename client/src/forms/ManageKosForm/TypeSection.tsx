import { useFormContext } from "react-hook-form";
import { kosTypes } from "../../config/kos-options-config";
import { KosFormData } from "./ManageKosForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<KosFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Tipe</h2>
      <div className="grid grid-cols-5 gap-2">
        {kosTypes.map((type, index) => (
          <label
            key={index}
            className={
              typeWatch === type
                ? "cursor-pointer bg-green-400 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              className="hidden"
              value={type}
              {...register("type", { required: "Tipe Harus Di pilih" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};
export default TypeSection;
