import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const sites = await prisma.site.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(sites);
  } catch (error) {
    console.error("사이트 조회 오류:", error);
    return NextResponse.json({ error: "사이트 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { url, name, category, description } = await req.json();

    if (!url || !name) {
      return NextResponse.json({ error: "URL과 이름은 필수입니다." }, { status: 400 });
    }

    const site = await prisma.site.create({
      data: {
        url,
        name,
        category: category || "기타",
        description,
        userId: user.id,
      },
    });

    return NextResponse.json(site);
  } catch (error) {
    console.error("사이트 추가 오류:", error);
    return NextResponse.json({ error: "사이트 추가 중 오류가 발생했습니다." }, { status: 500 });
  }
}
