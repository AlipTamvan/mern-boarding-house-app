import { useMutation } from "react-query";
import ManageKosForm from "../forms/ManageKosForm/ManageKosForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddKos = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyKos, {
    onSuccess: () => {
      showToast({ message: "Kos Berhasil Di Tambahkan", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Kos Gagal Di Tambahkan", type: "ERROR" });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return <ManageKosForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddKos;
