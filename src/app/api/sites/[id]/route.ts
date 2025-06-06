import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { id } = await params;
    const updateData = await req.json();

    // 사이트가 현재 사용자의 것인지 확인
    const existingSite = await prisma.site.findFirst({
      where: { id, userId: user.id },
    });

    if (!existingSite) {
      return NextResponse.json({ error: "사이트를 찾을 수 없습니다." }, { status: 404 });
    }

    const updatedSite = await prisma.site.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedSite);
  } catch (error) {
    console.error("사이트 업데이트 오류:", error);
    return NextResponse.json({ error: "사이트 업데이트 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { id } = await params;

    // 사이트가 현재 사용자의 것인지 확인
    const existingSite = await prisma.site.findFirst({
      where: { id, userId: user.id },
    });

    if (!existingSite) {
      return NextResponse.json({ error: "사이트를 찾을 수 없습니다." }, { status: 404 });
    }

    await prisma.site.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("사이트 삭제 오류:", error);
    return NextResponse.json({ error: "사이트 삭제 중 오류가 발생했습니다." }, { status: 500 });
  }
}
