import Link from "next/link";

export default function SFJBSEnterpriseSection() {
  const services = [
    {
      path: "/services/corporate-social-responsibility",
      label: "CSR Skilling Partner",
    },
    {
      path: "/services/government-initiatives",
      label: "Government-Led Skilling Missions",
    },
    {
      path: "/services/institutional-training",
      label: "Institutional Training (B2I)",
    },
    {
      path: "/services/corporate-it-training-programs",
      label: "Corporate IT Training Programs",
    },
    {
      path: "/services/it-staffing-company",
      label: "Talent as a Service",
    },
  ];

  return (
    <div className="relative  border-b pb-5 border-gray-200 max-w-6xl mx-auto ">
      {/* Left accent border */}
      <h2 className="text-4xl font-semibold text-gray-900 mb-4 text-center">
        Our Services
      </h2>

      {/* Main heading */}
      <h1 className="relative text-2xl  text-gray-900 mb-6 tracking-tight leading-tight">
        Why <span className="text-blue-700 font-extrabold">SFJBS</span> Is Your
        Trusted Enterprise Upskilling Partner in Bangalore
        {/* Underline accent */}
        <div className="absolute bottom-[-8px] left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-sm"></div>
      </h1>

      {/* Description paragraph */}
      <p className="text-lg text-gray-600  mb-8 font-normal leading-relaxed">
        With 14+ years of experience, SFJBS is a trusted enterprise upskilling
        partner in Bangalore, India. We specialize in enterprise training, IT
        consulting services, and future-ready technology solutions designed to
        accelerate digital transformation across industries.
      </p>

      {/* Services grid */}
      <div className="flex flex-wrap gap-6 mt-8">
        {services.map((service) => (
          <Link
            key={service.path}
            href={service.path}
            className="group relative flex-1 min-w-[200px] p-5 border border-gray-200 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-500 overflow-hidden block"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>

            <div className="text-base font-semibold text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
              {service.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
