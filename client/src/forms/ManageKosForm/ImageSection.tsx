import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Gambar</h2>
      <div className="border rounder p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-grey-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return "Setidaknya Harus Memasukan 1 Gambar";
              }
              if (totalLength > 6) {
                return "Maximal Gambar Hanya Boleh 6";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 font-bold text-sm">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};
export default ImageSection;
