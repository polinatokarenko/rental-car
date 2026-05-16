import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';

export async function GET(request: NextRequest) {
  try {
    const brand = request.nextUrl.searchParams.get('brand') ?? '';
    const price = request.nextUrl.searchParams.get('price') ?? '';
    const minMileage = request.nextUrl.searchParams.get('minMileage') ?? '';
    const maxMileage = request.nextUrl.searchParams.get('maxMileage') ?? '';
    const perPage = request.nextUrl.searchParams.get('perPage') ?? '';
    const page = request.nextUrl.searchParams.get('page') ?? '';

    const res = await api('/cars', {
      params: {
        ...(brand !== '' && { brand }),
        ...(price !== '' && { price }),
        ...(minMileage !== '' && { minMileage }),
        ...(maxMileage !== '' && { maxMileage }),
        ...(perPage !== '' && { perPage }),
        ...(page !== '' && { page }),
      },
    });

    return NextResponse.json(res?.data, { status: res?.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status }
      );
    }
    
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}