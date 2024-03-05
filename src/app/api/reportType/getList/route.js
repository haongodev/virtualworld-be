import { getList } from '@/src/server/handler/reportType/getList';
import { NextResponse } from 'next/server';

export async function GET() {
    const data = await getList();
    return NextResponse.json(data);
}