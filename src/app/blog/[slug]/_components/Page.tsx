/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface ContentBlock {
  type:
    | "paragraph"
    | "heading"
    | "list"
    | "quote"
    | "image"
    | "video"
    | "code"
    | "table"
    | "callout"
    | "custom";
  data: any;
  order: number;
}

interface TableOfContent {
  id: string;
  text: string;
  level: number;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  banner?: string;
  featuredImage?: string;
  contentBlocks?: ContentBlock[];
  categories: Array<{
    _id: string;
    name: string;
    slug: string;
    color?: string;
  }>;
  tags: Array<{
    _id: string;
    name: string;
    slug: string;
    color?: string;
  }>;
  status: string;
  publishedAt?: string;
  readTime: number;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  language: string;
  tableOfContents?: TableOfContent[];
  relatedBlogs?: Array<{
    _id: string;
    title: string;
    slug: string;
    summary: string;
    featuredImage?: string;
    banner?: string;
    readTime: number;
    publishedAt?: string;
  }>;
  series?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    focusKeyword?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface SeriesRelatedBlog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  banner?: string;
  featuredImage?: string;
  readTime: number;
  publishedAt?: string;
}

interface Series {
  _id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail?: string;
  blogCount: number;
  difficulty?: string;
  isActive: boolean;
}

interface SeriesBlog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage?: string;
  banner?: string;
  readTime: number;
  publishedAt?: string;
  order: number;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  color?: string;
  blogCount: number;
}

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/admin/blogs/categories`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();
  return data.data || data;
};

// New function to fetch related blogs by series ID
const fetchSeriesRelatedBlogs = async (
  seriesId: string,
  currentBlogId: string
): Promise<SeriesRelatedBlog[]> => {
  const queryParams = new URLSearchParams({
    seriesId: seriesId,
    status: "published",
    limit: "10",
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/admin/blogs?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch series related blogs");
  }

  const data = await response.json();
  const blogs = data.data || data;

  // Filter out the current blog
  return blogs.filter((blog: SeriesRelatedBlog) => blog._id !== currentBlogId);
};

export default function SingleBlogPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeToC, setActiveToC] = useState<string>("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [allSeries, setAllSeries] = useState<Series[]>([]);
  const [currentSeries, setCurrentSeries] = useState<SeriesBlog[]>([]);
  const [seriesLoading, setSeriesLoading] = useState(true);
  const [seriesRelatedBlogs, setSeriesRelatedBlogs] = useState<
    SeriesRelatedBlog[]
  >([]);

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/admin/blogs/slug/${slug}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          toast.error("Blog not found");
          throw new Error("Blog not found");
        }
        throw new Error("Failed to load blog");
      }
      toast.success("Blog loaded successfully");
      const data = await response.json();
      setBlog(data.data || data);
      setLikeCount(data.data?.likeCount || data.likeCount || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchSeries = async () => {
    try {
      setSeriesLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/admin/blogs/series`
      );
      if (response.ok) {
        const data = await response.json();
        setAllSeries(data.data || data);
      }
    } catch (err) {
      console.error("Failed to fetch series:", err);
    } finally {
      setSeriesLoading(false);
    }
  };

  const fetchCurrentSeries = async (seriesId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/admin/blogs/series/${seriesId}`
      );
      if (response.ok) {
        const data = await response.json();
        setCurrentSeries(data.data || data);
      }
    } catch (err) {
      console.error("Failed to fetch current series:", err);
    }
  };

  // New function to load series related blogs
  const loadSeriesRelatedBlogs = async (
    seriesId: string,
    currentBlogId: string
  ) => {
    try {
      const relatedBlogs = await fetchSeriesRelatedBlogs(
        seriesId,
        currentBlogId
      );
      setSeriesRelatedBlogs(relatedBlogs);
    } catch (err) {
      console.error("Failed to fetch series related blogs:", err);
    }
  };

  // Track scroll for table of contents
  useEffect(() => {
    if (!blog?.tableOfContents?.length) return;

    const handleScroll = () => {
      const headings = blog.tableOfContents
        ?.map((item) => document.getElementById(item.id))
        .filter(Boolean);
      if (!headings?.length) return;

      const currentHeading = headings.find((heading) => {
        const rect = heading!.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentHeading) {
        setActiveToC(currentHeading.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);

  useEffect(() => {
    if (!blog && slug) {
      fetchBlog();
    }
    fetchSeries();
  }, [slug]);

  useEffect(() => {
    if (blog?.series) {
      fetchCurrentSeries(blog.series);
      // Load series related blogs
      loadSeriesRelatedBlogs(blog.series, blog._id);
    }
  }, [blog]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-50 text-green-700 border-green-200";
      case "intermediate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/blogs/${slug}/like`,
        { method: "POST" }
      );

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      }
    } catch (err) {
      console.error("Failed to like blog:", err);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.summary,
          url: shareUrl,
        });
      } catch (err) {
        navigator.clipboard.writeText(shareUrl);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case "heading":
        const HeadingTag = `h${
          block.data.level || 2
          // @ts-expect-error err
        }` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: "text-3xl font-bold mb-6 mt-10 text-gray-900",
          2: "text-2xl font-bold mb-5 mt-8 text-gray-900",
          3: "text-xl font-bold mb-4 mt-6 text-gray-900",
          4: "text-lg font-bold mb-4 mt-6 text-gray-900",
          5: "text-base font-bold mb-3 mt-4 text-gray-900",
          6: "text-sm font-bold mb-3 mt-4 text-gray-900",
        };

        return (
          // @ts-expect-error err
          <HeadingTag
            key={block.order}
            id={block.data.id}
            className={
              headingClasses[block.data.level as keyof typeof headingClasses] ||
              headingClasses[2]
            }
          >
            {block.data.text}
          </HeadingTag>
        );

      case "paragraph":
        return (
          <p key={block.order} className="mb-4 leading-relaxed text-gray-700">
            {block.data.text}
          </p>
        );

      case "image":
        return (
          <figure key={block.order} className="my-6">
            <div className="relative h-48 md:h-64 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={block.data.url}
                alt={block.data.caption || block.data.alt || ""}
                className="w-full h-full object-cover"
              />
            </div>
            {block.data.caption && (
              <figcaption className="text-sm text-gray-600 text-center mt-2 italic">
                {block.data.caption}
              </figcaption>
            )}
          </figure>
        );

      case "quote":
        return (
          <blockquote
            key={block.order}
            className="border-l-4 border-blue-500 pl-4 my-6 bg-blue-50 p-4 rounded-r-lg"
          >
            <p className="text-gray-800 text-lg italic font-medium leading-relaxed">
              "{block.data.text}"
            </p>
            {block.data.author && (
              <cite className="block mt-3 text-gray-600 font-semibold not-italic">
                — {block.data.author}
              </cite>
            )}
          </blockquote>
        );

      case "code":
        return (
          <div key={block.order} className="my-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              {block.data.language && (
                <div className="bg-gray-800 px-4 py-2 text-gray-300 text-sm font-mono border-b border-gray-700">
                  {block.data.language}
                </div>
              )}
              <pre className="p-4 overflow-x-auto">
                <code className="text-green-400 font-mono text-sm leading-relaxed">
                  {block.data.code}
                </code>
              </pre>
            </div>
          </div>
        );

      case "list":
        const ListTag = block.data.style === "ordered" ? "ol" : "ul";
        return (
          <ListTag
            key={block.order}
            className={`mb-4 space-y-1 ${
              block.data.style === "ordered"
                ? "list-decimal list-inside"
                : "list-disc list-inside"
            }`}
          >
            {block.data.items.map((item: string, index: number) => (
              <li key={index} className="text-gray-700 leading-relaxed pl-2">
                {item}
              </li>
            ))}
          </ListTag>
        );

      case "callout":
        const calloutColors = {
          info: "bg-blue-50 border-blue-200 text-blue-800",
          warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
          error: "bg-red-50 border-red-200 text-red-800",
          success: "bg-green-50 border-green-200 text-green-800",
        };

        return (
          <div
            key={block.order}
            className={`my-6 p-4 rounded-lg border-l-4 ${
              calloutColors[block.data.type as keyof typeof calloutColors] ||
              calloutColors.info
            }`}
          >
            <p className="font-medium">{block.data.text}</p>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center min-h-96 pt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="text-center py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {error ||
                "The blog post you are looking for does not exist or has been moved."}
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const heroImage = blog.banner || blog.featuredImage;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <div className="flex items-center gap-8">
            <div>
              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl">
                {blog.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formatDate(blog.publishedAt || blog.createdAt)}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {blog.readTime} min read
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {blog.viewCount} views
                </span>

                {blog.difficulty && (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${getDifficultyColor(
                      blog.difficulty
                    )}`}
                  >
                    {blog.difficulty}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            {heroImage && (
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200">
                <img
                  src={heroImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Summary */}
            {blog.summary && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed font-medium">
                  {blog.summary}
                </p>
              </div>
            )}

            {/* Table of Contents */}
            {blog.tableOfContents && blog.tableOfContents.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Table of Contents
                </h2>
                <nav className="space-y-2">
                  {blog.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-2 px-3 rounded-lg transition-all hover:bg-blue-50 ${
                        activeToC === item.id
                          ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                      style={{ marginLeft: `${(item.level - 1) * 16}px` }}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Content */}
            <article className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="prose max-w-none">
                {blog.contentBlocks && blog.contentBlocks.length > 0 ? (
                  blog.contentBlocks
                    .sort((a, b) => a.order - b.order)
                    .map(renderContentBlock)
                ) : (
                  <>
                    <div className="">
                      <div
                        className="prose prose-lg max-w-none [&_p]:mb-4 [&_h1]:my-6 [&_h1]:first:mt-0 [&_h2]:my-6 [&_h2]:first:mt-0 [&_h3]:my-6 [&_h3]:first:mt-0 [&_h4]:my-4 [&_h4]:first:mt-0 [&_h5]:my-4 [&_h5]:first:mt-0 [&_h6]:my-4 [&_h6]:first:mt-0 [&_ul]:mb-4 [&_ol]:mb-4 [&_li]:mb-1 [&_blockquote]:my-6 [&_pre]:my-6 [&_img]:my-6 [&_table]:my-6 [&_hr]:my-6"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      />
                    </div>
                  </>
                )}
              </div>
            </article>

            {/* Tags */}
            {blog.tags.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-3">
                  {blog.tags.map((tag) => (
                    <Link
                      key={tag._id}
                      href={`/blog/tag/${tag.slug}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-all"
                      style={
                        tag.color
                          ? {
                              backgroundColor: `${tag.color}22`,
                              color: tag.color,
                              borderColor: `${tag.color}44`,
                            }
                          : {}
                      }
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Current Series */}
            {blog.series && currentSeries.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {blog.series} Series
                </h3>
                <div className="space-y-3">
                  {currentSeries.slice(0, 5).map((seriesBlog) => (
                    <Link
                      key={seriesBlog._id}
                      href={`/blog/${seriesBlog.slug}`}
                      className={`block p-3 rounded-lg transition-colors ${
                        seriesBlog.slug === slug
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            seriesBlog.slug === slug
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {seriesBlog.order}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-medium text-sm leading-tight ${
                              seriesBlog.slug === slug
                                ? "text-blue-700"
                                : "text-gray-900 group-hover:text-blue-600"
                            }`}
                          >
                            {seriesBlog.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {seriesBlog.readTime} min read
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {currentSeries.length > 5 && (
                  <Link
                    href={`/blog/series/${blog.series}`}
                    className="block w-full text-center py-2 mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View all {currentSeries.length} articles
                  </Link>
                )}
              </div>
            )}

            {/* Series Related Articles */}
            {seriesRelatedBlogs.length > 0 && (
              <div className="   rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                  More from this Topics
                </h3>
                <div className="space-y-4">
                  {seriesRelatedBlogs.slice(0, 4).map((relatedBlog) => (
                    <Link
                      key={relatedBlog._id}
                      href={`/blog/${relatedBlog.slug}`}
                      className="block group"
                    >
                      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden hover:border-gray-300">
                        {/* Card Image */}
                        <div className="relative h-32 overflow-hidden">
                          {relatedBlog.banner || relatedBlog.featuredImage ? (
                            <img
                              src={
                                relatedBlog.banner ||
                                relatedBlog.featuredImage ||
                                ""
                              }
                              alt={relatedBlog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-white opacity-80"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Card Content */}
                        <div className="p-4">
                          <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 line-clamp-2 transition-colors mb-2 leading-tight">
                            {relatedBlog.title}
                          </h4>

                          {relatedBlog.summary && (
                            <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                              {relatedBlog.summary}
                            </p>
                          )}

                          {/* Card Meta */}
                          <div className="flex items-center justify-between">
                            {relatedBlog.readTime && (
                              <div className="flex items-center text-xs text-gray-400">
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {relatedBlog.readTime} min read
                              </div>
                            )}

                            {relatedBlog.publishedAt && (
                              <span className="text-xs text-gray-400">
                                {new Date(
                                  relatedBlog.publishedAt
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {seriesRelatedBlogs.length > 4 && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                      href={`/blog/series/${blog.series}`}
                      className="block w-full text-center py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 font-medium text-sm rounded-lg transition-colors"
                    >
                      View {seriesRelatedBlogs.length - 4} more articles →
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Original Related Articles (if available) */}
            {blog.relatedBlogs && blog.relatedBlogs.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {blog.relatedBlogs.slice(0, 4).map((relatedBlog) => (
                    <Link
                      key={relatedBlog._id}
                      href={`/blog/${relatedBlog.slug}`}
                      className="block group hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          {relatedBlog.banner || relatedBlog.featuredImage ? (
                            <img
                              src={
                                relatedBlog.banner ||
                                relatedBlog.featuredImage ||
                                ""
                              }
                              alt={relatedBlog.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm group-hover:text-blue-600 line-clamp-2 transition-colors">
                            {relatedBlog.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {relatedBlog.summary}
                          </p>
                          {relatedBlog.readTime && (
                            <div className="flex items-center text-xs text-gray-400 mt-2">
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {relatedBlog.readTime} min read
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/blog"
                  className="block w-full text-center py-2 mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View More Articles
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-10"
        aria-label="Back to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}
