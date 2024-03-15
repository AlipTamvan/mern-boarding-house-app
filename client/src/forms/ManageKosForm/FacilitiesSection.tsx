import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { KosFormData } from "./ManageKosForm";

const FacilitySection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<KosFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Fasilitas</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facilitiy, index) => (
          <label className="text-sm flex gap-1 text-grey-700" key={index}>
            <input
              type="checkbox"
              value={facilitiy}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "Setidaknya Harus Ada Satu Fasilitas Yang Di Pilih";
                  }
                },
              })}
            />
            {facilitiy}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};
export default FacilitySection;
