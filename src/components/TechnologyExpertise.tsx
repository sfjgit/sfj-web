
import { Card, CardContent } from "@/components/ui/card";

const TechnologyExpertise = () => {
  const technologies = [
    { name: "Programming & Development", learners: "8,000", color: "bg-blue-500" },
    { name: "Big Data & Analytics", learners: "6,000", color: "bg-green-500" },
    { name: "Cloud Technologies", learners: "5,000", color: "bg-purple-500" },
    { name: "AI & Machine Learning", learners: "4,000", color: "bg-red-500" },
    { name: "Software Testing", learners: "2,500", color: "bg-yellow-500" },
    { name: "Cybersecurity", learners: "1,000", color: "bg-orange-500" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Technology Expertise That Drives Results
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our training programs span the most in-demand technology areas, with <strong>35,000 learners</strong> successfully completing programs in 2024
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${tech.color}`}></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">{tech.learners} professionals trained</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Organizations Choose SFJ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Just-in-Time Delivery</h4>
              <p className="text-gray-600">Rapid deployment of training solutions that meet immediate business needs without compromising quality.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">🏆</div>
              <h4 className="font-semibold text-gray-900 mb-2">Premium Quality Training</h4>
              <p className="text-gray-600">Industry-expert instructors, cutting-edge curriculum, and hands-on learning experiences that ensure practical skill application.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">💰</div>
              <h4 className="font-semibold text-gray-900 mb-2">Cost-Effective Solutions</h4>
              <p className="text-gray-600">Optimized training programs that deliver maximum ROI through strategic resource allocation and efficient delivery methods.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyExpertise;