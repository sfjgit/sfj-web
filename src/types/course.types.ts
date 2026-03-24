// types/course.types.ts

export interface IImage {
  _id: string;
  viewUrl: string;
}

export interface IPrice {
  amount: number;
  currency: string;
}

export interface ICertification {
  title: string;
}

export interface IOverview {
  title: string;
  description: string;
  keyFeatures: string[];
  skillsCovered: string[];
}

export interface ILesson {
  _id: string;
  title: string;
  content: string;
}

export interface IChapter {
  _id: string;
  title: string;
  lessons: ILesson[];
}

export interface ICurriculum {
  eligibility: string[];
  prerequisites: string[];
  projects: string[];
  chapters: IChapter[];
}

export interface IFAQ {
  question: string;
  answer: string;
  _id?: string;
}

export interface ICourse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  price: IPrice;
  certification: ICertification;
  overview: IOverview;
  curriculum: ICurriculum;
  banner?: IImage;
  previewImage?: IImage;
  logoUrl?: IImage;
  broucher?: string;
  durationHours?: number;
  startTime?: string;
  endTime?: string;
  isPaid: boolean;
  isPublished: boolean;
  videoUrl?: string;
  outcomes: string[];
  skills: string[];
  tools: string[];
  whyJoin: string[];
  highlights: string[];
  jobs: string[];
  faqs: IFAQ[];
  appliedCount: number;
  trainedCount: number;
  images: IImage[];
  category: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IMetadata {
  _id?: string;
  courseId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  metaUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article" | "course";
  ogImage?: IImage;
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: IImage;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  schemaMarkup?: string;
  sitemapPriority?: number;
  isPublished?: boolean;
}

export interface ICoursesResponse {
  success: boolean;
  message: string;
  data: {
    courses: ICourse[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  };
  error: string | null;
}

export interface ISingleCourseResponse {
  success: boolean;
  message: string;
  data: {
    course: ICourse;
    metadata: IMetadata | null;
  };
  error: string | null;
}
