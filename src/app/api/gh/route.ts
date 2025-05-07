import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("Hitting endpoint");
  const { username } = (await request.json()) as { username: string };

  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${process.env.GH_TOKEN}`,
    },
  });
  const data = await res.json();
  console.log(data);
  if (res.status === 404) {
    return new NextResponse("GitHub user not found", { status: 404 });
  }
  return NextResponse.json({ message: "User found" }, { status: 200 });
}
