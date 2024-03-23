import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
type Props = {
  kosId: string;
  price: number;
};
type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuesInfoForm = ({ kosId, price }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/kos/${kosId}/sewa`);
  };

  return (
    <>
      <div className="flex flex-col p-4 bg-green-200 gap-4">
        <h3 className="text-md font-bold">Rp.{price}</h3>
        <form onSubmit={isLoggedIn ? handleSubmit(onSubmit): handleSubmit(onSignInClick)}>
          <div className="grid grid-cols-1 gap-4 items-center ">
            <div>
              <DatePicker
                selected={checkIn}
                onChange={(date) => setValue("checkIn", date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Tanggal Check-In"
                className="w-full bg-white p-2 focus:outline-none"
                wrapperClassName="min-w-full"
              />
            </div>
            <div>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setValue("checkOut", date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Tanggal Check-In"
                className="w-full bg-white p-2 focus:outline-none"
                wrapperClassName="min-w-full"
              />
            </div>
            <div className="flex bg-white px-2 py-1 gap-2">
              <label className="items-center flex">
                Adult:
                <input
                  type="number"
                  min={1}
                  max={20}
                  {...register("adultCount", {
                    required: "Harus Di Isi",
                    min: {
                      value: 1,
                      message: "Setidaknya Harus Ada 1",
                    },
                    valueAsNumber: true,
                  })}
                  className="w-full p-1 focus:outline-none font bold"
                />
              </label>
              <label className="items-center flex">
                Children:
                <input
                  type="number"
                  min={0}
                  max={20}
                  {...register("childCount", {
                    valueAsNumber: true,
                  })}
                  className="w-full p-1 focus:outline-none font bold"
                />
              </label>
              {errors.adultCount && (
                <span className="text-red-500 font-semibold text-sm">
                  {errors.adultCount.message}
                </span>
              )}
            </div>
            {isLoggedIn ? (
              <button className="bg-green-600 text-white h-full p-2 font-bold hover:bg-green-400 text-xl">
                Sewa Sekarang
              </button>
            ) : (
              <button className="bg-green-600 text-white h-full p-2 font-bold hover:bg-green-400 text-xl">
                Masuk Untuk Menyewa
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default GuesInfoForm;
