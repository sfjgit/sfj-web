import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServicesOverview = () => {
  const services = [
    {
      icon: "🔄",
      title: "Reskilling Programs",
      description: "Helping professionals transition to new roles and emerging technologies with globally recognized certifications.",
      category: "B2B Solutions"
    },
    {
      icon: "📈",
      title: "Upskilling Initiatives",
      description: "Advanced training programs designed to elevate working professionals' expertise for accelerated career growth.",
      category: "B2B Solutions"
    },
    {
      icon: "🔀",
      title: "Cross-Skilling Solutions",
      description: "Enabling professionals to acquire diverse competencies across multiple technology domains with international certifications.",
      category: "B2B Solutions"
    },
    {
      icon: "🎯",
      title: "Graduate Employability Programs",
      description: "Comprehensive skill development for college graduates and postgraduates, delivered through expert faculty to ensure market readiness.",
      category: "B2I Partnerships"
    },
    {
      icon: "🌐",
      title: "Digital Literacy Initiatives",
      description: "Corporate Social Responsibility programs focused on enhancing digital capabilities among students and educators globally.",
      category: "B2I Partnerships"
    },
    {
      icon: "🏫",
      title: "Youth Skills Development",
      description: "Foundational technology training designed to prepare young individuals for the digital economy.",
      category: "B2I Partnerships"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission: Comprehensive Workforce Transformation
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At SFJ, we understand that today&apos;s rapidly evolving business landscape demands more than traditional training approaches. Our comprehensive 5-Step Workforce Development Framework ensures organizations build future-ready teams.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">5-Step Workforce Development Framework</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              "Workforce Readiness Assessment",
              "Strategic Training Needs Analysis", 
              "Customized Program Development",
              "Continuous Learning Monitoring",
              "Strategic Talent Deployment"
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  {index + 1}
                </div>
                <p className="text-sm font-medium text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Core Service Offerings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-600">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl">{service.icon}</span>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {service.category}
                  </span>
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
            Explore All Solutions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;