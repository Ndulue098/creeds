import Image from "next/image";
// building
import building1 from "@/public/building.svg";
import Link from "next/link";

export default function Hero() {
  return (
    /*   <section className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-gradient-to-b from-black via-black to-green-900">
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="text-start">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            <span className="text-2xl block text-gray-200 mb-2">
              Beyond Bricks and Beams.
            </span>
            <span className="text-green-400 font-semibold">
              We Build Ideas, Stories, and Futures.
            </span>
          </h1>

          <p className="text-gray-300 mb-10 text-base max-w-xl">
            <span className="text-green-400 font-semibold">Creeds</span> is
            created to educate, inform, and inspire. Discover the builder’s
            craft, campus stories, scholarly insights, and the events shaping
            our department.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-full transition-all duration-300">
              View Articles
            </button>
            <button className="px-6 py-3 border border-green-400 text-green-400 hover:bg-green-400/10 rounded-full transition-all duration-300">
              See Announcements
            </button>
          </div>
        </div>

        <div className="relative h-full ">
          <Image
            fill
            src={building1}
            alt="Building illustration"
            className="absolute"
          />
        </div>
      </div>
    </section> */

    <section className="relative min-h-screen mt-7 lg:mt-0 flex flex-col justify-center items-center text-gray-900 overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-100">
      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(0,100,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,100,0,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl px-4 grid lg:grid-cols-2 lg:grid-rows-none grid-rows-2 gap-10 items-center
        md:px-6
      "
      >
        {/* Left - Text */}
        <div className="lg:text-start text-center">
          <h1 className="lg:text-5xl text-4xl font-bold lg:mb-6 mb-3  leading-tight">
            <span className="text-2xl block text-gray-600 mb-2">
              Beyond Bricks and Beams.
            </span>
            <span className="text-green-600 font-semibold">
              We Build Ideas,
              <br /> Stories,
              <br /> and Futures.
            </span>
          </h1>

          <p className="text-gray-700 lg:mb-10 mb-5 text-base max-w-xl">
            <span className="text-green-700 font-semibold">Creeds</span> is
            created to educate, inform, and inspire. Discover the builder’s
            craft, campus stories, scholarly insights, and the events shaping
            our department.
          </p>

          {/* CTA Buttons */}
          <div className="flex sm:gap-4 gap-2 justify-center lg:justify-start ">
            <Link href={"/blog-posts"}>
              <button className="sm:px-6 px-4 sm:py-3 py-2 text-sm sm:text-base bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full transition-all duration-300 shadow-md">
                View Articles
              </button>
            </Link>
            <Link href={"/#announcement"}>
              <button className="sm:px-6 px-4 sm:py-3 py-2 border text-sm sm:text-base border-green-600 text-green-600 hover:bg-green-50 rounded-full transition-all duration-300">
                See Announcements
              </button>
            </Link>
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative h-full">
          <Image
            fill
            src={building1}
            // width={500}
            // height={500}
            alt="Building illustration"
            className="object-contain opacity-90"
          />
        </div>
      </div>
    </section>
  );
}
