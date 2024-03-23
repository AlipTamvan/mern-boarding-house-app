import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
const Home = () => {
  const { data: kos } = useQuery("fetchKos", apiClient.fetchKos);

  const topRowKos = kos?.slice(0, 2) || [];
  const bottowRowKos = kos?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Tujuan Terbaru</h2>
      <p>Tujuan terbaru yang ditambahkan oleh host kami </p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowKos.map((kos) => (
            <LatestDestinationCard kos={kos} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4 ">
          {bottowRowKos.map((kos) => (
            <LatestDestinationCard kos={kos} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
