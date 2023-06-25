"use client"
import React from 'react'
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const middleware = (request: Request) => {
 
    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard',
}

export default middleware