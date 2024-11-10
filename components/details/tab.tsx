import {
  useGetMovieAllImagesQuery,
  useGetMovieAllVideosQuery,
} from "@/lib/features/movie/movie-api";
import { getPosterImageFullPath } from "@/lib/helper";
import { Tab, TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";

export default function TabItem({ id }: { id: string }) {
  const { data: movieAllPosters } = useGetMovieAllImagesQuery(`movie/${id}`);
  const { data: { results: movieAllVideos = [] } = {} } =
    useGetMovieAllVideosQuery(`movie/${id}`);

  return (
    <div className=" w-full py-6 ">
      <div className="w-full ">
        <TabGroup className="w-full">
          <Tab className="mr-4 rounded-md py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
            Most Popular
          </Tab>
          <Tab className="mr-4 rounded-md py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
            Videos
          </Tab>
          <Tab className="rounded-md py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
            Posters
          </Tab>
          <TabPanels className="pt-3 ">
            <TabPanel className="rounded-xl overflow-x-auto " key={0}>
              <div className="flex  mb-4 gap-2 px-4">
                {movieAllVideos?.length ? (
                  movieAllVideos?.map((video, index) => (
                    <Image
                      width={180}
                      height={240}
                      key={index}
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                      className="min-w-[180px] min-h-[calc(180px*.5625)]  rounded-sm  aspect-[2/3] "
                    />
                  ))
                ) : (
                  <p className="py-2 opacity-70">No Video Found</p>
                )}
              </div>
            </TabPanel>
            <TabPanel className="rounded-xl overflow-x-auto " key={1}>
              <div className="flex  mb-4 gap-2 px-4">
                {movieAllVideos?.length ? (
                  movieAllVideos?.map((video, index) => (
                    <Image
                      width={180}
                      height={240}
                      key={index}
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                      className="min-w-[180px] min-h-[calc(180px*.5625)]  rounded-sm  aspect-[2/3] "
                    />
                  ))
                ) : (
                  <p className="py-2 opacity-70">No Video Found</p>
                )}
              </div>
            </TabPanel>
            <TabPanel className="rounded-xl overflow-x-auto " key={2}>
              <div className="flex  mb-4 gap-2 px-4">
                {movieAllPosters?.posters.length ? (
                  movieAllPosters?.posters.map((poster) => (
                    <Image
                      width={180}
                      height={240}
                      key={poster.file_path}
                      src={getPosterImageFullPath(poster.file_path || "")}
                      alt={poster.file_path}
                      className="min-w-[180px] min-h-[calc(180px*.5625)]  rounded-sm  aspect-[2/3] "
                    />
                  ))
                ) : (
                  <p className="py-2 opacity-70">No Posters Found</p>
                )}
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
