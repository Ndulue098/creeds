import { Building2Icon } from "lucide-react";
import Link from "next/link";
import AuthBtn from "./AuthBtn";

export default function Nav() {
  return (
    <nav className="bg-emerald-500 text-white p-5  flex items-center justify-between">
      <Link href="/" className="flex gap-3 tracking-widest">
        <Building2Icon />
        FESA
      </Link>

      <ul className="flex items-center gap-5">
        <li>
          <Link href="/blog-posts">View Post</Link>
        </li>
        <li>
          <AuthBtn />
        </li>
      </ul>
    </nav>
  );
}
