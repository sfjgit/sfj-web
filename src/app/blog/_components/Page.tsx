/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  banner?: string;
  featuredImage?: string;
  categories: Array<{
    _id: string;
    name: string;
    slug: string;
    color?: string;
  }>;
  tags: Array<{
    _id: string;
    name: string;
    color?: string;
  }>;
  publishedAt?: string;
  readTime: number;
  viewCount: number;
  likeCount: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  isFeatured: boolean;
  isTopPick: boolean;
  isPinned: boolean;
  createdAt: string;
  series?: {
    _id: string;
    name: string;
    slug: string;
  };
}

interface BlogsResponse {
  data: Blog[];
  meta?: {
    totalPages: number;
    currentPage: number;
    total: number;
  };
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

interface Category {
  _id: string;
  name: string;
  slug: string;
  color?: string;
  blogCount: number;
}

// API functions
const fetchBlogs = async (params: {
  page: number;
  categoryId?: string;
  seriesId?: string;
  search?: string;
}): Promise<BlogsResponse> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    limit: "12",
    status: "published",
  });

  if (params.categoryId) queryParams.append("category", params.categoryId);
  if (params.seriesId) queryParams.append("series", params.seriesId);
  if (params.search) queryParams.append("search", params.search);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/admin/blogs?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await response.json();
  return {
    data: data.data || data,
    meta: data.meta,
  };
};

const fetchSeries = async (): Promise<Series[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/admin/blogs/series`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch series");
  }

  const data = await response.json();
  return data.data || data;
};

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

export default function BlogLandingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeSeries, setActiveSeries] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Query for blogs with dependencies on filters
  const {
    data: blogsData,
    isLoading: blogsLoading,
    error: blogsError,
    // refetch: refetchBlogs,
  } = useQuery({
    queryKey: ["blogs", currentPage, activeCategory, activeSeries, searchQuery],
    queryFn: () =>
      fetchBlogs({
        page: currentPage,
        categoryId: activeCategory || undefined,
        seriesId: activeSeries || undefined,
        search: searchQuery || undefined,
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  // Query for series
  const {
    data: series = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isLoading: seriesLoading,
    error: seriesError,
  } = useQuery({
    queryKey: ["series"],
    queryFn: fetchSeries,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });

  // Query for categories
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

  const blogs = blogsData?.data || [];
  const totalPages = blogsData?.meta?.totalPages || 1;

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "intermediate":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "advanced":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const clearFilters = () => {
    setActiveCategory("");
    setActiveSeries("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? "" : categoryId);
    setCurrentPage(1);
  };

  const handleSeriesChange = (seriesId: string) => {
    setActiveSeries(activeSeries === seriesId ? "" : seriesId);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show loading state only on initial load
  if (blogsLoading && !blogs.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="flex justify-center items-center min-h-96">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 absolute top-0 left-0"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 mt-20">
      {/* Hero Section - Calm gradient */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Empowering You with AI & Future Skills Insights
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-blue-100">
              Dive into expert articles, industry trends, and practical guides
              on Generative AI, emerging technologies, and workforce
              transformation. Stay ahead with knowledge that drives growth,
              innovation, and impact.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full  mx-auto  sm:px-6 lg:px-10 py-12 2xl:px-20 xl:px-12">
        <div className="flex flex-col xl:flex-row gap-12">
          {/* Main Content - Blog Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {activeCategory || activeSeries || searchQuery
                    ? "Filtered Results"
                    : "Latest Articles"}
                </h2>
                <p className="text-gray-600 mt-2">
                  {blogs.length} {blogs.length === 1 ? "article" : "articles"}{" "}
                  found
                </p>
              </div>
              {blogsLoading && (
                <div className="flex items-center text-blue-600">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent mr-2"></div>
                  Loading...
                </div>
              )}
            </div>

            {/* Blog Grid */}
            {blogsLoading && !blogs.length ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-12">
                {blogs.map((blog) => (
                  <article
                    key={blog._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                  >
                    {/* Featured Image */}
                    <div className="relative h-56 overflow-hidden">
                      {blog.featuredImage || blog.banner ? (
                        <Link href={`/blog/${blog.slug}`}>
                          <img
                            src={blog.featuredImage || blog.banner}
                            alt={blog.title}
                            className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-56"
                          />
                        </Link>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 flex items-center justify-center">
                          <div className="text-white text-center">
                            <svg
                              className="w-12 h-12 mx-auto mb-2 opacity-80"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm font-medium opacity-90">
                              No Image
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      {blog.difficulty && (
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm border capitalize ${getDifficultyColor(
                              blog.difficulty
                            )}`}
                          >
                            {blog.difficulty}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 border-t border-gray-300">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h3>

                      {/* Summary */}
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {blog.summary}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {blog.readTime} min
                          </span>
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
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
                            {blog.viewCount}
                          </span>
                        </div>
                        <time className="text-gray-500">
                          {formatDate(blog.publishedAt || blog.createdAt)}
                        </time>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* No Results */}
            {!blogsLoading && blogs.length === 0 && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.239 0-4.236-.884-5.808-2.325C4.774 11.296 3 9.259 3 7a4 4 0 118 0c0 .738-.404 1.319-.95 1.95"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms to find what
                    you're looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !blogsLoading && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium shadow-sm"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium shadow-sm"
                >
                  Next →
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar - Series Section */}
          <div className="xl:w-80 flex-shrink-0">
            {/* Left Sidebar - Categories and Filters */}
            <div className="xl:w-80 flex-shrink-0">
              <div className="sticky top-8 space-y-8">
                {/* Active Filters */}
                {(activeCategory || activeSeries || searchQuery) && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">
                        Active Filters
                      </h3>
                      <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-2">
                      {activeCategory && (
                        <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg">
                          <span className="text-sm text-blue-800">
                            Category:{" "}
                            {
                              categories.find((c) => c._id === activeCategory)
                                ?.name
                            }
                          </span>
                          <button
                            onClick={() => handleCategoryChange("")}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                      {activeSeries && (
                        <div className="flex items-center justify-between bg-purple-50 px-3 py-2 rounded-lg">
                          <span className="text-sm text-purple-800">
                            Series:{" "}
                            {series.find((s) => s._id === activeSeries)?.name}
                          </span>
                          <button
                            onClick={() => handleSeriesChange("")}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                      {searchQuery && (
                        <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg">
                          <span className="text-sm text-green-800">
                            Search: "{searchQuery}"
                          </span>
                          <button
                            onClick={() => handleSearchChange("")}
                            className="text-green-600 hover:text-green-800"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Categories */}
                {!categoriesLoading && categories.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Categories
                    </h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <button
                          key={category._id}
                          onClick={() => handleCategoryChange(category._id)}
                          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                            activeCategory === category._id
                              ? "bg-blue-600 text-white shadow-lg"
                              : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                activeCategory === category._id
                                  ? "bg-white"
                                  : ""
                              }`}
                              style={{
                                backgroundColor:
                                  activeCategory === category._id
                                    ? "white"
                                    : category.color || "#e5e7eb",
                              }}
                            />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              activeCategory === category._id
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                            }`}
                          >
                            {category.blogCount}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {(blogsError || seriesError || categoriesError) && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Error: {(blogsError || seriesError || categoriesError)?.message}
          </div>
        </div>
      )}
    </div>
  );
}
