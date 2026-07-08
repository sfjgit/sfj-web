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
  trainingOption?: string;
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
  projects: { title: string; content: string[] }[];
  chapters: IChapter[];
}

export interface IFAQ {
  question: string;
  answer: string;
  _id?: string;
}

// ── NEW ───────────────────────────────────────────────────────────────────────

export interface IGst {
  percentage: number; // default 18
  isInclusive: boolean; // false = GST added on top, true = already baked in
}

export type OfferType = "coupon" | "discount" | "referral" | "flash";
export type DiscountType = "flat" | "percentage";

export interface IOffer {
  _id?: string;
  type: OfferType;
  discountType: DiscountType;
  value: number;
  code?: string;
  description?: string;
  maxDiscountAmount?: number;
  minOrderAmount?: number;
  validFrom?: string;
  validUntil?: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

export interface IInstallment {
  _id?: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  label?: string;
}

export interface IPartialPayment {
  isAllowed: boolean;
  installments: IInstallment[];
}

// ── Main course interface ─────────────────────────────────────────────────────

export interface ICourse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modules: any;
  type: string;
  price: IPrice;
  currency: string;
  duration: string;

  // NEW
  gst?: IGst;
  offers?: IOffer[];
  partialPayment?: IPartialPayment;

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

// ── Metadata ──────────────────────────────────────────────────────────────────

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

// ── API response shapes ───────────────────────────────────────────────────────

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

// ── Payment / enrollment helpers (used in EnrollButton) ───────────────────────

export interface IPriceBreakdown {
  basePrice: number;
  gstAmount: number;
  discountAmount: number;
  finalAmount: number;
  offerApplied: {
    code?: string;
    type?: string;
    value?: number;
  } | null;
}
