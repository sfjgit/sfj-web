/* eslint-disable @typescript-eslint/no-explicit-any */
// app/nm/id-card/preview/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NMIdCard from "@/app/nm/details/_components/NMIdCard";
// import NMIdCard from "../../details/_components/NMIdCard";
// import NMIdCard from "@/components/NMIdCard";

export default function IDCardPreviewPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/nm/user/${userId}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <NMIdCard
        fullname={data.fullname}
        mobile={data.mobile}
        email={data.email}
        skillName={data.skillName}
        profilePhoto={data.profilePhoto}
        caspaId={data.caspaId}
        bloodGroup={data.bloodGroup}
        validFrom={data.validFrom}
        validTo={data.validTo}
        role={data.role}
        courseName={data.courseName}
      />
    </div>
  );
}
