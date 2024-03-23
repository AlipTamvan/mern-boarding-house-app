import { KosType } from "../../../server/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  kos: KosType;
};

const SewaDetailSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  kos,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Sewa Detail</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${kos.name}, ${kos.city}, ${kos.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
          Check In
          <div className="font-bold">{checkIn.toDateString()}</div>
        </div>
        <div>
          Check Out
          <div className="font-bold">{checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Waktu Sewa :<div className="font-bold">{numberOfNights} Hari</div>
      </div>
      <div>
        Guest{" "}
        <div className="font-bold ">
          {adultCount} adult & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default SewaDetailSummary;
