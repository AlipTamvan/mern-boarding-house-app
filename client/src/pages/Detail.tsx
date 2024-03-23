import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { kosId } = useParams();
  const { data: kos } = useQuery(
    "fetchKosById",
    () => apiClient.fetchKosById(kosId as string),
    {
      enabled: !!kosId,
    }
  );
  if (!kos) {
    return <></>;
  }
  return (
    <div className="space-y-6">
      <div>
        <span className="flex ">
          {Array.from({ length: kos.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{kos.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {kos.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={kos.name}
              className="rounded-md w-full h-full object-center"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {kos.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{kos.description}</div>
        <div className="h-fit">
          <GuestInfoForm price={kos.price} kosId={kos._id} />
        </div>
      </div>
    </div>
  );
};
export default Detail;
