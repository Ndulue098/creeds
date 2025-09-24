import ContinueWithGoogleBtn from "@/components/ContinueWithGoogleBtn";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default function page() {
    return <Card className="">
      <CardHeader>
        <CardTitle>login</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <LoginForm/> */}
        <ContinueWithGoogleBtn />
      </CardContent>
      <CardFooter>
        Don&apos;t have an account?
        <Link href="/register" className=" underline pl-2">Register here.</Link>
      </CardFooter>
    </Card>
}

