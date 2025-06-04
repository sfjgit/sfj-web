/* eslint-disable @next/next/no-img-element */
// app/csr/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Heart,
  Leaf,
  Award,
  Building2,
  Factory,
  Stethoscope,
  CreditCard,
  Truck,
  ArrowRight,
  Quote,
} from "lucide-react";

// Industries array
const industries = [
  "Automotive",
  "Communications",
  "Construction and Engineering",
  "Consumer Packaged Goods",
  "Defense and Intelligence",
  "Education",
  "Financial Services",
  "Government",
  "Health",
  "High Technology",
  "Hospitality",
  "Industrial Manufacturing",
  "Life Sciences",
  "Media and Entertainment",
  "Oil and Gas",
  "Professional Services",
  "Public Safety",
  "Restaurants",
  "Retail",
  "Transportation and Logistics",
  "Utilities",
  "Wholesale Distribution",
  "Aerospace and Defence",
  "Agribusiness",
  "Banking",
  "Chemicals",
  "Consumer Products",
  "Defence and Security",
  "Insurance",
  "Mining",
];

export const metadata: Metadata = {
  title: "Corporate Social Responsibility | SFJ Business Solutions",
  description:
    "Empowering Futures, Building a Skilled India. Learn about SFJ Business Solutions' commitment to creating positive societal impact through skilling, education, and sustainable development.",
  keywords: [
    "CSR",
    "Corporate Social Responsibility",
    "Skill India",
    "SFJ Business Solutions",
    "Skills Development",
    "Education",
    "Community Development",
    "Sustainable Development",
    "Training Programs",
    "Employment",
    "Social Impact",
  ],
  authors: [{ name: "SFJ Business Solutions" }],
  openGraph: {
    title: "Corporate Social Responsibility | SFJ Business Solutions",
    description:
      "Empowering Futures, Building a Skilled India through comprehensive CSR initiatives.",
    url: "https://sfjbusiness.com/csr",
    siteName: "SFJ Business Solutions",
    images: [
      {
        url: "/images/csr-hero.jpg",
        width: 1200,
        height: 630,
        alt: "SFJ Business Solutions CSR Impact",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Social Responsibility | SFJ Business Solutions",
    description:
      "Empowering Futures, Building a Skilled India through comprehensive CSR initiatives.",
    images: ["/images/csr-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sfjbusiness.com/csr",
  },
};

// Statistics data
const impactStats = [
  { number: "50,000+", label: "Individuals Trained", icon: Users },
  { number: "150+", label: "Government Projects", icon: Building2 },
  { number: "85%", label: "Placement Success Rate", icon: Award },
  { number: "25+", label: "Partner Organizations", icon: Heart },
];

// Industry impact data
const industryImpacts = [
  {
    title: "Education & Research",
    description:
      "Delivering operational resilience, data-driven insights, and transformative learning experiences.",
    contribution:
      "Our initiatives focus on upskilling educators, developing future-ready curricula, and providing technology-driven learning solutions.",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    title: "Manufacturing",
    description:
      "Running resilient supply chains, optimizing manufacturing, and offering differentiated solutions.",
    contribution:
      "Specialized training programs empower the manufacturing workforce with skills in automation and digital technologies.",
    icon: Factory,
    color: "bg-orange-500",
  },
  {
    title: "Life Science & Healthcare",
    description:
      "Fostering faster time to market, resilient supply chains, compliance, and smarter insights.",
    contribution:
      "Developing talent in data analytics, regulatory compliance, and digital health solutions for improved patient care.",
    icon: Stethoscope,
    color: "bg-green-500",
  },
  {
    title: "Financial Services",
    description:
      "Optimizing operations, improving resilience, and achieving mission outcomes efficiently.",
    contribution:
      "Enhancing digital literacy and cybersecurity awareness while training individuals for FinTech roles.",
    icon: CreditCard,
    color: "bg-purple-500",
  },
  {
    title: "Transportation & Logistics",
    description:
      "Supporting energy transition, new models, customer needs, and optimizing operations.",
    contribution:
      "Providing skilling in logistics management, supply chain digitalization, and sustainable transportation practices.",
    icon: Truck,
    color: "bg-indigo-500",
  },
];

// Testimonials data
const testimonials = [
  {
    quote:
      "Thanks to SFJBS, I gained the skills to secure a fulfilling job in the IT sector. The training was comprehensive and industry-relevant.",
    author: "Priya Sharma",
    role: "Software Developer",
    location: "Bangalore",
  },
  {
    quote:
      "The skill development program changed my life completely. From unemployment to a stable career in just 6 months.",
    author: "Rajesh Kumar",
    role: "Data Analyst",
    location: "Delhi",
  },
  {
    quote:
      "Excellent training methodology and placement support. SFJBS truly cares about student success.",
    author: "Anita Patel",
    role: "Digital Marketing Specialist",
    location: "Mumbai",
  },
];

// CSR pillars data
const csrPillars = [
  {
    title: "Skill Development & Livelihood",
    description: "Bridging the skill gap for a future-ready workforce",
    icon: Users,
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Educational Empowerment",
    description: "Providing access to quality learning opportunities",
    icon: GraduationCap,
    color: "text-green-600 bg-green-100",
  },
  {
    title: "Community Development",
    description: "Contributing to the well-being of local communities",
    icon: Heart,
    color: "text-red-600 bg-red-100",
  },
  {
    title: "Sustainable Practices",
    description: "Integrating environmentally conscious operations",
    icon: Leaf,
    color: "text-emerald-600 bg-emerald-100",
  },
];

const IndustriesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Industries We <span className="text-blue-600">Serve</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering excellence across diverse sectors with tailored solutions
            that drive growth and innovation
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-black">
          {industries.map((industry, index) => (
            <div key={index}>
              <img
                src={`/app/CSR/${index + 1}.png`}
                alt={industry}
                className="w-20  object-cover transition-transform duration-500 group-hover:scale-110 "
              />
              <p className="text-lg font-semibold text-white mt-4">
                {industry}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function CSRPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-white text-slate-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-200/20 via-transparent to-blue-200/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_theme(colors.sky.300/0.1)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_theme(colors.blue.300/0.1)_0%,_transparent_50%)]"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 bg-sky-100/10 border border-sky-300/30 rounded-full text-sm font-medium text-sky-200 backdrop-blur-sm">
                <div className="w-2 h-2 bg-sky-400 rounded-full mr-2 animate-pulse"></div>
                Transforming Education & Skills
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
                Empowering Futures,{" "}
                <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                  Building a Skilled India
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-200 leading-relaxed max-w-xl">
                At SFJ Business Solutions, we create transformative societal
                impact through comprehensive skilling initiatives and
                sustainable development programs.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6 py-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sky-300 mb-1">
                    50K+
                  </div>
                  <div className="text-xs text-slate-400">Lives Impacted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300 mb-1">
                    200+
                  </div>
                  <div className="text-xs text-slate-400">Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sky-400 mb-1">
                    15+
                  </div>
                  <div className="text-xs text-slate-400">States</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="#impact"
                  className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Learn Our Impact
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#initiatives"
                  className="group inline-flex items-center px-6 py-3 bg-white/5 border border-sky-300/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  View Initiatives
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-sky-300/30 to-blue-300/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-sky-300/30 rounded-full blur-xl"></div>

              {/* Main Image Container */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg ring-1 ring-sky-200/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent z-10"></div>
                  <Image
                    src="/images/csr-hero.jpg"
                    alt="Modern training facility with people learning technology skills"
                    width={600}
                    height={450}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    priority
                  />

                  {/* Floating Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-sky-200/50 rounded-lg p-3 z-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium text-slate-600">
                          Next Training Batch
                        </div>
                        <div className="text-sm font-semibold text-slate-800">
                          Starts June 15, 2025
                        </div>
                      </div>
                      <div className="flex -space-x-1.5">
                        <div className="w-6 h-6 bg-sky-400 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-sky-500 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-slate-400 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            +5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section>
        <IndustriesSection />
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section id="impact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Driving Change Through Responsible Business
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At SFJ Business Solutions, Corporate Social Responsibility (CSR)
              is deeply embedded in our values. We recognize our role in
              contributing to a more equitable and prosperous society. Our
              initiatives focus on leveraging our core strengths in talent
              transformation and IT services to empower individuals and
              communities, foster innovation, and promote sustainable growth
              across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {csrPillars.map((pillar, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${pillar.color}`}
                >
                  <pillar.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill India Initiative */}
      <section
        id="initiatives"
        className="py-20 bg-gradient-to-r from-orange-50 to-red-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transforming Lives with{" "}
              <span className="text-orange-600">Skill India</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              SFJ Business Solutions is proud to be a dedicated partner in the
              Government of India&#39;s Skill India mission. Through our robust
              training programs and partnerships, we are equipping individuals
              with the knowledge and practical skills demanded by today&#39;s
              evolving industries.
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <Quote className="h-8 w-8 text-orange-500 mb-4" />
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  {testimonial.quote}
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} • {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Impact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Empowering Industries, Enabling Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our CSR efforts are informed by our deep understanding of various
              industry needs. We&apos;ve actively engaged in impactful projects
              across the sectors we serve.
            </p>
          </div>

          <div className="space-y-12">
            {industryImpacts.map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                  <div>
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${industry.color} text-white`}
                    >
                      <industry.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      {industry.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      <strong>Impact:</strong> {industry.description}
                    </p>
                  </div>
                  <div className="lg:pl-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      SFJBS Contribution:
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {industry.contribution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Collaborating for Greater Impact
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Our CSR journey is strengthened by the invaluable support of our
              partners. We believe that collective action is key to achieving
              sustainable change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-800 rounded-lg p-6">
              <Building2 className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="font-semibold text-lg">Government of India</h3>
              <p className="text-gray-400 text-sm">Skill India Initiatives</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="font-semibold text-lg">NGOs & Communities</h3>
              <p className="text-gray-400 text-sm">Local Organizations</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <GraduationCap className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="font-semibold text-lg">
                Educational Institutions
              </h3>
              <p className="text-gray-400 text-sm">Academic Partners</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <Factory className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-semibold text-lg">Industry Associations</h3>
              <p className="text-gray-400 text-sm">Sector Partnerships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            We are continuously expanding our CSR footprint and looking for
            opportunities to create even greater impact. Whether you&apos;re a
            potential partner, a community organization, or an individual
            seeking to contribute, we welcome collaboration.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact?subject=partnership"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Partner With Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/initiatives"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition-all"
            >
              Learn About Our Initiatives
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
            >
              Contact Us to Know More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
