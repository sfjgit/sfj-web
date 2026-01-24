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
        <p className="absolute top-[520px] w-full text-center text-3xl font-bold">
          {fullname}
        </p>

        {/* Role */}
        <p className="absolute top-[565px] w-full text-center font-semibold">
          TRAINER
        </p>

        {/* Details */}
        <div className="absolute top-[610px] left-[120px] text-[16px] space-y-1">
          <p>Email : {email}</p>
          <p>Phone : {mobile}</p>
          {/* <p>Course : {skillName}</p> */}
          <p>
            Validate From: {format(fromDate)} to {format(toDate)}
          </p>
        </div>
      </div>
    </div>
  );
}
