"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b  from-emerald-950 via-green-950/90 to-black text-gray-200 py-16 mt-32 overflow-hidden">
    {/* <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(0,100,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,100,0,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" /> */}
      {/* Decorative gradient glow */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.1),transparent_60%)]"></div> */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-7xl mx-auto px-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-green-400">CREEDS Builders</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-300 max-w-sm">
            Building safer, stronger, and smarter structures for a sustainable
            future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-green-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="hover:text-green-400 transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-green-400 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-green-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg text-white mb-3">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-green-400" />
              <span>+234 000 0000 000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-green-400" />
              <span>support@creedsbuild.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-green-400" />
              <span>Lagos, Nigeria</span>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold text-lg text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <Link
              href="#"
              className="hover:text-green-400 transition-transform hover:scale-110"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-green-400 transition-transform hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-green-400 transition-transform hover:scale-110"
            >
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative max-w-7xl mx-auto mt-12 px-6">
        <div className="border-t border-emerald-800/50 my-8"></div>

        {/* Bottom Section */}
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="text-green-400 font-medium">CREEDS Builders</span> —
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
