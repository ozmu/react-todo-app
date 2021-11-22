import { NextResponse } from 'next/server';

export function middleware(request, response) {
  let cfAccessKey = request.cookies.cfAccessKey;
  if (!cfAccessKey){
    const { pathname } = request.nextUrl
    if (pathname != '/login') {
      return NextResponse.redirect('/login');
    }
    NextResponse.next();
  }
  else {
    const { pathname } = request.nextUrl
    if (pathname === '/login') {
      return NextResponse.redirect('/');
    }
    NextResponse.next().cookie('cfAccessKey', cfAccessKey);
  }
}