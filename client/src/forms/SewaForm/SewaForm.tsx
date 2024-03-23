import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../server/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type SewaFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  kosId: string;
  totalCost: number;
  paymentIntentId: string;
};

const SewaForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();

  const elements = useElements();

  const search = useSearchContext();
  const { kosId } = useParams();
  const { showToast } = useAppContext();

  const { mutate: sewaRoom, isLoading } = useMutation(
    apiClient.createRoomSewa,
    {
      onSuccess: () => {
        showToast({ message: "Sewa Berhasil", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Sewa Gagal", type: "ERROR" });
      },
    }
  );

  const { handleSubmit, register } = useForm<SewaFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      kosId: kosId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: SewaFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status == "succeeded") {
      sewaRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold"> Konfirmasi Detail</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Nama Depan
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Nama Belakang
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Total Harga</h2>
        <div className="bg-green-200 p-4 rounded-md">
          <div className="font-semibold text-lg ">
            {` Total Pembayaran : Rp.${paymentIntent.totalCost}`}
          </div>
          <div className="text-xs">Termasuk Pajak Dan Penanganan</div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Detail Pembayaran</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-green-600 text-white p-2 font-bold hover:bg-green-500 text-md disable:bg-gray-500"
        >
          {isLoading ? "Menyimpan..." : "Konfirmasi Sewa"}
        </button>
      </div>
    </form>
  );
};
export default SewaForm;
