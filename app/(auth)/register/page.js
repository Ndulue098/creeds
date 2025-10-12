import Image from "next/image";
import RegisterForm from "./RegisterForm";
import formSvg from "@/public/form2.svg";
import Link from "next/link";


export default function page() {
  return (
    <section className="p-5 border rounded-md bg-card">
      <h2 className="border-b text-2xl font-semibold pb-3 mb-6 text-foreground">
        Register Form
      </h2>

      <div className="grid grid-cols-[55fr_45fr] gap-6 rounded-md overflow-hidden w-full">
        {/* Left column - Form */}
        <RegisterForm />

        {/* Right column - Background Image */}
        <div className="relative  rounded-md overflow-hidden">
          <Image
            src={formSvg}
            alt="form illustration"
            fill
            className="object-cover object-center brightness-105"
          />
          {/* Optional overlay to make it look subtle */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
        </div>
      </div>
      <div className="mt-2 text-center">
        Already have an account?
        <Link href="/login" className="pl-2 underline">
          Log in here
        </Link>
      </div>
    </section>
  );
}
