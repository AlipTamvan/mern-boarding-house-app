import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Register Berhasil", type: "SUCCESS" });
      navigate("/");
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
      <h2 className="text-3xl font-bold">Buat Akun</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-grey-700 text-sm font-bold flex-1">
          Nama Depan
          <input
            className="border rounded w-full py-1 px-2 font normal"
            {...register("firstName", {
              required: "Nama Depan Tidak Boleh Kosong",
            })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>

        <label className="text-grey-700 text-sm font-bold flex-1">
          Nama Belakang{" "}
          <input
            className="border rounded w-full py-1 px-2 font normal"
            {...register("lastName", {
              required: "Nama Belakang Tidak Boleh Kosong",
            })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className="text-grey-700 text-sm font-bold flex-1">
        Konfirmasi Password{" "}
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Konfirmasi Password Harus Di Isi";
              } else if (watch("password") !== val) {
                return "Konfirmasi Password Tidak Sama Dengan Password ";
              }
            },
          })}
        />{" "}
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-green-600 text-white p-2 font-bold hover:bg-green-600 rounded-lg"
        >
          Buat Akun
        </button>
      </span>
    </form>
  );
};

export default Register;
