"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MovieCard from "../movie-card/movie-card";
import MultipleSelector from "../ui/multiple-selector";

function TopMovies() {
  const options = [
    {
      value: "populatity-desending",
      label: "Popularity Descending",
      disable: true,
    },
    { value: "asending", label: "Popularity Ascending" },
    { value: "rating-des", label: "Rating Descending" },
    { value: "rating-asc", label: "Rating Ascending" },
    {
      value: "Release Date Ascending",
      label: "Release Date Ascending",
    },
    {
      value: "Release Date Descending",
      label: "Release Date Descending",
    },
  ];
  return (
    <>
      <div className="max-w-container py-8 md:py-12 px-4">
        <div className="flex gap-4 md:items-center justify-between flex-wrap md:flex-nowrap flex-col md:flex-row">
          <h2 className="text-[24px] text-white text-nowrap px-2">
            Top Rated Movies
          </h2>
          <div className="flex gap-3 flex-wrap md:flex-nowrap items-center">
            <Select>
              <SelectTrigger className="min-w-[130px] bg-black/10 text-white border-sky-600  focus:ring-sky-600 focus:ring-offset-0 max-w-[220px] ">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-[#031022] text-white border-sky-700">
                <SelectGroup>
                  <SelectLabel>Sorting By</SelectLabel>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <MultipleSelector
              defaultOptions={options}
              placeholder="Select Genres"
              onChange={(selected) => console.log(selected)}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-white/90 ">
                  no results found.
                </p>
              }
            />

            {/* <Select
            options={options}
            defaultValue={options[0]}
            closeMenuOnScroll={true}
            isMulti
          /> */}
          </div>
        </div>
        {/* <div className="card-items flex flex-wrap justify-between   gap-x-4 gap-y-8 pt-6"> */}
        <div className="card-items grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 xsm:grid-cols-3 grid-cols-2   gap-x-4 gap-y-6 pt-6">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </div>
    </>
  );
}

export default TopMovies;
