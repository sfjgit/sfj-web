/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Search, Crown, BellRing, Camera, Loader2 } from "lucide-react";
import ProfileIcon from "./_components/ProfileIcon";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useProfile } from "../_components/hooks/useProfile";
import { User, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProfileContactInfo from "./_components/ProfileContactInfo";
import { useAxios } from "@/hooks/useAxios";
import env from "@/config/env";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProfile } from "./_components/useProfile";

// ========================================
// ZOD VALIDATION SCHEMA
// ========================================
const profileSchema = z.object({
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  gender: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const axios = useAxios();
  const { data: user, isLoading, error, refetch } = useProfile();

  // Profile picture upload states
  const [uploadingPic, setUploadingPic] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState("");

  // React Hook Form with Zod
  const {
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      bio: "",
      gender: "",
    },
  });

  const bio = watch("bio");
  const gender = watch("gender");

  useEffect(() => {
    if (user) {
      reset({
        bio: user.bio || "",
        gender: user.gender || "",
      });
      setProfilePicUrl(user.profilePic || "");
    }
  }, [user, reset]);

  // Handle profile picture upload
  const handleProfilePicUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingPic(true);
    try {
      // Step 1: Upload to file service
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post(
        `${env.FILE_SERVICE_URL}/file/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        },
      );

      const uploadedFile = uploadRes.data.file;
      const newProfilePicUrl = uploadedFile.fileUrl;

      // Step 2: Update local state (you can add backend update here later)
      setProfilePicUrl(newProfilePicUrl);
      toast.success("Profile picture uploaded successfully!");
      refetch();
    } catch (err) {
      console.error("Profile picture upload error:", err);
      toast.error("Failed to upload profile picture. Please try again.");
    } finally {
      setUploadingPic(false);
      e.target.value = "";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-muted border-t-primary"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold text-lg">
              Loading your profile
            </p>
            <p className="text-muted-foreground text-sm">Just a moment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-5">
        <div className="max-w-md w-full">
          <Alert variant="destructive" className="shadow-lg">
            <AlertDescription>
              Unable to load your profile. Please check your connection and try
              again.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <section className="m-2 p-2">
      {/* NAV / TOP BAR */}
      <nav className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-5">
        {/* Search Bar */}
        <div className="w-full md:w-1/2 flex relative border rounded-3xl">
          <Input className="w-full p-3" placeholder="Search Anything here" />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>

        {/* Icons Section */}
        <div className="w-full md:w-1/2 flex gap-4 items-center justify-end">
          {/* Notification icon */}
          <div
            className="w-10 h-10 flex items-center justify-center 
          rounded-full border border-gray-300 
          bg-gray-100 hover:bg-gray-200 cursor-pointer transition"
          >
            <BellRing className="w-5 h-5 text-gray-700" />
          </div>

          {/* Premium Icon */}
          <div
            className="w-10 h-10 flex items-center justify-center 
          rounded-full border border-gray-300 
          bg-amber-200 shadow-sm transition cursor-pointer"
          >
            <Crown className="w-5 h-5 text-amber-500" />
          </div>

          <ProfileIcon gender={gender} name={user?.name || "user"} />
        </div>
      </nav>

      {/* Divider */}
      <div className="border-b w-full"></div>

      {/* PROFILE SECTION */}
      <div className="m-2 p-2">
        <div className="text-2xl font-medium pb-2">Profile</div>
        <p className="pb-4 text-gray-600">View your profile details here</p>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Profile Picture Box */}
          <div className="p-4 border rounded-xl w-full md:w-1/4 flex flex-col items-center justify-center bg-background shadow-sm">
            {/* User Name */}
            <h2 className="align-text-bottom font-semibold text-xl mb-2">
              {user.name}
            </h2>

            {/* Circle Profile Image with Upload */}
            <div className="relative w-40 h-40 rounded-full border-1 border-gray-300 flex items-center justify-center overflow-hidden shadow-md group">
              <img
                src={profilePicUrl || "/default-avatar.svg"}
                alt=" Profile Picture"
                width={260}
                height={260}
                className=" rounded-full object-cover er"
              />

              {/* Upload Overlay - Desktop (Hover) */}
              <div className="hidden md:flex absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center cursor-pointer">
                <label
                  htmlFor="profile-pic-upload"
                  className="cursor-pointer flex flex-col items-center gap-1"
                >
                  {uploadingPic ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  ) : (
                    <>
                      <Camera className="w-8 h-8 text-white" />
                      <span className="text-white text-xs">Change Photo</span>
                    </>
                  )}
                  <input
                    id="profile-pic-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicUpload}
                    disabled={uploadingPic}
                  />
                </label>
              </div>
            </div>

            {/* Mobile Upload Button */}
            <label
              htmlFor="profile-pic-upload-mobile"
              className="md:hidden mt-3 px-4 py-2 bg-primary/70 hover:bg-primary/80 text-white rounded-lg cursor-pointer flex items-center gap-2 text-sm transition-colors"
            >
              {uploadingPic ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  Change Photo
                </>
              )}
              <input
                id="profile-pic-upload-mobile"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicUpload}
                disabled={uploadingPic}
              />
            </label>

            {/* Desktop hint text */}
            <p className="hidden md:block text-xs text-gray-500 mt-2 text-center">
              Hover to change picture
            </p>
          </div>

          {/* Bio & Details */}
          <div className="p-6 border rounded-2xl w-full bg-background shadow-sm">
            <h2 className="font-semibold text-xl mb-6">Personal Details</h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Email - Managed by ProfileContactInfo */}
                <div>
                  <ProfileContactInfo
                    email={user.email}
                    phone={user.phone}
                    emailVerified={user?.emailVerified ?? false}
                    phoneVerified={user?.phoneVerified ?? false}
                    refetchProfileAction={refetch}
                  />
                </div>

                {/* Member Since */}
                <div>
                  <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
                    <Calendar className="text-primary w-4 h-4" />
                    Member Since
                  </label>
                  <Input
                    value={new Date(user.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      },
                    )}
                    disabled
                    className="w-full border-4"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Additional Information
                </h3>

                {/* Bio with Validation */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <div className="relative">
                    <textarea
                      {...register("bio")}
                      rows={5}
                      className="w-full border rounded-lg p-3 resize-none focus:ring-2 focus:ring-primary/50 outline-none"
                      maxLength={500}
                      placeholder="Tell me about yourself"
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                      {bio?.length || 0}/500
                    </span>
                  </div>
                  {errors.bio && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.bio.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <Select
                    value={gender}
                    onValueChange={(value) => setValue("gender", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Transgender">
                          Third Gender
                        </SelectItem>
                        <SelectItem value="Prefer not to say">
                          Prefer not to say
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// /* eslint-disable @next/next/no-img-element */
// "use client";
// import React from "react";
// import { Search, Crown, BellRing } from "lucide-react";
// import ProfileIcon from "./_components/ProfileIcon";
// import { Input } from "@/components/ui/input";
// import { useState, useEffect } from "react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useProfile } from "../_components/hooks/useProfile";
// import { User, Calendar } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import ProfileContactInfo from "./_components/ProfileContactInfo";

// export default function ProfilePage() {
//   const { data: user, isLoading, error, refetch } = useProfile();

//   const [bio, setBio] = useState("");
//   const [gender, setGender] = useState("");

//   const [, setEmail] = useState("");
//   // type Emailstep = "verified" | "unverified" | "update" | "otp";
//   // const [step, setStep] = useState<Emailstep>("unverified");

//   // const [otp, setOtp] = useState("");
//   // const [otpLoading, setOtpLoading] = useState(false);
//   // const [timer, setTimer] = useState(40);

//   useEffect(() => {
//     if (user) {
//       setBio(user.bio || "");
//       setGender(user.gender || "");
//       setEmail(user.email || "");
//     }
//   }, [user]);
//   // const handlesave = () => {
//   //   updateProfileMutation.mutate({
//   //     bio: bio.trim() || undefined,
//   //     gender: gender || undefined,
//   //   });
//   // };
//   // const hasChanges =
//   //   user && (bio !== (user.bio || "") || gender !== (user.gender || ""));

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="flex flex-col items-center space-y-6">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-20 w-20 border-4 border-muted border-t-primary"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <User className="h-8 w-8 text-primary animate-pulse" />
//             </div>
//           </div>
//           <div className="text-center">
//             <p className="text-foreground font-semibold text-lg">
//               Loading your profile
//             </p>
//             <p className="text-muted-foreground text-sm">Just a moment...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center p-5">
//         <div className="max-w-md w-full">
//           <Alert variant="destructive" className="shadow-lg">
//             <AlertDescription>
//               Unable to load your profile. Please check your connection and try
//               again.
//             </AlertDescription>
//           </Alert>
//         </div>
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <section className="m-2 p-2">
//       {/* NAV / TOP BAR */}
//       <nav className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-5">
//         {/* Search Bar */}
//         <div className="w-full md:w-1/2 flex relative border rounded-3xl">
//           <Input className="w-full p-3" placeholder="Search Anything here" />
//           <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
//         </div>

//         {/* Icons Section */}
//         <div className="w-full md:w-1/2 flex gap-4 items-center justify-end">
//           {/* Notification icon */}
//           <div
//             className="w-10 h-10 flex items-center justify-center
//           rounded-full border border-gray-300
//           bg-gray-100 hover:bg-gray-200 cursor-pointer transition"
//           >
//             <BellRing className="w-5 h-5 text-gray-700" />
//           </div>

//           {/* Premium Icon */}
//           <div
//             className="w-10 h-10 flex items-center justify-center
//           rounded-full border border-gray-300
//           bg-amber-200 shadow-sm transition cursor-pointer"
//           >
//             <Crown className="w-5 h-5 text-amber-500" />
//           </div>

//           <ProfileIcon gender={gender} name={user?.name || "user"} />
//         </div>
//       </nav>

//       {/* Divider */}
//       <div className="border-b w-full"></div>

//       {/* PROFILE SECTION */}
//       <div className="m-2 p-2">
//         <div className="text-2xl font-medium pb-2">Profile</div>
//         <p className="pb-4 text-gray-600">View your profile details here</p>

//         <div className="flex flex-col md:flex-row gap-4">
//           {/* Profile Picture Box */}
//           <div className="p-4 border rounded-xl w-full md:w-1/4 flex flex-col items-center justify-center bg-background shadow-sm">
//             {/* User Name */}
//             <h2 className="align-text-bottom font-semibold text-xl mb-2">
//               {user.name}
//             </h2>

//             {/* Circle Profile Image */}
//             <div className="w-40 h-40 rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden shadow-md">
//               <img
//                 src={user.profilePic || ""} // default
//                 alt=""
//                 width={260}
//                 height={260}
//                 className="rounded-full object-cover"
//               />
//             </div>
//           </div>

//           {/* Bio & Details */}
//           <div className="p-6 border rounded-2xl w-full bg-background shadow-sm">
//             <h2 className="font-semibold text-xl mb-6">Personal Details</h2>

//             {/* Grid Layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="space-y-6">
//                 {/* Email */}
//                 <div>
//                   {/* LEFT COLUMN */}
//                   <ProfileContactInfo
//                     email={user.email}
//                     phone={user.phone}
//                     emailVerified={user?.emailVerified ?? false}
//                     phoneVerified={user?.phoneVerified ?? false}
//                     refetchProfile={refetch}
//                   />
//                 </div>

//                 {/* Member Since */}
//                 <div>
//                   <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
//                     <Calendar className="text-primary w-4 h-4" />
//                     Member Since
//                   </label>
//                   <Input
//                     value={new Date(user.createdAt).toLocaleDateString(
//                       "en-US",
//                       {
//                         month: "short",
//                         year: "numeric",
//                       },
//                     )}
//                     disabled
//                     className="w-full border-4"
//                   />
//                 </div>
//               </div>

//               {/* RIGHT COLUMN */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Additional Information
//                 </h3>

//                 {/* Bio */}
//                 <div>
//                   <label className="block font-medium text-gray-700 mb-1">
//                     Bio
//                   </label>
//                   <div className="relative">
//                     <textarea
//                       rows={5}
//                       value={bio}
//                       onChange={(e) => setBio(e.target.value)}
//                       className="w-full border rounded-lg p-3 resize-none focus:ring-2 focus:ring-primary/50 outline-none"
//                       maxLength={500}
//                       placeholder="Tell me about yourself"
//                     />
//                     <span className="absolute bottom-2 right-3 text-xs text-gray-500">
//                       {bio.length}/500
//                     </span>
//                   </div>
//                 </div>

//                 {/* Gender */}
//                 <div>
//                   <label className="block font-medium text-gray-700 mb-1">
//                     Gender
//                   </label>
//                   <Select onValueChange={(value) => setGender(value)}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select gender" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectLabel>Gender</SelectLabel>
//                         <SelectItem value="Male">Male</SelectItem>
//                         <SelectItem value="Female">Female</SelectItem>
//                         <SelectItem value="Transgender">
//                           Third Gender
//                         </SelectItem>
//                         <SelectItem value="Prefer not to say">
//                           Prefer not to say
//                         </SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PERSONAL DETAILS */}
//     </section>
//   );
// }
