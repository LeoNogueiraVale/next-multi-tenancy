import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./utils/session";

export async function middleware (request: NextRequest){
  const session = getSession();

  if(!(await session).token){
    return NextResponse.redirect(new URL ("/login", request.url));
  }
  return NextResponse.next();
}