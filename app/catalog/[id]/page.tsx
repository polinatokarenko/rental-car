import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import CarInfoClient from "./CarInfo.client";
import { getCarById } from "@/lib/api/serverApi";

type CarInfoProps = {
  params: {id: string};
};

export default async function CarInfo({ params }: CarInfoProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CarInfoClient id={id} />
    </HydrationBoundary>
  );
};