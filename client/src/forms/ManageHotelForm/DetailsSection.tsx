import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Tambahkan Hotel</h1>
      <div className="flex gap-4">
        <label className="text-grey-700 text-sm font-bold flex-1">
          Name{" "}
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("name", {
              required: "Nama Tidak Boleh Kosong",
            })}
          />{" "}
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </label>
        <label className="text-grey-700 text-sm font-bold flex-1">
          Nomer Hp{" "}
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("phoneNumber", {
              required: "Nomer Hp Tidak Boleh Kosong",
            })}
          />{" "}
          {errors.phoneNumber && (
            <span className="text-red-500">{errors.phoneNumber.message}</span>
          )}
        </label>
      </div>

      <div className="flex gap-4 ">
        <label className="text-grey-700 text-sm font-bold flex-1">
          Kota{" "}
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font normal"
            {...register("city", {
              required: "Kota Tidak Boleh Kosong",
            })}
          />{" "}
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-grey-700 text-sm font-bold flex-1">
          Daerah{" "}
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font normal"
            {...register("country", {
              required: "Daerah Tidak Boleh Kosong",
            })}
          />{" "}
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-grey-700 text-sm font-bold flex-1">
        Deskripsi{" "}
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", {
            required: "Deskripsi Tidak Boleh Kosong",
          })}
        />{" "}
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-grey-700 text-sm font-bold max-w-[50%]">
        Harga{" "}
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("price", {
            required: "Deskripsi Tidak Boleh Kosong",
          })}
        />{" "}
        {errors.price && (
          <span className="text-red-500">{errors.price.message}</span>
        )}
      </label>
      <label className="text-grey-700 text-sm font-bold max-w-[50%]">
        Rating Bintang{" "}
        <select
          id=""
          className="border rounded w-full p-2 font-normal"
          {...register("starRating", {
            required: "Deskripsi Tidak Boleh Kosong",
          })}
        >
          <option value="" className="text-sm font-bold">
            Pilih Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};
export default DetailsSection;
