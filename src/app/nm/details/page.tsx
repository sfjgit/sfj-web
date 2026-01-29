/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
// app/nm/details/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  CheckCircle,
  XCircle,
  User,
  Loader2,
  Upload,
  AlertCircle,
  Save,
} from "lucide-react";
import NMIdCard from "./_components/NMIdCard";

interface Toast {
  id: number;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

const ToastContainer = ({ toasts }: { toasts: Toast[] }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg animate-slide-in ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : toast.type === "error"
              ? "bg-red-600 text-white"
              : toast.type === "warning"
              ? "bg-yellow-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {toast.type === "success" && <CheckCircle className="w-4 h-4" />}
          {toast.type === "error" && <XCircle className="w-4 h-4" />}
          {toast.type === "warning" && <AlertCircle className="w-4 h-4" />}
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};

export default function NMDetailsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastId, setToastId] = useState(0);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const [idCardInfo, setIdCardInfo] = useState({
    generationCount: 0,
    canRegenerate: true,
    currentIdCard: "",
    hasGenerated: false,
  });

  const [formData, setFormData] = useState({
    id: "",
    caspaId: "",
    fullname: "",
    email: "",
    mobile: "",
    skillName: "",
    aadhaarno: "",
    bloodGroup: "",
    profilePhoto: "",
    profilePhotoUrl: "",
    role: "",
    courseName: "",
  });

  const showToast = (
    type: "success" | "error" | "info" | "warning",
    message: string
  ) => {
    const id = toastId;
    setToastId((prev) => prev + 1);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const verifyResponse = await fetch("/api/nm/check-verification");
        const verifyData = await verifyResponse.json();

        if (!verifyData.verified) {
          showToast("error", "Please verify first");
          setTimeout(() => router.push("/nm/verify"), 1500);
          return;
        }

        setPhoneNumber(verifyData.phoneNumber);

        // Fetch Caspa details
        const caspaResponse = await fetch("/api/nm/fetch-caspa-details", {
          method: "POST",
        });
        const caspaResult = await caspaResponse.json();

        if (caspaResult.success) {
          const data = caspaResult.data;
          setFormData({
            id: data.id || "",
            caspaId: data.caspaId || "",
            fullname: data.fullname || "",
            email: data.email || "",
            mobile: data.mobile || "",
            skillName: data.skillName || "",
            aadhaarno: data.aadhaarno || "",
            bloodGroup: data.bloodGroup || "",
            profilePhoto: data.profilePhoto || "",
            profilePhotoUrl: data.profilePhotoUrl || "",
            role: data.role || "",
            courseName: data.skillName || "",
            // designation: "Trainer",
          });

          setPhotoPreview(data.profilePhotoUrl || data.profilePhoto || "");

          // Check ID card history
          const historyResponse = await fetch("/api/nm/id-card-history");
          const historyData = await historyResponse.json();

          if (historyData.success) {
            setIdCardInfo({
              generationCount: historyData.data.generationCount || 0,
              canRegenerate: historyData.data.canRegenerate || true,
              currentIdCard: historyData.data.currentIdCard || "",
              hasGenerated: (historyData.data.generationCount || 0) > 0,
            });
          }

          if (caspaResult.warning) {
            showToast("warning", caspaResult.warning);
          }
        } else {
          showToast("error", caspaResult.message || "Failed to load details");
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        showToast("error", "Failed to load data");
        setTimeout(() => router.push("/nm/verify"), 1500);
      }
    };

    loadData();
  }, [router]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("error", "Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("error", "File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("userId", formData.id);

      const response = await fetch("/api/file-service/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Upload failed");
      }

      const fileUrl = data.file.fileUrl;
      setUploadedPhotoUrl(fileUrl);
      setPhotoPreview(fileUrl);
      showToast("success", "Photo uploaded successfully!");
    } catch (error: any) {
      showToast("error", error.message || "Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!formData.fullname.trim()) {
      showToast("error", "Name cannot be empty");
      return;
    }

    if (!formData.bloodGroup) {
      showToast("error", "Please select blood group");
      return;
    }

    setUpdating(true);

    try {
      const response = await fetch("/api/nm/update-user-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.fullname,
          bloodGroup: formData.bloodGroup,
          profilePhotoUrl: uploadedPhotoUrl || formData.profilePhotoUrl,
          role: formData.role,
          courseName: formData.courseName,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Update failed");
      }

      showToast("success", "✓ Profile updated successfully!");

      // Update local state
      setFormData((prev) => ({
        ...prev,
        profilePhotoUrl: uploadedPhotoUrl || prev.profilePhotoUrl,
      }));
      setUploadedPhotoUrl(""); // Clear temporary URL
    } catch (error: any) {
      showToast("error", error.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleGenerateIdCard = async () => {
    if (!formData.bloodGroup) {
      showToast("error", "Please select blood group and update profile first");
      return;
    }

    if (!formData.role || formData.role === "") {
      showToast("error", "Role is required");
      return;
    }

    setGenerating(true);

    try {
      const response = await fetch("/api/nm/generate-id-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profilePhotoUrl: uploadedPhotoUrl || formData.profilePhotoUrl,
          bloodGroup: formData.bloodGroup,
          // aadhaarno: formData.aadhaarno,
          caspaId: formData.caspaId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.requiresApproval) {
          showToast("warning", errorData.message);
          return;
        }
        throw new Error(errorData.message || "Failed to generate ID");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `NM-ID-${formData.caspaId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      showToast("success", "✓ ID Card generated and downloaded!");

      setTimeout(async () => {
        const historyResponse = await fetch("/api/nm/id-card-history");
        const historyData = await historyResponse.json();
        if (historyData.success) {
          setIdCardInfo({
            generationCount: historyData.data.generationCount || 0,
            canRegenerate: historyData.data.canRegenerate || true,
            currentIdCard: historyData.data.currentIdCard || "",
            hasGenerated: true,
          });
        }
      }, 1000);
    } catch (error: any) {
      console.error(error);
      showToast("error", error.message || "Failed to generate ID");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} />

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Verified</p>
                <p className="text-sm font-semibold">{phoneNumber}</p>
              </div>
            </div>

            {idCardInfo.hasGenerated && (
              <div className="text-right">
                <p className="text-xs text-gray-500">ID Generated</p>
                <p className="text-sm font-semibold text-blue-600">
                  {idCardInfo.generationCount}/3
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT SIDE - ID PREVIEW */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">ID Card Preview</h3>
              <NMIdCard
                fullname={formData.fullname}
                mobile={formData.mobile}
                email={formData.email}
                skillName={formData.courseName}
                profilePhoto={photoPreview}
                caspaId={formData.caspaId}
                bloodGroup={formData.bloodGroup}
                role={formData.role}
                courseName={formData.courseName}
              />
              <p className="text-xs text-gray-500 mt-3 text-center">
                Preview updates as you edit your details
              </p>

              {idCardInfo.generationCount > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-900">
                      Generation Progress
                    </span>
                    <span className="text-xs font-bold text-blue-900">
                      {idCardInfo.generationCount}/3
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${(idCardInfo.generationCount / 3) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Your Details</h3>

              <div className="space-y-4">
                {/* Profile Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-lg border-2 border-gray-200 overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        {photoPreview ? (
                          <img
                            src={photoPreview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-10 h-10 text-white" />
                        )}
                      </div>
                      {uploading && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        id="photo-upload"
                        className="hidden"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition text-sm font-medium"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            {photoPreview ? "Change" : "Upload"}
                          </>
                        )}
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Max 5MB (JPG, PNG)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Name - EDITABLE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullname}
                    onChange={(e) => handleChange("fullname", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email - READ ONLY */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Mobile - READ ONLY */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    disabled
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600 "
                    placeholder="Enter your role eg. Student, Trainer, Faculty"
                    onChange={(e) => handleChange("role", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={formData.courseName}
                    placeholder="Enter your course name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600 "
                    onChange={(e) => handleChange("courseName", e.target.value)}
                  />
                </div>
                {/* Aadhaar - READ ONLY */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    value={formData.aadhaarno}
                    disabled
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div> */}

                {/* Blood Group - EDITABLE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group *
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => handleChange("bloodGroup", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                {/* Update Profile Button */}
                <button
                  onClick={handleUpdateProfile}
                  disabled={updating}
                  className="w-full mt-4 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating Profile...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Update Profile
                    </>
                  )}
                </button>

                {/* Generate ID Card Button */}
                <button
                  onClick={handleGenerateIdCard}
                  disabled={generating || !idCardInfo.canRegenerate}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating ID Card...
                    </>
                  ) : idCardInfo.hasGenerated ? (
                    `Regenerate ID Card (${idCardInfo.generationCount}/3)`
                  ) : (
                    "Generate ID Card"
                  )}
                </button>

                {!idCardInfo.canRegenerate && (
                  <p className="text-sm text-red-600 text-center mt-2">
                    Maximum generation limit reached. Please contact support.
                  </p>
                )}

                <p className="text-xs text-gray-500 text-center mt-2">
                  Update your profile first, then generate ID card
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
