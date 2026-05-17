import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { logErrorResponse } from '@/app/api/_utils/utils';
import { isAxiosError } from 'axios';

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();
    const res = await api.post(`/cars/${id}/booking-requests`, body);
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}