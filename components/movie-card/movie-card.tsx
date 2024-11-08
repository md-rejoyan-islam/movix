export default function MovieCard() {
  return (
    <div className="card  w-full ">
      <div className="relative">
        <img
          src="https://image.tmdb.org/t/p/original/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg"
          className="rounded-xl"
          alt=""
        />
        <div className=" absolute -bottom-[18px] left-3">
          <svg
            className="bg-white rounded-full p-[2px] w-9 h-9 sm:w-11 sm:h-11"
            viewBox="0 0 100 100"
            data-test-id="CircularProgressbar"
          >
            <path
              className="CircularProgressbar-trail mx-auto"
              style={{
                strokeDasharray: "289.027px, 289.027px",
                strokeDashoffset: "-45px",
              }}
              d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92 "
              strokeWidth={8}
              fillOpacity={0}
            />
            <path
              className=" stroke-green-600 "
              style={{
                strokeDasharray: "289.027px, 289.027px",
                strokeDashoffset: "72.2566px",
                strokeLinecap: "round",
              }}
              d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
              strokeWidth={8}
              fillOpacity={0}
            />
            <text
              className="text-4xl absolute top-0 left-0 font-semibold"
              x={50}
              y={50}
              style={{
                dominantBaseline: "middle",
                textAnchor: "middle",
              }}
            >
              7.5
            </text>
          </svg>
        </div>
        <div className="genres  absolute bottom-3 flex justify-end w-full  px-2 ">
          <div className="w-1/2 flex gap-1 flex-wrap justify-end ">
            <span className="bg-pink text-white px-1 py-[2px] text-[10px]  sm:text-[12px] rounded-sm">
              Animation
            </span>
            <span className="bg-pink text-white px-1 py-[2px]  text-[10px]  sm:text-[12px] rounded-sm">
              Family
            </span>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <h2 className="text-lg sm:text-[20px] text-white">The Boys</h2>
        <p className="text-[12px] sm:text-[14px] text-white opacity-50 ">
          {" "}
          Jun 15, 2024
        </p>
      </div>
    </div>
  );
}
