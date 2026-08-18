// Shared by the hero and the closing CTA, which both offer the same download.
export const SYLLABUS_PDF = "/fac/faculty-ai-enablement-programme.pdf";
export const SYLLABUS_FILENAME = "SFJ Faculty AI Enablement Programme.pdf";

// Registration dropdown options. Sent to the backend as-is — the confirm
// controller's ROLE_LABELS/DISCIPLINE_LABELS maps match on the lowercased
// label text, not an enum key, so these strings must stay in sync with
// notification_service/src/controllers/faculty-registration.controller.ts.
export const FACULTY_ROLE_OPTIONS = [
  "Teaching faculty",
  "Head of Department",
  "Academic coordinator",
  "Trainer or instructor",
  "Principal or Director",
  "Vice Chancellor / Director / Principal",
  "Dean / Head of Department",
  "Training & Placement Officer (TPO)",
  "IQAC Coordinator",
  "Registrar / Administration",
  "Other academic leader",
] as const;

export const FACULTY_DISCIPLINE_OPTIONS = [
  "Engineering",
  "Diploma & Polytechnic",
  "Arts, Science & Commerce",
  "ITI & Vocational",
  "Law",
  "Medical",
  "Paramedical & Allied Health",
  "Agriculture, Vet & Fisheries",
] as const;

export const FACULTY_STRENGTH_OPTIONS = [
  "Under 50",
  "50 – 150",
  "150 – 400",
  "400+",
] as const;
