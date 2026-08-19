// "use client";

// import { useState, type ReactNode } from "react";
// import { X } from "lucide-react";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import FacultyRegistrationForm from "./FacultyRegistrationForm";

// // Wraps the dark registration card in a Radix dialog. The trigger is
// // supplied by each caller so the Hero/CTA sections keep their own button
// // styling — this component only owns the open state and the form.
// export default function FacultyRegistrationDialog({
//   trigger,
// }: {
//   trigger: ReactNode;
// }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>{trigger}</DialogTrigger>
//       <DialogContent
//         showCloseButton={false}
//         className="max-w-2xl border-none bg-transparent p-0 shadow-none"
//       >
//         <button
//           type="button"
//           onClick={() => setOpen(false)}
//           aria-label="Close"
//           className="absolute top-4 right-4 z-10 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
//         >
//           <X className="h-5 w-5" />
//         </button>
//         <FacultyRegistrationForm />
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FacultyRegistrationForm from "./FacultyRegistrationForm";
import { SYLLABUS_FILENAME } from "../constants";
import facultyRegistrationApi from "@/lib/facultyRegistrationApi";

interface FacultyRegistrationDialogProps {
  trigger: ReactNode;
  autoDownloadAfterRegistration?: boolean;
}

export default function FacultyRegistrationDialog({
  trigger,
  autoDownloadAfterRegistration = false,
}: FacultyRegistrationDialogProps) {
  const [open, setOpen] = useState(false);

  // const handleRegistered = () => {
  //   if (!autoDownloadAfterRegistration) return;

  //   const link = document.createElement("a");

  //   link.href = SYLLABUS_PDF;
  //   link.download = SYLLABUS_FILENAME;

  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleRegistered = async () => {
    if (!autoDownloadAfterRegistration) {
      return;
    }

    try {
      const response = await facultyRegistrationApi.get("/syllabus/download", {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = SYLLABUS_FILENAME;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Syllabus download failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-w-2xl border-none bg-transparent p-0 shadow-none"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <FacultyRegistrationForm onRegistered={handleRegistered} />
      </DialogContent>
    </Dialog>
  );
}
