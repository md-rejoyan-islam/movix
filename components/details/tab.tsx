import { useGetMovieAllImagesQuery } from "@/lib/features/movie/movie-api";
import { getPosterImageFullPath } from "@/lib/helper";
import { Tab, TabGroup, TabPanel, TabPanels } from "@headlessui/react";

export default function TabItem({ id }: { id: string }) {
  const { data: movieAllPosters } = useGetMovieAllImagesQuery(`movie/${id}`);

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
            {Array(2)
              .fill(null)
              .map((_, i) => (
                <TabPanel
                  className="rounded-xl  overflow-hidden overflow-x-auto "
                  key={i}
                >
                  <div className="flex  mb-4">
                    <iframe
                      className="min-w-[420px] min-h-[calc(420px*.5625)]  "
                      src="//www.youtube.com/embed/rD7uk2hknPI?si=60V9ltZeSUo0Odjk&amp;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=en&amp;modestbranding=1&amp;fs=1&amp;autohide=1"
                    ></iframe>
                    <iframe
                      className="min-w-[420px] min-h-[calc(420px*.5625)]   "
                      src="//www.youtube.com/embed/rD7uk2hknPI?si=60V9ltZeSUo0Odjk&amp;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=en&amp;modestbranding=1&amp;fs=1&amp;autohide=1"
                    ></iframe>
                    <iframe
                      className="min-w-[420px] min-h-[calc(420px*.5625)]   "
                      src="//www.youtube.com/embed/rD7uk2hknPI?si=60V9ltZeSUo0Odjk&amp;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=en&amp;modestbranding=1&amp;fs=1&amp;autohide=1"
                    ></iframe>
                    <iframe
                      className="min-w-[420px] min-h-[calc(420px*.5625)]   "
                      src="//www.youtube.com/embed/rD7uk2hknPI?si=60V9ltZeSUo0Odjk&amp;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=en&amp;modestbranding=1&amp;fs=1&amp;autohide=1"
                    ></iframe>
                    <iframe
                      className="min-w-[420px] min-h-[calc(420px*.5625)]  "
                      src="//www.youtube.com/embed/rD7uk2hknPI?si=60V9ltZeSUo0Odjk&amp;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=en&amp;modestbranding=1&amp;fs=1&amp;autohide=1"
                    ></iframe>
                  </div>
                </TabPanel>
              ))}
            <TabPanel
              className="rounded-xl  overflow-hidden overflow-x-auto "
              key={2}
            >
              <div className="flex  mb-4 gap-2">
                {movieAllPosters?.posters.map((poster) => (
                  <img
                    key={poster.file_path}
                    src={getPosterImageFullPath(poster.file_path || "")}
                    alt={poster.file_path}
                    className="min-w-[180px] min-h-[calc(180px*.5625)]  "
                  />
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
