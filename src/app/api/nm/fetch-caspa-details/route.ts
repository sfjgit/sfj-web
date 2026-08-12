// ============================================
// app/api/nm/fetch-caspa-details/route.ts
// ============================================
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || "http://localhost:4003";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const phoneNumber = cookieStore.get("nm_phone_verified")?.value;

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, message: "Not verified" },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/nm/fetch-caspa-details`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// // app/api/nm/fetch-caspa-details/route.ts
// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import axios from "axios";

// const CASPA_API_URL = "https://cirrus1.co/caspa/get_admin_api.php";

// export async function GET() {
//   try {
//     const cookieStore = await cookies();

//     // Check if verified
//     const isVerified = cookieStore.get("nm_verified")?.value === "true";
//     const phoneNumber = cookieStore.get("nm_phone_verified")?.value;

//     if (!isVerified || !phoneNumber) {
//       return NextResponse.json(
//         { success: false, message: "Not verified" },
//         { status: 401 }
//       );
//     }

//     // Fetch from Caspa API
//     const response = await axios.get(CASPA_API_URL, {
//       params: { mobile: phoneNumber },
//       timeout: 10000, // 10 second timeout
//     });

//     const caspaData = response.data;

//     if (!caspaData.success) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: caspaData.message || "Failed to fetch details from Caspa",
//           notFound: true,
//         },
//         { status: 404 }
//       );
//     }

//     // Transform API response
//     const data = caspaData.data;
//     const transformedData = {
//       caspaId: data.id,
//       fullname: data.fullname,
//       email: data.email,
//       mobile: data.mobile,
//       skillId: data.skill?.id || null,
//       skillName: data.skill?.skillname || null,
//       location: data.location,
//       pincode: data.pincode,
//       panno: data.panno,
//       aadhaarno: data.aadhaarno,
//       bankname: data.bankname,
//       accountno: data.accountno,
//       ifsccode: data.ifsccode,
//       city: data.city,
//       vendorName: data.v_name,
//       vendorLoc: data.v_loc,
//       vendorPin: data.v_pin,
//       dob: data.dob ? new Date(data.dob) : null,
//       profilePhoto: data.profilephoto,
//       qualification: data.qualification,
//       linkedin: data.linkedin,
//     };

//     // Check which fields are missing/empty
//     const missingFields = [];
//     const requiredFields = [
//       "fullname",
//       "email",
//       "mobile",
//       "location",
//       "pincode",
//       "panno",
//       "aadhaarno",
//       "city",
//       "dob",
//       "profilePhoto",
//       "qualification",
//     ];

//     for (const field of requiredFields) {
//       const value = transformedData[field as keyof typeof transformedData];
//       if (!value || value === "" || value === "0" || value === "null") {
//         missingFields.push(field);
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       data: transformedData,
//       phoneNumber,
//       missingFields,
//       dataComplete: missingFields.length === 0,
//     });
//   } catch (error: any) {
//     console.error("Caspa API Error:", error);

//     if (error.code === "ECONNABORTED") {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Request timeout - Caspa API not responding",
//         },
//         { status: 504 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, message: error.message || "Failed to fetch details" },
//       { status: 500 }
//     );
//   }
// }
