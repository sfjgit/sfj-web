import { Card, CardContent } from "@/components/ui/card";

const PartnersShowcase = () => {
  const partners = [
    { name: "Microsoft", type: "Technology Partner" },
    { name: "AWS", type: "Cloud Partner" },
    { name: "Oracle", type: "Database Partner" },
    { name: "SAP", type: "ERP Partner" },
    { name: "NASSCOM", type: "Industry Association" },
    { name: "Accenture", type: "Consulting Partner" },
    { name: "Capgemini", type: "Technology Services" },
    { name: "TCS", type: "IT Services" },
    { name: "Wipro", type: "Digital Solutions" },
    { name: "KPMG", type: "Professional Services" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industry Leadership & Global Recognition
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by industry leaders and backed by strategic partnerships with global technology companies and government institutions
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Trusted by Industry Leaders</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {partners.map((partner, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="font-semibold text-gray-900 mb-1">{partner.name}</div>
                  <div className="text-xs text-gray-500">{partner.type}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Government & Institutional Partnerships</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">🏛️ National Skill Development Corporation (NSDC)</h4>
              <p className="text-gray-600">Strategic partnership for nationwide skill development initiatives</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">🏛️ State Skill Development Corporations</h4>
              <p className="text-gray-600">Karnataka, Tamil Nadu, and MP State partnerships for regional training programs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersShowcase;
