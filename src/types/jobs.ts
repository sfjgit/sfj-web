export type JobStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "CLOSED";
export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP"
  | "FREELANCE";
export type LocationType = "REMOTE" | "HYBRID" | "ONSITE";
export type ApplicationStatus =
  | "APPLIED"
  | "SCREENING"
  | "TEST"
  | "INTERVIEW"
  | "OFFERED"
  | "HIRED"
  | "REJECTED"
  | "WITHDRAWN"
  | "ON_HOLD";
export type HireOutcome = "HIRED" | "REJECTED" | "WITHDRAWN" | "ON_HOLD";
export type InterviewLevel =
  | "L1"
  | "L2"
  | "L3"
  | "HR"
  | "FINAL"
  | "PANEL"
  | "CULTURE_FIT";
export type RoundType = "INTERVIEW" | "TEST";
export type RoundStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";
export type RoundResult = "PASS" | "FAIL" | "ON_HOLD" | "PENDING";
export type TestCategory =
  | "APTITUDE"
  | "CODING"
  | "TECHNICAL"
  | "ASSIGNMENT"
  | "PSYCHOMETRIC"
  | "LANGUAGE"
  | "CUSTOM";
export type CandidateSource =
  | "LINKEDIN"
  | "REFERRAL"
  | "JOB_PORTAL"
  | "DIRECT"
  | "AGENCY"
  | "CAMPUS"
  | "OTHER";
export type FileStatus = "UPLOADING" | "ACTIVE" | "REPLACED" | "DELETED";

export interface Department {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  _count?: { jobs: number };
}

export interface JobDescription {
  id: string;
  jobId: string;
  s3Key: string;
  s3Bucket: string;
  fileUrl?: string | null;
  fileName: string;
  fileSize?: number | null;
  mimeType?: string | null;
  status: FileStatus;
  version: number;
  parsedText?: string | null;
  language?: string | null;
  uploadedBy?: string | null;
  uploadedAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  departmentId: string;
  location: string;
  locationType: LocationType;
  employmentType: EmploymentType;
  description: string;
  requirements: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  currency: string;
  openings: number;
  status: JobStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  department?: Department;
  jobDescription?: JobDescription | null;
  _count?: { applications: number };
}

export interface Resume {
  id: string;
  candidateId: string;
  s3Key: string;
  s3Bucket: string;
  fileUrl?: string | null;
  fileName: string;
  fileSize?: number | null;
  mimeType?: string | null;
  status: FileStatus;
  version: number;
  parsedText?: string | null;
  parsedName?: string | null;
  parsedEmail?: string | null;
  parsedPhone?: string | null;
  parsedSkills: string[];
  parsedExpYears?: number | null;
  parsedEducation?: unknown;
  parsedWorkHistory?: unknown;
  isActive: boolean;
  uploadedAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  linkedinUrl?: string | null;
  portfolioUrl?: string | null;
  currentCompany?: string | null;
  currentTitle?: string | null;
  source: CandidateSource;
  referredBy?: string | null;
  totalExpYears?: number | null;
  skills: string[];
  education?: unknown;
  workHistory?: unknown;
  noticePeriod?: number | null;
  currentCTC?: number | null;
  expectedCTC?: number | null;
  ctcCurrency: string;
  willingToRelocate: boolean;
  tags: string[];
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  resumes?: Resume[];
  _count?: { applications: number };
}

export interface Round {
  id: string;
  applicationId: string;
  roundNo: number;
  type: RoundType;
  status: RoundStatus;
  result: RoundResult;
  scheduledAt?: string | null;
  completedAt?: string | null;
  notes?: string | null;
  feedbackNotes?: string | null;
  internalScore?: number | null;
  interviewLevel?: InterviewLevel | null;
  interviewers: string[];
  meetingLink?: string | null;
  duration?: number | null;
  recordingKey?: string | null;
  recordingFileName?: string | null;
  testCategory?: TestCategory | null;
  testName?: string | null;
  testLink?: string | null;
  testPlatform?: string | null;
  testDuration?: number | null;
  testScore?: number | null;
  testMaxScore?: number | null;
  testScoreUnit?: string | null;
  testResultKey?: string | null;
  testResultFileName?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  hireOutcome?: HireOutcome | null;
  hireOutcomeAt?: string | null;
  hireOutcomeNote?: string | null;
  offeredCTC?: number | null;
  offerSentAt?: string | null;
  offerDeadline?: string | null;
  offerAccepted?: boolean | null;
  joiningDate?: string | null;
  notes?: string | null;
  appliedAt: string;
  updatedAt: string;
  job?: Job;
  candidate?: Candidate;
  rounds?: Round[];
}

export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalCandidates: number;
  totalApplications: number;
  openApplications: number;
  hiredThisMonth: number;
  pendingRounds: number;
  recentApplications: Application[];
  applicationsByStatus: Partial<Record<ApplicationStatus, number>>;
  jobsByDepartment: { department: string; count: number }[];
}

export interface JobPipeline {
  job: Job;
  stages: {
    status: ApplicationStatus;
    count: number;
    applications: Application[];
  }[];
}

export interface DepartmentReport {
  department: Department;
  jobs: Job[];
  totalApplications: number;
  hiredCount: number;
  activeJobCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
