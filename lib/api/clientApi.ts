import { Note } from "@/types/note";
// import axios from "axios";
import {api} from "./api"
import { NextServer } from "next/dist/server/next";
import { User } from "@/types/user";


// export const api = axios.create({
//   // baseURL: "https://notehub-public.goit.study/api",
//   baseURL: "https://notehub-api.goit.study",
//   withCredentials: true,
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//   },

// });

export interface FetchNotesParams {
  query: string;
  page: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const { query, page, tag } = params;

  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search: query,
      page,
      perPage: 12,
      sortBy: "created",
      tag,
    },
  });

  return response.data;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(params: CreateNoteParams): Promise<Note> {
  const { data } = await api.post<Note>("/notes", params);

  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}
type RegisterRequest = {
  email: string;
  password: string;
};

export async function register(body: RegisterRequest ) {
  const {data}  = await api.post<User>(`/auth/register`, body);
  return data
}

export async function login(body: RegisterRequest ) {
  const {data}  = await api.post<User>(`/auth/login`, body);
  return data
}
interface SessionResponse {
  message: string
}
export async function checkSession () {
  const {data}  = await api.get<SessionResponse>(`/auth/session`);
  return data
}
export async function getMe  () {
  const {data}  = await api.get<User>(`/users/me`);
  return data
}
export async function logout  () {
  const {data}  = await api.post<SessionResponse>(`/auth/logout`);
  return data
}
interface UpdateResponse {
  email?: string,
  username: string
}
export async function updateMe   (body: UpdateResponse) {
  const {data}  = await api.patch<User>(`/users/me`, body);
  return data
}




