
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Code, Database, Shield, Building, GraduationCap } from "lucide-react";

const Solutions = () => {
  const enterpriseServices = [
    {
      icon: Cloud,
      title: "Cloud Computing Excellence",
      description: "AWS, Azure, and Google Cloud Platform training with hands-on certification programs",
      learners: "5,000+ trained in 2024"
    },
    {
      icon: Code,
      title: "Software Development Mastery",
      description: "Full-stack development, mobile apps, and DevOps automation training",
      learners: "8,000+ developers skilled"
    },
    {
      icon: Database,
      title: "Data Science & Analytics",
      description: "Big Data, Machine Learning, AI, and Business Intelligence specialization",
      learners: "6,000+ data professionals"
    },
    {
      icon: Shield,
      title: "Cybersecurity Specialization",
      description: "Ethical hacking, security operations, and cloud security frameworks",
      learners: "1,000+ security experts"
    }
  ];

  const institutionalPrograms = [
    {
      icon: GraduationCap,
      title: "Graduate Employability Programs",
      description: "Engineering and MBA career pathway programs with industry certifications"
    },
    {
      icon: Building,
      title: "Corporate Partnerships",
      description: "B2I institutional partnerships for skill development and digital literacy"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Training Solutions
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Transforming workforce capabilities through cutting-edge technology training and strategic skill development programs
            </p>
          </div>
        </div>
      </section>

      {/* Enterprise B2B Solutions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enterprise B2B Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology training programs designed for professional development and organizational growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {enterpriseServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <p className="text-sm text-blue-600 font-medium">{service.learners}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* ERP Training Section */}
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Enterprise Resource Planning (ERP) Training
              </h3>
              <p className="text-gray-600 mb-6">
                SAP, Oracle, and Microsoft Dynamics 365 comprehensive training programs
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  SAP S/4HANA
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Oracle Cloud
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Dynamics 365
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* B2I Institutional Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              B2I Institutional Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bridging the gap between academic learning and industry requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {institutionalPrograms.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <Card key={index} className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <IconComponent className="h-12 w-12 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{program.title}</h3>
                  <p className="text-gray-600">{program.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Industry Specific Solutions */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Industry-Specific Training Solutions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-semibold text-lg mb-2">BFSI Sector</h4>
                <p className="text-gray-600 text-sm">20,000 learners trained in banking and financial services</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-lg mb-2">Healthcare & Life Sciences</h4>
                <p className="text-gray-600 text-sm">Medical technology and health informatics training</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-lg mb-2">Manufacturing</h4>
                <p className="text-gray-600 text-sm">Industry 4.0 and smart manufacturing solutions</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Workforce?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact our experts to design a customized training solution for your organization
          </p>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solutions;