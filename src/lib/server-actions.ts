import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  "use server";

  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("Server logout error:", error);
    throw new Error("로그아웃 중 오류가 발생했습니다.");
  }
}
