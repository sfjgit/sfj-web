// components/Navigation.tsx (Updated)
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Users,
  Settings,
  Building,
  GraduationCap,
  Heart,
  BookOpenCheck,
  User,
  LogOut,
} from "lucide-react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  rehydrateAuth,
  getAccessToken,
  clearAccessToken,
} from "@/hooks/useAxios";
import { useAxios } from "@/hooks/useAxios";

interface UserProfile {
  _id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInitiativesOpen, setIsInitiativesOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const location = usePathname();
  const router = useRouter();
  const api = useAxios();

  // Fetch user profile on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try to rehydrate auth first
        await rehydrateAuth();

        // If we have a token, fetch user profile
        const token = getAccessToken();
        if (token) {
          const response = await api.get("/auth/me");
          if (response.data?.success && response.data?.data) {
            setUser(response.data.data.user);
          }
        }
      } catch (error) {
        console.error("Auth init error:", error);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dismiss the Services mega-menu on any click outside it (including on the
  // navbar itself, which sits above the backdrop), on Escape, and on scroll.
  useEffect(() => {
    if (!isSolutionsOpen) return;

    const handlePointerDown = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("[data-services-menu], [data-services-trigger]"))
        return;
      setIsSolutionsOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSolutionsOpen(false);
    };
    const close = () => setIsSolutionsOpen(false);

    // Capture phase: the hero carousel and other widgets call
    // stopPropagation() on their own pointer handlers, which would otherwise
    // swallow the event before it ever reached a bubble-phase listener here.
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown, true);
    document.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", close, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown, true);
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", close);
    };
  }, [isSolutionsOpen]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/signout");
      clearAccessToken();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Clear token anyway
      clearAccessToken();
      setUser(null);
      router.push("/");
    }
  };

  // Single navigation array with children and without children
  const navigationItems = [
    // { path: "/", label: "Home", hasChildren: false },
    {
      path: "/services",
      label: "Services",
      hasChildren: true,
      children: [
        {
          path: "/services/corporate-it-training-programs",
          label: "Knowledge-as-a-Service (KaaS)",
          icon: BookOpen,
          description:
            "Upskill enterprise teams in AI, cloud and emerging technologies faster.",
          group: "KaaS",
          groupTitle: "For Enterprises & GCCs",
          hasChildren: false,
        },
        {
          path: "/services/it-staffing-company",
          label: "Talent-as-a-Service (TaaS)",
          icon: Users,
          description:
            "Deploy skilled technology professionals across critical roles, functions and levels.",
          group: "KaaS",
          groupTitle: "For Enterprises & GCCs",
          hasChildren: false,
        },

        {
          path: "/services/government-initiatives",
          label: "Government Skilling Missions",
          icon: Building,
          description:
            "Execute large-scale government skilling mandates with measurable workforce outcomes nationwide.",
          group: "Government",
          groupTitle: "For Government",
          hasChildren: false,
        },
        {
          path: "/services/institutional-training",
          label: "Institutional Training (B2I)",
          icon: GraduationCap,
          description:
            "Prepare students for careers through industry-aligned, outcome-driven institutional training programs.",
          group: "Institutions",
          groupTitle: "For Institutions",
          hasChildren: false,
        },
        {
          path: "/services/corporate-social-responsibility",
          label: "CSR Skilling Partner",
          icon: Heart,
          description:
            "Create sustainable livelihoods through inclusive, outcome-driven skilling for underserved communities.",
          group: "CSR",
          groupTitle: "For CSR",
          hasChildren: false,
        },
        {
          path: "/initiatives/faculty-development",
          label: "Faculty Development",
          icon: BookOpenCheck,
          description:
            "Equip educators with AI, emerging technology, research and teaching capabilities.",
          group: "Government",
          groupTitle: "For Government",
          hasChildren: false,
        },
      ],
    },
    {
      path: "/industries",
      label: "Industries",
      hasChildren: false,
    },
    {
      path: "/company",
      label: "Company",
      hasChildren: true,
      children: [
        // { path: "/jobs", label: "Careers", hasChildren: false },
        { path: "/careers", label: "Careers", hasChildren: false },
        { path: "/blog", label: "Blogs", hasChildren: false },
      ],
    },
  ];
  const isActiveItem = (item: any) => {
    if (item.hasChildren) {
      return (
        item.children?.some((child: any) => location === child.path) ||
        location === item.path
      );
    }
    return location === item.path;
  };

  const isLocationBlack = () => {
    if (
      location === "/services/institutional-training" ||
      location === "/" ||
      location === "/services/government-initiatives" ||
      location === "/services/corporate-it-training-programs" ||
      location === "/life-at-sfjbs" ||
      location.split("/").includes("careers") ||
      location.split("/").includes("blog") ||
      location === "/contact"
    ) {
      return true;
    }
    return false;
  };

  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) return user.firstName;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };
  const groupChildren = (children: any[]) => {
    const groups: { title: string; items: any[] }[] = [];
    const seen = new Map<string, number>();
    children.forEach((child) => {
      if (!seen.has(child.group)) {
        seen.set(child.group, groups.length);
        groups.push({ title: child.groupTitle, items: [] });
      }
      groups[seen.get(child.group)!].items.push(child);
    });
    return groups;
  };

  const serviceGroups = groupChildren(
    navigationItems.find((i) => i.label === "Services")?.children || [],
  );

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 px-10 sm:px-16 lg:px-28 pt-6">
      <div className="relative max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 px-6">
        <div className="flex items-center gap-4 py-2">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-1">
            <Link
              href="/"
              className="flex flex-col items-center group transition-transform hover:scale-105"
            >
              <div className="relative">
                <Image
                  src="/app/sfjlogo.png"
                  alt="SFJ Logo"
                  className="w-9 h-9 object-cover"
                  quality={100}
                  width={36}
                  height={36}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - center links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative">
                {item.label === "Services" ? (
                  <button
                    data-services-trigger
                    onClick={() => setIsSolutionsOpen((v) => !v)}
                    className={`flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 group ${
                      isActiveItem(item) || isSolutionsOpen
                        ? "text-blue-600 bg-blue-50 shadow-sm"
                        : isScrolled || isLocationBlack()
                          ? "text-black"
                          : "text-black"
                    }`}
                  >
                    Services
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isSolutionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : item.hasChildren ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 group ${
                          isActiveItem(item)
                            ? "text-blue-600 bg-blue-50 shadow-sm"
                            : isScrolled || isLocationBlack()
                              ? "text-black"
                              : "text-black"
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180 duration-200" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-80 p-2 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-xl"
                    >
                      {item.children?.map((child: any) => (
                        <DropdownMenuItem
                          key={child.path}
                          asChild
                          className="p-0 hover:cursor-pointer"
                        >
                          <Link
                            href={child.path}
                            className="flex items-start p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                                {child.label}
                              </div>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.path}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 ${
                      isActiveItem(item)
                        ? "text-blue-600 bg-blue-50 shadow-sm"
                        : isScrolled || isLocationBlack()
                          ? "text-black"
                          : "text-black"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Navigation - right buttons */}
          <div className="hidden md:flex items-center flex-1 justify-end">
            {/* Auth Section */}
            {isAuthLoading ? (
              <div className="ml-4 w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-4 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                      {getUserDisplayName().charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                      {getUserDisplayName()}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-xl p-2"
                >
                  <div className="px-3 py-2 border-b border-gray-100 mb-2">
                    <p className="text-sm font-medium text-gray-900">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/lms/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <GraduationCap className="w-4 h-4" />
                      My Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/lms/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/signin")}
                  aria-label="Sign Up"
                  title="Sign Up"
                  className="ml-4 flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <AiOutlineUserAdd className="w-[1.15rem] h-[1.15rem]" />
                  <span>Sign Up</span>
                </Button>
                {/* <Button
                  onClick={() => router.push("/contact")}
                  className="ml-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Contact Us
                </Button> */}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  } ${
                    isScrolled || isLocationBlack()
                      ? "text-black"
                      : "text-black"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  } ${
                    isScrolled || isLocationBlack()
                      ? "text-black"
                      : "text-black"
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>

        {isSolutionsOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsSolutionsOpen(false)}
            />
            <div
              data-services-menu
              onMouseLeave={() => setIsSolutionsOpen(false)}
              className="absolute left-0 right-0 top-full mt-2 p-5 bg-white border border-gray-200/50 shadow-xl rounded-xl z-50"
            >
              {/* Columns are sized to the number of groups, so removing a
                  group never leaves an empty slot on the right. */}
              <div
                className="grid gap-5 items-start"
                style={{
                  gridTemplateColumns: `repeat(${serviceGroups.length}, minmax(0, 1fr))`,
                }}
              >
                {serviceGroups.map((group: any) => (
                  <div key={group.title} className="min-w-0">
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2 pb-2 border-b-2 border-gray-300">
                      {group.title}
                    </div>
                    <div className="space-y-1">
                      {group.items.map((child: any) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          onClick={() => setIsSolutionsOpen(false)}
                          className="block p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                        >
                          <div className="font-medium text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
                            {child.label}
                          </div>
                          {child.description && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {child.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pb-4 space-y-2 bg-white/95 backdrop-blur-md rounded-b-xl shadow-lg">
            {navigationItems.map((item: any) => (
              <div key={item.path}>
                {item.hasChildren ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-50 rounded-lg">
                      {item.label}
                    </div>
                    <div className="pl-4 space-y-1">
                      {item.children?.map((child: any) =>
                        child.hasChildren ? (
                          <div key={child.label} className="space-y-1">
                            <div className="px-3 py-2 text-sm font-medium text-gray-700">
                              {child.label}
                            </div>
                            <div className="pl-4 space-y-1">
                              {child.children?.map((sub: any) => (
                                <Link
                                  key={sub.path}
                                  href={sub.path}
                                  className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                                    location === sub.path
                                      ? "text-blue-600 bg-blue-50 font-medium"
                                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                  }`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {sub.icon && (
                                    <sub.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                                  )}
                                  <span className="truncate">{sub.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={child.path}
                            href={child.path}
                            className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                              location === child.path
                                ? "text-blue-600 bg-blue-50 font-medium"
                                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.icon && (
                              <child.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                            )}
                            <span className="truncate">{child.label}</span>
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      location === item.path
                        ? "text-blue-600 bg-blue-50 font-semibold"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Auth Section */}
            {isAuthLoading ? (
              <div className="pt-2 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              </div>
            ) : user ? (
              <div className="pt-2 space-y-2">
                <div className="px-3 py-2 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <Link
                  href="/lms/dashboard"
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <GraduationCap className="w-4 h-4" />
                  My Courses
                </Link>
                <Link
                  href="/lms/profile"
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-2 space-y-2">
                <Button
                  className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    router.push("/signin");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                {/* <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 rounded-lg shadow-md"
                  onClick={() => {
                    router.push("/contact");
                    setIsMenuOpen(false);
                  }}
                >
                  Contact Us
                </Button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
