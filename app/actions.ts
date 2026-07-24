"use server";

// SERVER ACTIONS = the backend "write" side (admin only).
// Every write first verifies the admin session — hiding the button is not
// enough; this is what actually blocks unauthorized changes.
import { prisma } from "@/lib/db";
import { isAuthed, login, logout } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  if (!(await isAuthed())) throw new Error("Not authorized.");
}

// CREATE — add a new song
export async function createSong(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const artist = String(formData.get("artist") ?? "").trim();
  const lyrics = String(formData.get("lyrics") ?? "").trim();

  if (!title || !lyrics) {
    throw new Error("Title and lyrics are required.");
  }

  await prisma.song.create({
    data: { title, artist: artist || null, lyrics },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

// DELETE — remove a song by id
export async function deleteSong(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) throw new Error("Invalid song id.");

  await prisma.song.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin");
}

// LOGIN — check password, set the session cookie
export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const ok = await login(password);
  if (!ok) redirect("/admin/login?error=1");
  redirect("/admin");
}

// LOGOUT — clear the session cookie
export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}
