import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: kos } = useQuery("fetchMyBookings", apiClient.fetchMyBookings);

  if (!kos || kos.length == 0) return <span>Belum Ada Booking</span>;

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Booking Saya</h1>
      {kos.map((eachKos) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={eachKos.imageUrls[0]}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {eachKos.name}
              <div className="text-xs font-normal ">
                {eachKos.city}, {eachKos.country}
              </div>
            </div>
            {eachKos.sewa.map((booking) => (
              <div>
                <div>
                  <span className="font-bold mr-2">Tanggal :</span>
                  <span className="">
                    {new Date(booking.checkIn).toDateString()} -
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  {" "}
                  <span className="font-bold mr-2">Guests :</span>
                  <span>
                    {booking.adultCount} Adult, {booking.childCount} Children
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default MyBookings;
