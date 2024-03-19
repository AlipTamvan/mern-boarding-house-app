import { AiFillStar } from "react-icons/ai";
import { KosType } from "../../../server/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  kos: KosType;
};
const SearchResultsCard = ({ kos }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={kos.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded-md"
          alt=""
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: kos.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{kos.type}</span>
          </div>
          <Link
            to={`/detail/${kos._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {kos.name}
          </Link>
        </div>
        <div className="line-clamp-4">{kos.description}</div>
        <div className="grid grid-cols-2 items-end whitespace-nowarp">
          <div className="flex  gap-1 items-center">
            {kos.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}

            <span className="text-sm">
              {kos.facilities.length > 3 && `+${kos.facilities.length - 3}more`}{" "}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">Rp.{kos.price} Per Bulan</span>
            <Link
              to={`/detail/${kos._id}`}
              className="bg-green-600 text-white h-full p-3 font-bold text-xl max-w-fit hover:bg-green-500 rounded-md"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResultsCard;
