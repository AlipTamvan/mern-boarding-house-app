import { Link } from "react-router-dom";
import { KosType } from "../../../server/src/shared/types";

type Props = {
  kos: KosType;
};

const LatestDestinationCard = ({ kos }: Props) => {
  return (
    <Link
      to={`/detail/${kos._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={kos.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        ></img>
      </div>
      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className=" text-white font-bold tracking-tight text-3xl">
          {kos.name}
        </span>
      </div>
    </Link>
  );
};
export default LatestDestinationCard;
