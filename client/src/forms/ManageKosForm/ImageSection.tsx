import { useFormContext } from "react-hook-form";
import { KosFormData } from "./ManageKosForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<KosFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrls: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrls)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Gambar</h2>
      <div className="border rounder p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url, index) => (
              <div className="relative group " key={index}>
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-grey-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

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
