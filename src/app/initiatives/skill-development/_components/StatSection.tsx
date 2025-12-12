"use client";

export default function OrganizationStatsSection() {
  const organizations = [
    {
      name: "NSDC",
      stat: "12,200",
      label: "Students Trained",
      color: "text-blue-700",
    },
    {
      name: "KSDC",
      stat: "500",
      label: "Students Trained",
      color: "text-blue-700",
    },
    {
      name: "NAAN MUDHALVAN",
      stat: "42,000",
      label: "Students Trained",
      color: "text-blue-700",
    },
    {
      name: "NASSCOM",
      stat: "1,400",
      label: "Students Trained",
      color: "text-blue-700",
    },
    {
      name: "B2I",
      stat: "2,900",
      label: "Students Trained",
      color: "text-blue-700",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {organizations.map((org) => (
            <div
              key={org.name}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center justify-center text-center"
            >
              <h3 className={`text-2xl font-bold ${org.color} mb-4`}>
                {org.name}
              </h3>
              <div className="border-t-2 border-gray-200 pt-4 w-full">
                <p className="text-3xl font-bold text-gray-800 mb-2">
                  {org.stat}
                </p>
                <p className="text-sm text-gray-600 uppercase font-medium">
                  {org.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
