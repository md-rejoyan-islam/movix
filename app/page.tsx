import Banner from "@/components/home/banner";
import Popular from "@/components/home/popular";
import TopRated from "@/components/home/top-rated";
import Trending from "@/components/home/trending";

export default function Home() {
  return (
    <>
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
}
