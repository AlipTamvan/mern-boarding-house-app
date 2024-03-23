import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import SewaForm from "../forms/SewaForm/SewaForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SewaDetailSummary from "../components/SewaDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Sewa = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { kosId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(kosId as string, numberOfNights.toString()),
    {
      enabled: !!kosId && numberOfNights > 0,
    }
  );

  const { data: kos } = useQuery(
    "fetchKosById",
    () => apiClient.fetchKosById(kosId as string),
    {
      enabled: !!kosId,
    }
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (!kos) {
    return <></>;
  }

  return (
    <>
      <div className="grid md:grid-cols-[1fr_2fr]">
        <SewaDetailSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          kos={kos}
        />
        {currentUser && paymentIntentData && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: paymentIntentData.clientSecret,
            }}
          >
            <SewaForm
              currentUser={currentUser}
              paymentIntent={paymentIntentData}
            />
          </Elements>
        )}
      </div>
    </>
  );
};
export default Sewa;
