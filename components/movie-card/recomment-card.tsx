export default function RecommentCard() {
  return (
    <div className="movie-card  bg-[#16632e23] rounded-[10px] shadow-sm shadow-[#5b7942]">
      <div className="relative">
        <img
          src="https://image.tmdb.org/t/p/original/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg"
          className="rounded-[10px_10px_0_0] min-w-[180px] h-[240px]"
          alt="Movie Name"
        />
      </div>
      <div className="py-3 px-4">
        <h2 className="text-base sm:text-lg  text-white">The Boys</h2>
        <p className="text-[12px] sm:text-sm  text-white opacity-50 ">
          {" "}
          Jun 15, 2024
        </p>
      </div>
    </div>
  );
}
