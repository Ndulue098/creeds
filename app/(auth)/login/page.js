import ContinueWithGoogleBtn from "@/components/ContinueWithGoogleBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "./LoginForm";
import Image from "next/image";
import formSvg from "@/public/login2.svg";
import { HardHatIcon } from "lucide-react";

export default function page() {
  return (
    <Card
      className="
    grid 
    sm:grid-cols-[55fr_45fr] 
    grid-rows-[40fr_60fr] sm:grid-rows-none 
    sm:gap-4 
    gap-1
    border 
    rounded-md
    overflow-hidden 
    w-full 
    p-0
  "
    >
      {/* Form Section */}
      <div className="flex flex-col justify-center sm:py-6 py-3 sm:px-4 px-2 sm:order-none order-2">
        <CardHeader>
          <CardTitle className="text-2xl mb-2 sm:mb-4">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4">
          <span className="text-sm text-muted-foreground">
            Don&apos;t have an account?
          </span>
          <Link
            href="/register"
            className="text-sm font-medium text-primary underline"
          >
            Register here
          </Link>
        </CardFooter>
      </div>

      {/* Image Section */}
      <div className="relative sm:order-none order-1 min-h-[150px] sm:min-h-full">
        <Image
          src={formSvg}
          alt="form illustration"
          fill
          className="object-cover object-center brightness-105"
        />
      </div>
    </Card>
  );
}

// export default function page() {
//   return (
//     <Card className="">
//       <CardHeader>
//         <CardTitle>login</CardTitle>
//       </CardHeader>

//       <CardContent className="grid grid-cols-[55fr_45fr] gap-6 rounded-md overflow-hidden w-full">
//         <LoginForm />
//         {/* <ContinueWithGoogleBtn /> */}
//         <CardDescription className="relative  rounded-md overflow-hidden">
//           <Image
//             src={formSvg}
//             alt="form illustration"
//             fill
//             className="object-cover object-center brightness-105"
//           />

//           {/* Optional overlay to make it look subtle */}
//           <div className="absolute inset-0 bg-gradient-to-t from-emerald-800/60 via-emerald-600/30 to-transparent" />
//           {/* icon */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="bg-white/20 p-4 rounded-full shadow-md">
//               <HardHatIcon className="w-10 h-10 " />
//             </div>
//           </div>
//         </CardDescription>
//       </CardContent>

//       <CardFooter className="flex items-center justify-center ">
//         Don&apos;t have an account?
//         <Link href="/register" className=" underline pl-2">
//           Register here.
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// }
