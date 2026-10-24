import { cookies } from 'next/headers';
import { api } from './api'
import type { Note } from '@/types/note'
import { User } from '@/types/user';

export interface FetchNotesParams {
  query: string;
  page: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function authHeaders() {
     const cookieStore = await cookies();
     return {Cookie: cookieStore.toString(),}
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
    headers: await authHeaders(),
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: await authHeaders()
  });
  return data;
}
export async function checkSession () {
  const  response  = await api.get(`/auth/session`, {
    headers: await authHeaders()
  });
  return response;
}
export async function getMe  () {
  const  response  = await api.get<User>(`/users/me`, {
    headers: await authHeaders()
  });
  return response;
}


