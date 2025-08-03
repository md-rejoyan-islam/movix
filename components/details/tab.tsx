import { getBackdropImageFullPath, getPosterImageFullPath } from "@/lib/helper";
import { MoviePoster, VideoDetails } from "@/lib/types";
import {
  Dialog,
  DialogPanel,
  Tab,
  TabGroup,
  TabPanel,
  TabPanels,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { VideoPlayIcon } from "../svg";

export default function TabItem({
  movieAllPosters,
  movieAllVideos,
}: {
  readonly movieAllPosters: {
    posters: MoviePoster[];
    backdrops: MoviePoster[];
    logos: MoviePoster[];
  };
  movieAllVideos: VideoDetails[];
}) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [currentVideoKey, setCurrentVideoKey] = React.useState<string>("");

  return (
    <>
      <div className=" w-full py-6 ">
        <div className="w-full ">
          <TabGroup className="w-full">
            <Tab className="mr-4 rounded-md py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
              Videos
            </Tab>
            <Tab className="mr-4 rounded-md py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
              {" "}
              Backdrops
            </Tab>
            <Tab className="rounded-md py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
              Posters
            </Tab>
            <TabPanels className="pt-3 ">
              <TabPanel className="rounded-xl overflow-x-auto " key={0}>
                <div className="flex  mb-4 gap-2 px-4">
                  {movieAllVideos?.length ? (
                    movieAllVideos?.map((video) => (
                      <button
                        type="button"
                        className="relative group  transition-all duration-500 "
                        key={video.key}
                        onClick={() => {
                          setIsOpen(true);
                          setCurrentVideoKey(video.key);
                        }}
                      >
                        <Image
                          width={180}
                          height={240}
                          src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                          // src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                          alt={video.name}
                          className="min-w-[280px] min-h-[calc(180px*.5625)] group-hover:opacity-45 rounded-sm  aspect-[16/9] "
                        />
                        <span className=" w-full h-full absolute top-0 play-movie-btn cursor-pointer flex justify-center items-center">
                          <VideoPlayIcon />
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="py-2 opacity-70">No Video Found</p>
                  )}
                </div>
              </TabPanel>
              <TabPanel className="rounded-xl overflow-x-auto " key={1}>
                <div className="flex  mb-4 gap-2 px-4">
                  {movieAllPosters.backdrops.length ? (
                    movieAllPosters.backdrops?.map((video) => (
                      <Image
                        width={180}
                        height={240}
                        key={video.file_path}
                        src={getBackdropImageFullPath(video.file_path || "")}
                        alt={"Backdrop Image"}
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
                  {movieAllPosters?.posters?.length ? (
                    movieAllPosters?.posters?.map((poster) => (
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
      {/* open Trailer  */}
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-[2000] focus:outline-none"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed bg-[#00000081]  backdrop-blur-sm inset-0  w-screen overflow-y-auto">
            <div className="flex    min-h-full items-center justify-center   overflow-hidden ">
              <div className="overflow-hidden relative py-4">
                <button
                  className="absolute -top-[5px] right-8 md:right-0 "
                  onClick={() => setIsOpen(false)}
                >
                  <RxCross2 className="text-white hover:text-pink text-lg" />
                </button>
                <div className=" h-fit overflow-hidden mx-8 md:mx-0">
                  <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 transform-[scale(95%)]"
                    enterTo="opacity-100 transform-[scale(100%)]"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 transform-[scale(100%)]"
                    leaveTo="opacity-0 transform-[scale(95%)]"
                  >
                    <DialogPanel className="w-fit overflow-hidden rounded-lg bg-white/5 backdrop-blur-2xl">
                      <iframe
                        className="w-[calc(100vw)] h-[calc(100vw*0.5625)] md:w-[calc(0.7*100vw)] md:h-[calc(0.7*100vw*0.5625)]  rounded-lg "
                        src={`//www.youtube.com/embed/${currentVideoKey || ""}`}
                      ></iframe>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
