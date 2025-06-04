"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = usePathname();
  const router = useRouter();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/solutions/corporate-training", label: "Corporate Training" },
    { path: "/corporate-social-responsibility", label: "CSR" },

    { path: "/solutions", label: "Solutions" },
    { path: "/impact", label: "Impact" },
    { path: "/partners", label: "Partners" },
  ];

  return (
    <nav className="fixed top-0 w-full  backdrop-blur-sm  z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  justify-between items-center my-1">
          <Link href="/" className="flex flex-col items-center space-x-2">
            <Image
              src="/app/sfjlogo.png"
              alt="sfjlogo"
              className="w-16  object-cover "
              quality={100}
              width={100}
              height={100}
            />
            <p className="text-xs font-semibold -m-1">
              Let&apos;s <span className="">Transform</span>
            </p>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location === item.path
                    ? "text-black bg-white p-2 rounded-md  pb-1"
                    : "text-black"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              onClick={() => router.push("/contact")}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-2 text-sm font-medium transition-colors ${
                    location === item.path
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
