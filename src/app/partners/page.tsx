
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, GraduationCap, Globe, Users, Award, Handshake } from "lucide-react";

const Partners = () => {
  const technologyPartners = [
    {
      category: "Cloud Computing",
      partners: ["Microsoft Azure", "Amazon Web Services (AWS)", "Google Cloud Platform"],
      description: "Authorized training partnerships for cloud platform solutions"
    },
    {
      category: "Enterprise Software",
      partners: ["SAP", "Oracle", "Microsoft", "Salesforce"],
      description: "Comprehensive enterprise application training authorization"
    },
    {
      category: "Cybersecurity & Certification",
      partners: ["CompTIA", "PeopleCert", "PMI"],
      description: "Leading certification training and professional assessment"
    }
  ];

  const corporateClients = [
    {
      category: "Global Consulting Leaders",
      companies: ["Accenture", "Capgemini", "KPMG", "Ernst & Young"],
      focus: "Workforce transformation and digital skills development"
    },
    {
      category: "Technology Service Providers", 
      companies: ["Tata Consultancy Services", "Wipro", "Tech Mahindra", "Mphasis"],
      focus: "Enterprise-scale training program delivery"
    },
    {
      category: "Technology Infrastructure",
      companies: ["Atos Syntel", "Hexaware", "NTTData"],
      focus: "Infrastructure management and digital platform development"
    }
  ];

  const governmentPartners = [
    {
      name: "NSDC (National Skill Development Corporation)",
      description: "Strategic partnership for nationwide skill development initiatives",
      impact: "4,000 learners in Cloud Computing and Generative AI"
    },
    {
      name: "Karnataka Skill Development Corporation",
      description: "Regional training program delivery and workforce development",
      impact: "500 learners in emerging technology domains"
    },
    {
      name: "Tamil Nadu Skill Development Corporation",
      description: "Large-scale digital literacy and skill enhancement programs",
      impact: "27,000 learners in comprehensive digital skills"
    },
    {
      name: "MP State Skill Development Mission",
      description: "Specialized AI and emerging technology training programs",
      impact: "1,600 learners in Generative AI applications"
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
              Strategic Partnerships & Collaborations
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Building transformative alliances with global technology leaders, government institutions, and industry innovators
            </p>
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Global Technology Partners
            </h2>
            <p className="text-xl text-gray-600">
              Authorized training partnerships with industry-leading technology companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologyPartners.map((category, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {category.partners.map((partner, idx) => (
                      <div key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 inline-block mr-2 mb-2">
                        {partner}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Government Partnerships */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Government & Institutional Collaborations
            </h2>
            <p className="text-xl text-gray-600">
              Strategic partnerships driving nationwide skill development initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {governmentPartners.map((partner, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{partner.description}</p>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">{partner.impact}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Client Portfolio */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Corporate Client Portfolio
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by global consulting leaders and technology service providers
            </p>
          </div>

          <div className="space-y-8">
            {corporateClients.map((category, index) => (
              <Card key={index} className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Handshake className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                    <p className="text-gray-600">{category.focus}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {category.companies.map((company, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg text-center">
                      <span className="font-medium text-gray-800">{company}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Association Partners */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry Association Partnerships
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Building className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                NASSCOM Collaboration
              </h3>
              <p className="text-gray-600 mb-4">
                Future Skills Prime and Digital 101 initiatives
              </p>
              <div className="text-2xl font-bold text-blue-600">6,000+ learners</div>
            </Card>

            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <GraduationCap className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                University Partnerships
              </h3>
              <p className="text-gray-600 mb-4">
                Academic institution collaborations for curriculum development
              </p>
              <div className="text-2xl font-bold text-green-600">Multiple Institutions</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Value Proposition */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partnership Value Proposition
            </h2>
            <p className="text-xl text-gray-600">
              Creating mutual value through strategic collaboration and shared expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-4">For Technology Partners</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Market expansion opportunities</li>
                <li>• Direct access to skilled talent pipeline</li>
                <li>• Joint innovation collaboration</li>
              </ul>
            </Card>

            <Card className="p-6 text-center">
              <Building className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-4">For Corporate Clients</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Rapid skill development programs</li>
                <li>• Cost-optimized training delivery</li>
                <li>• Continuous learning pathways</li>
              </ul>
            </Card>

            <Card className="p-6 text-center">
              <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-4">For Educational Institutions</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Industry-relevant curriculum</li>
                <li>• Expert faculty access</li>
                <li>• Enhanced graduate employability</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Become a Strategic Partner
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our network of technology leaders, educational institutions, and industry innovators to transform workforce capabilities together.
          </p>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
            Partner With Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
