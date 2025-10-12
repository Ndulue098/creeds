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
    <Card className="grid grid-cols-[55fr_45fr] shadow-none border-[1px]  p-0 gap-4 rounded-md overflow-hidden w-full">
      <div className="py-4">
      <CardHeader>
        <CardTitle className="text-2xl mb-4">Login</CardTitle>
      </CardHeader>

      <CardContent> 
        <LoginForm />
      </CardContent>

      <CardFooter className="flex mt-3 items-center justify-center ">
        Don&apos;t have an account?
        <Link href="/register" className=" underline pl-2">
          Register here.
        </Link>
      </CardFooter>
      </div>

      <div className="relative">
        <CardDescription className="  rounded-md overflow-hidden">
          <Image
            src={formSvg}
            alt="form illustration"
            fill
            className="object-cover object-center brightness-105"
          />

          {/* Optional overlay to make it look subtle */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-emerald-800/60 via-emerald-600/30 to-transparent" /> */}
          {/* icon */}

          {/* <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 p-4 rounded-full shadow-md">
              <HardHatIcon className="w-10 h-10 " />
            </div>
          </div> */}
        </CardDescription>
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
