import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { KosSearchResponse, KosType } from "../../server/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (response.status === 200) {
    console.log("Registration success:", responseBody);
  } else {
    throw new Error(responseBody.message);
  }

  //   if (!responseBody.ok) {
  //    throw new Error(responseBody.message);
  //   }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token Salah");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Gagal Untuk Sign Out");
  }
};

export const addMyKos = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-kos`, {
    credentials: "include",
    method: "POST",
    body: hotelFormData,
  });
  if (!response.ok) {
    throw new Error("Gagal Menambahkan Hotel");
  }
  return response.json();
};
export const fetchMyKos = async (): Promise<KosType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-kos`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error Fetching Kos");
  }
  return response.json();
};

export const fetchMyKosById = async (kosId: string): Promise<KosType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-kos/${kosId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error Fething Kos");
  }
  return response.json();
};
export const updateMyKosById = async (kosFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-kos/${kosFormData.get("kosId")}`,
    { method: "PUT", body: kosFormData, credentials: "include" }
  );
  if (!response.ok) {
    throw new Error("Gagal MengUpdate Kos");
  }
  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchKos = async (
  SearchParams: SearchParams
): Promise<KosSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", SearchParams.destination || "");
  queryParams.append("checkIn", SearchParams.checkIn || "");
  queryParams.append("checkOut", SearchParams.checkOut || "");
  queryParams.append("adultCount", SearchParams.adultCount || "");
  queryParams.append("childCount", SearchParams.childCount || "");
  queryParams.append("page", SearchParams.page || "");

  queryParams.append("maxPrice", SearchParams.maxPrice || "");
  queryParams.append("sortOption", SearchParams.sortOption || "");

  SearchParams.facilities?.forEach((facility) => {
    queryParams.append("facilities", facility);
  });

  SearchParams.types?.forEach((type) => {
    queryParams.append("types", type);
  });

  SearchParams.stars?.forEach((star) => {
    queryParams.append("stars", star);
  });

  const response = await fetch(`${API_BASE_URL}/api/kos/search?${queryParams}`);

  if (!response.ok) {
    throw new Error("Error Fething Kos");
  }
  return response.json();
};
