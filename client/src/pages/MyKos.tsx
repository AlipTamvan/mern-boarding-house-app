import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap, BsTelephone } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyKos = () => {
  const { data: kosData } = useQuery("fetchMyKos", apiClient.fetchMyKos, {
    onError: () => {},
  });
  if (!kosData) {
    return <span>Kos Tidak Ditemukan</span>;
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">we Kos</h1>
        <Link
          to="/add-kos"
          className="flex bg-green-600 text-white rounded-md font-bold p-2 text-xl hover:bg-green-500"
        >
          Tambahkan Kos
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {" "}
        {kosData.map((kos, index) => (
          <div
            key={index++}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{kos.name}</h2>
            <div className="whitespace-pre-line">{kos.description}</div>
            <div className="grid grid-cols-6 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {kos.city} <br />,{kos.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsTelephone className="mr-1" />
                {kos.phoneNumber}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {kos.type}{" "}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />
                Rp.{kos.price}{" "}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {kos.adultCount} Adults <br />
                {kos.childCount} Children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {kos.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-kos/${kos._id}`}
                className="flex bg-green-600 text-white rounded-md font-bold p-2 text-xl hover:bg-green-500"
              >
                Lihat Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyKos;
