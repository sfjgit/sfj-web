import { Card, CardContent } from "@/components/ui/card";

const ImpactMetrics = () => {
  const metrics = [
    {
      number: "300,000+",
      label: "Professionals Trained",
      icon: "🎓",
      description: "Global workforce transformation"
    },
    {
      number: "640+",
      label: "Specialized Courses",
      icon: "📚",
      description: "Comprehensive curriculum"
    },
    {
      number: "35,000",
      label: "Learners in 2024",
      icon: "🚀",
      description: "Record year achievement"
    },
    {
      number: "50,000+",
      label: "Partnership Training",
      icon: "🤝",
      description: "Strategic collaborations"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Impact at a Glance
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Delivering measurable results through comprehensive workforce development and strategic training partnerships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">{metric.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {metric.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-lg p-6 shadow-md">
            <span className="text-2xl">🌍</span>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Global Reach</div>
              <div className="text-sm text-gray-600">Offices in Singapore, UAE, and United States</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
