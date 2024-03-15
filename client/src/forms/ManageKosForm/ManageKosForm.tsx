import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitySection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { KosType } from "../../../../server/src/shared/types";
import { useEffect } from "react";

export type KosFormData = {
  name: string;
  phoneNumber: string;
  city: string;
  country: string;
  description: string;
  type: string;
  price: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  kos?: KosType;
  onSave: (kosFormData: FormData) => void;
  isLoading: boolean;
};

const ManageKosForm = ({ onSave, isLoading, kos }: Props) => {
  const formMethods = useForm<KosFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(kos);
  }, [kos, reset]);

  const onSubmit = handleSubmit((formDataJson: KosFormData) => {
    const formData = new FormData();
    if (kos) {
      formData.append("kosId", kos._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("phoneNumber", formDataJson.phoneNumber);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("price", formDataJson.price.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facilities, index) => {
      formData.append(`facilities[${index}]`, facilities);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitySection />
        <GuestSection />
        <ImageSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-green-600 text-white p-2 font-bold hover:bg-green-500 text-xl rounded-md disabled:bg-gray-500"
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};
export default ManageKosForm;
