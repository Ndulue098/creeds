import processamico from "@/public/Process-amico.svg";
import Image from "next/image";
export default function Loading() {
  return (
     <div className="flex flex-col items-center justify-center h-[80vh] w-full">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <Image
          src={processamico}
          alt="Loading illustration"
          fill
          className="object-contain"
          priority
        />
      </div>
      <p className="mt-6 text-lg md:text-xl font-semibold text-gray-600 animate-pulse">
        Loading...
      </p>
    </div>
  );
}
