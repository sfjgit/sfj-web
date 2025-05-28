
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const milestones = [
    {
      year: "2011",
      title: "Foundation Year",
      description: "Established with a strong focus on IT training excellence and industry-relevant curriculum development.",
      icon: "🏁"
    },
    {
      year: "2015-2018",
      title: "Training Scale Achievement",
      description: "Reached the significant milestone of training 300,000+ IT professionals across diverse technology domains.",
      icon: "📊"
    },
    {
      year: "2019-2021",
      title: "Curriculum Expansion",
      description: "Developed and launched 640+ specialized courses covering emerging technologies and industry best practices.",
      icon: "📚"
    },
    {
      year: "2022",
      title: "Strategic Partnerships",
      description: "Formed alliances with universities, skill development missions, NSDC, and NASSCOM, training 50,000+ professionals.",
      icon: "🤝"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Established international presence with offices in Singapore, UAE, and the United States.",
      icon: "🌍"
    },
    {
      year: "2024",
      title: "Digital Innovation",
      description: "Launched comprehensive digital literacy programs and CSR initiatives, training 35,000 professionals.",
      icon: "💻"
    }
  ];

  const stakeholders = [
    {
      title: "Aspirational Learners",
      description: "Students and job-seekers gaining future-ready skills through our comprehensive programs.",
      icon: "🎓"
    },
    {
      title: "Academic Institutions",
      description: "Educational partners providing micro-credentials and infrastructure support for enhanced learning outcomes.",
      icon: "🏫"
    },
    {
      title: "IT Organizations",
      description: "Technology companies offering infrastructure, mentoring, and real-world project opportunities.",
      icon: "💼"
    },
    {
      title: "Industry Partners",
      description: "Businesses sharing knowledge and providing career opportunities for our program graduates.",
      icon: "🏭"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* <Navigation /> */}
      
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Journey: From Vision to Global Impact
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Founded in 2011, SFJ Business Solutions began with a simple yet powerful vision: to bridge the global skills gap through innovative technology training.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Milestones That Define Our Growth
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Over more than a decade, we have evolved from a focused IT training provider to a comprehensive workforce development partner serving organizations worldwide.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{milestone.icon}</span>
                      <div className="text-2xl font-bold text-blue-600">{milestone.year}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Collaborative Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Success in workforce development requires a collaborative ecosystem of learners, institutions, technology partners, and industry leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stakeholders.map((stakeholder, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{stakeholder.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{stakeholder.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{stakeholder.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Global Presence, Local Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              With offices strategically located across Singapore, UAE, and the United States, SFJ delivers consistent, high-quality training experiences while adapting to local market needs and regulatory requirements.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { flag: "🇮🇳", country: "India", role: "Global Headquarters", desc: "Primary delivery center" },
                { flag: "🇸🇬", country: "Singapore", role: "Asia-Pacific Hub", desc: "Regional training center" },
                { flag: "🇦🇪", country: "UAE", role: "Middle East Operations", desc: "MENA market focus" },
                { flag: "🇺🇸", country: "USA", role: "North America", desc: "Market development" }
              ].map((office, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{office.flag}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{office.country}</h3>
                    <p className="text-blue-600 font-medium text-sm mb-2">{office.role}</p>
                    <p className="text-gray-600 text-sm">{office.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;