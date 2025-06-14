/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { FaGlobe, FaUsers, FaClock } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PartnershipsCarousel = () => {
  const ties = [
    {
      id: 1,
      name: "Karnataka Skill Development Corporation",
      description:
        "In partnership with bSkilling, we drive impactful programs focused on innovation and skill development.",
      img: "/app/b2g/ksdc.png",
      details: {
        programs: [
          "Digital Skills Training",
          "Industry 4.0 Certification",
          "Entrepreneurship Development",
        ],
        participants: "15K+ Students",
        duration: "Ongoing Partnership",
        certification: "State Government Certified",
      },
    },
    {
      id: 2,
      name: "Naan Mudhalvan",
      description:
        "A transformative initiative aimed at empowering youth with industry-relevant skills, career guidance, and opportunities.",
      img: "/app/b2g/naan-logo.png",
      details: {
        programs: [
          "Career Guidance",
          "Skill Enhancement",
          "Leadership Development",
        ],
        participants: "25K+ Youth",
        duration: "2+ Years Partnership",
        certification: "Tamil Nadu Government Certified",
      },
    },
    {
      id: 3,
      name: "Future Skills",
      description:
        "A premier trade body driving innovation, policy advocacy, and skill development to foster India's digital transformation.",
      img: "/app/b2g/future-skills.png",
      details: {
        programs: [
          "AI/ML Training",
          "Cloud Computing",
          "Data Science Bootcamps",
        ],
        participants: "30K+ Professionals",
        duration: "3+ Years Partnership",
        certification: "NASSCOM Certified",
      },
    },
    {
      id: 4,
      name: "NSDC",
      description:
        "The National Skill Development Corporation focuses on empowering India's workforce through skill development initiatives.",
      img: "/app/b2g/nsdc.png",
      details: {
        programs: [
          "National Skill Certification",
          "Industry Training",
          "Employment Generation",
        ],
        participants: "50K+ Workforce",
        duration: "5+ Years Partnership",
        certification: "National Government Certified",
      },
    },
  ];

  // Hero Slide Component
  const HeroSlide = () => (
    <div className="bg-white rounded-2xl overflow-hidden h-full  max-w-7xl mx-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 h-full">
          {/* Left Content */}
          <div className="space-y-4 pt-10">
            {/* Header Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg">
                  <FaGlobe size={20} className="text-white" />
                </div>
                <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-gray-200">
                  Trusted Government Partnerships
                </span>
              </div>

              <div className="space-y-2">
                {/* Main Title as Badge */}
                <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg">
                  Industry-Ready AI-Driven Graduates
                </div>
                {/* Subtitle - Bigger Text */}
                <h2 className="text-2xl lg:text-3xl text-gray-800 font-bold leading-tight mt-3">
                  Create Tomorrow's Workforce
                  <br />
                  <span className="text-blue-600">'Not Just Graduates'</span>
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-gray-600 leading-relaxed">
              Partner with prestigious government bodies to transform education
              and build the workforce of tomorrow through cutting-edge AI and
              digital skills training.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2">
              {[
                "AI-Driven Training",
                "Government Partnerships",
                "Industry-Ready Skills",
                "Digital Transformation",
                "Workforce Development",
                "Cutting-Edge Curriculum",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white/50 p-2 rounded"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center text-sm">
                Explore Partnerships
              </button>
              <button className="bg-white/90 hover:cursor-pointer backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md text-sm">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative h-full flex-col flex justify-center items-end">
            <img
              src="/app/b2g/govt.png"
              alt="Government Partnership Program"
              className="w-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Partnership Slide Component
  const PartnershipSlide = ({ tie }: any) => (
    <div className="bg-white rounded-2xl overflow-hidden h-full pt-10 max-w-7xl mx-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center space-y-8 h-full justify-center">
          {/* Logo Section - Highlighted */}
          {/* <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-3xl shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-all duration-300">
              <img
                src={tie.img}
                alt={tie.name}
                className="w-48 h-32 object-contain mx-auto"
              />
            </div>
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {tie.details.certification.split(" ").slice(0, 2).join(" ")}
            </div>
          </div> */}

          {/* Content Section - Centered */}
          <div className="space-y-6 max-w-3xl">
            {/* Partnership Name */}
            <h2 className="text-3xl lg:text-4xl text-gray-800 font-bold leading-tight">
              {tie.name}
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {tie.description}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-full shadow-sm">
                <FaUsers className="text-blue-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {tie.details.participants}
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-green-50 px-6 py-3 rounded-full shadow-sm">
                <FaClock className="text-green-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {tie.details.duration}
                </span>
              </div>
            </div>

            {/* Programs - Centered Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {tie.details.programs.map((program: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {program}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Learn More
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className=" py-16">
      <div className="w-full mx-auto px-4">
        <Carousel className="w-full">
          <CarouselContent>
            {/* Hero Slide */}
            <CarouselItem>
              <HeroSlide />
            </CarouselItem>

            {/* Partnership Slides */}
            {ties.map((tie) => (
              <CarouselItem key={tie.id}>
                <PartnershipSlide tie={tie} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default PartnershipsCarousel;
