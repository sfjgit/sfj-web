/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

interface BlogListProps {
  initialBlogs?: Blog[];
}

export default function BlogLandingPage({ initialBlogs = [] }: BlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [series, setSeries] = useState<Series[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(!initialBlogs.length);
  const [seriesLoading, setSeriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeSeries, setActiveSeries] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        status: "published",
      });

      if (activeCategory) queryParams.append("categoryId", activeCategory);
      if (activeSeries) queryParams.append("seriesId", activeSeries);
      if (searchQuery) queryParams.append("search", searchQuery);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/admin/blogs?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      setBlogs(data.data || data);
      setTotalPages(data.meta?.totalPages || 1);
      setCurrentPage(page);
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
        setSeries(data.data || data);
      }
    } catch (err) {
      console.error("Failed to fetch series:", err);
    } finally {
      setSeriesLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/admin/blogs/categories`
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data || data);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    if (!initialBlogs.length) {
      fetchBlogs();
    }
    fetchSeries();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs(1);
  }, [activeCategory, activeSeries, searchQuery]);

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
  };

  if (loading && !blogs.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Discover Amazing Content
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Explore our curated collection of articles, tutorials, and
              insights designed to inspire and educate.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search articles, tutorials, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-2xl text-gray-900 placeholder-gray-500 shadow-xl border-0 focus:ring-4 focus:ring-white/30 transition-all"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Series Showcase */}
        {!seriesLoading && series.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Series
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Dive deep into comprehensive learning paths designed to take you
                from beginner to expert.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {series.slice(0, 6).map((seriesItem) => (
                <div
                  key={seriesItem._id}
                  className="group cursor-pointer"
                  onClick={() =>
                    setActiveSeries(
                      activeSeries === seriesItem._id ? "" : seriesItem._id
                    )
                  }
                >
                  <div
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                      activeSeries === seriesItem._id
                        ? "border-blue-500 ring-4 ring-blue-100"
                        : "border-transparent hover:border-blue-200"
                    }`}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                      {seriesItem.thumbnail ? (
                        <img
                          src={seriesItem.thumbnail}
                          alt={seriesItem.name}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                              <svg
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <p className="font-semibold">
                              {seriesItem.blogCount} Articles
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {seriesItem.blogCount} articles
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {seriesItem.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {seriesItem.description}
                      </p>

                      <div className="flex items-center justify-between">
                        {seriesItem.difficulty && (
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                              seriesItem.difficulty
                            )}`}
                          >
                            {seriesItem.difficulty}
                          </span>
                        )}
                        <div className="text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                          Explore Series →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-8 space-y-8">
              {/* Active Filters */}
              {(activeCategory || activeSeries || searchQuery) && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Active Filters</h3>
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
                          onClick={() => setActiveCategory("")}
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
                          onClick={() => setActiveSeries("")}
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
                  </div>
                </div>
              )}

              {/* Categories */}
              {categories.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Categories
                  </h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        onClick={() =>
                          setActiveCategory(
                            activeCategory === category._id ? "" : category._id
                          )
                        }
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                          activeCategory === category._id
                            ? "bg-blue-600 text-white shadow-lg"
                            : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              activeCategory === category._id ? "bg-white" : ""
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

          {/* Main Content */}
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
            </div>

            {/* Blog Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {blogs.map((blog) => (
                  <article
                    key={blog._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                  >
                    {/* Featured Image */}
                    <div className="relative h-56 overflow-hidden">
                      {blog.featuredImage || blog.banner ? (
                        <img
                          src={
                            blog.banner ||
                            blog.banner ||
                            "/placeholder-blog.jpg"
                          }
                          alt={blog.title}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
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

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {blog.isPinned && (
                          <span className="bg-red-500 text-white px-3 py-1 text-xs font-medium rounded-full shadow-lg">
                            📌 Pinned
                          </span>
                        )}
                        {blog.isFeatured && (
                          <span className="bg-amber-500 text-white px-3 py-1 text-xs font-medium rounded-full shadow-lg">
                            ⭐ Featured
                          </span>
                        )}
                        {blog.isTopPick && (
                          <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-medium rounded-full shadow-lg">
                            🏆 Top Pick
                          </span>
                        )}
                      </div>

                      {/* Difficulty Badge */}
                      {blog.difficulty && (
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm border ${getDifficultyColor(
                              blog.difficulty
                            )}`}
                          >
                            {blog.difficulty}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.categories.slice(0, 2).map((category) => (
                          <button
                            key={category._id}
                            onClick={() => setActiveCategory(category._id)}
                            className="px-3 py-1 text-xs font-medium rounded-full transition-colors hover:scale-105"
                            style={{
                              backgroundColor: category.color || "#e5e7eb",
                              color: category.color ? "#fff" : "#374151",
                            }}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>

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
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {blog.likeCount}
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
            {!loading && blogs.length === 0 && (
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
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button
                  onClick={() => fetchBlogs(currentPage - 1)}
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
                        onClick={() => fetchBlogs(page)}
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
                  onClick={() => fetchBlogs(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium shadow-sm"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
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
            Error: {error}
          </div>
        </div>
      )}
    </div>
  );
}
