import axios from "axios";
import type { BookSearchParams, BookSearchResponse } from "./interface";

const kakaoApi = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});

export const searchBooks = async (
  params: BookSearchParams
): Promise<BookSearchResponse> => {
  const { data } = await kakaoApi.get<BookSearchResponse>(
    "/v3/search/book",
    { params }
  );
  return data;
};
