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

export default function CSRPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-indigo-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Empowering Futures,{" "}
                <span className="text-yellow-400">
                  Building a Skilled India
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                At SFJ Business Solutions, our commitment extends beyond
                business. We believe in creating a positive societal impact
                through skilling, education, and sustainable development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#impact"
                  className="inline-flex items-center px-8 py-4 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105"
                >
                  Learn More About Our Impact
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#initiatives"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all"
                >
                  Explore Our Initiatives
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/csr-hero.jpg"
                  alt="People being trained in modern facility"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
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
