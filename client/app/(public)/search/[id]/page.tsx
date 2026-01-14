import SingleMovie from "@/components/details/single-movie-details";
import { Metadata } from "next";

type Props = {
  readonly params: Promise<{ id: string }>;
  readonly searchParams: Promise<{ type: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const id = (await params).id;

  const type = (await searchParams).type;

  return {
    title: `Details of ${type} with ID ${id}`,
    description: `Details of the ${type} with ID ${id}.`,
  };
}

export default async function Details({ params, searchParams }: Props) {
  const { id } = await params;

  const { type } = await searchParams;

  return (
    <div className="pt-[61px]">
      <SingleMovie href={`${type}/${id}`} />
    </div>
  );
}
