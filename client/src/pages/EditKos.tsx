import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageKosForm from "../forms/ManageKosForm/ManageKosForm";
import { useAppContext } from "../contexts/AppContext";

const EditKos = () => {
  const { kosId } = useParams();
  const { showToast } = useAppContext();
  const { data: kos } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyKosById(kosId || ""),
    {
      enabled: !!kosId,
    }
  );
  const { mutate, isLoading } = useMutation(apiClient.updateMyKosById, {
    onSuccess: () => {
      showToast({ message: "Kos Berhasil Di Perbaharui", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Kos Gagal Di Perbaharui", type: "ERROR" });
    },
  });

  const handleSave = (kosFormData: FormData) => {
    mutate(kosFormData);
  };
  return <ManageKosForm kos={kos} onSave={handleSave} isLoading={isLoading} />;
};
export default EditKos;
