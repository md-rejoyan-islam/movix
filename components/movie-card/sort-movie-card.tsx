export default function SortMovieCard() {
  return (
    <div className="card  w-full ">
      <div className="relative">
        <img
          src="https://image.tmdb.org/t/p/original/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg"
          className="rounded-xl"
          alt=""
        />
      </div>
      <div className="pt-3">
        <h2 className="text-lg sm:text-[20px] text-white">The Boys</h2>
        <p className="text-[12px] sm:text-[14px] text-white opacity-50 ">
          {" "}
          Jun 15, 2024
        </p>
      </div>
    </div>
  );
}
