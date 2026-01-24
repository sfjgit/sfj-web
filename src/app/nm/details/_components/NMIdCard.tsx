/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface NMIdCardProps {
  fullname: string;
  mobile: string;
  email: string;
  skillName: string;
  profilePhoto?: string;
  caspaId: string;
  validFrom?: string;
  validTo?: string;
}

/* eslint-disable @next/next/no-img-element */

export default function NMIdCard({
  fullname,
  mobile,
  email,
  profilePhoto,
  courseName,
  caspaId,
  bloodGroup,
  role,
}: any) {
  const fromDate = new Date();
  const toDate = new Date();
  toDate.setMonth(fromDate.getMonth() + 3);

  const format = (d: Date) =>
    d.toLocaleString("en-IN", { month: "short", year: "numeric" });

  return (
    <div
      className="relative w-[600px] h-[900px] overflow-hidden"
      id="nm-id-card"
    >
      {/* Background */}
      <img
        src="/nm-id.png"
        alt="ID Background"
        className="absolute inset-0 w-full h-full object-contain"
      />

      {/* Content */}
      <div className="absolute inset-0">
        {/* Photo */}
        <div className="absolute top-[230px] left-[170px]">
          <div className="w-[260px] h-[260px] rounded-2xl overflow-hidden border-4 border-[#2f4f4f]">
            <img
              src={profilePhoto}
              alt={fullname}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <p className="absolute top-[520px] w-full text-center text-2xl font-bold">
          {fullname}
        </p>

        {/* Role */}
        <p className="absolute top-[550px] w-full text-center font-semibold">
          {role}
        </p>

        {/* Details */}
        <div className="absolute top-[580px] left-[120px] text-[16px] space-y-1">
          <p>
            <span className="font-semibold">Id :</span>{" "}
            <span className="font-normal">{caspaId}</span>
          </p>
          <p>
            <span className="font-semibold">Mobile Number :</span>{" "}
            <span className="font-normal">{mobile}</span>
          </p>

          <p>
            <span className="font-semibold">Mail Id :</span>{" "}
            <span className="font-normal">{email}</span>
          </p>

          <p>
            <span className="font-semibold">Course Name :</span>{" "}
            <span className="font-normal">{courseName || "N/A"}</span>
          </p>

          <p>
            <span className="font-semibold">Blood Group :</span>{" "}
            <span className="font-normal">{bloodGroup || "N/A"}</span>
          </p>

          <p>
            <span className="font-semibold">Validate From :</span>{" "}
            <span className="font-normal">
              {format(fromDate)} to {format(toDate)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
