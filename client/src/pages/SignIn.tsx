import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation(  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Login Berhasil", type: "SUCCESS" });

      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold ">Sign In</h2>
      <label className="text-grey-700 text-sm font-bold flex-1">
        Email{" "}
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font normal"
          {...register("email", {
            required: "Email Tidak Boleh Kosong",
          })}
        />{" "}
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-grey-700 text-sm font-bold flex-1">
        Password{" "}
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font normal"
          {...register("password", {
            required: "Password Tidak Boleh Kosong",
            minLength: {
              value: 6,
              message: "Password Minimal Memiliki 6 Character",
            },
          })}
        />{" "}
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Belum Mendaftar?{" "}
          <Link className="underline" to="/register">
            Daftar Sekarang
          </Link>
        </span>

        <button
          type="submit"
          className="bg-green-600 text-white p-2 font-bold hover:bg-green-600 rounded-lg"
        >
          Login
        </button>
      </span>
    </form>
  );
};
export default SignIn;
