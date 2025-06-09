/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Metadata } from "next";

// Types
interface TeamMember {
  name: string;
  image: string;
  role: string;
  description: string;
}

interface Stakeholder {
  title: string;
  description: string;
  icon: string;
}

interface Office {
  flag: string;
  country: string;
  role: string;
  desc: string;
  color: string;
}

interface VisibleItems {
  [key: string]: boolean;
}

// Data
const teamData: TeamMember[] = [
  {
    name: "Nisha Menon",
    image: "/app/about/nisha.png",
    role: "Delivery Manager",
    description: "https://www.linkedin.com/in/nisha-menon-2a328924/",
  },
  {
    name: "Swati Sharma",
    image: "/app/about/swathi.jpg",
    role: "Manager(Talent Acquisition)",
    description: "https://www.linkedin.com/in/swati-sharma-aa944113/",
  },
  {
    name: "Rakhi Dujrayan",
    image: "/app/about/rakhi.png",
    role: "Senior Business Development Manager",
    description: "https://www.linkedin.com/in/rakhi-dujrayan-69192273/",
  },
  {
    name: "Yatin Anand",
    image: "/app/about/yatin.jpg",
    role: "Manager – Key Accounts",
    description: "https://www.linkedin.com/in/peter-tc",
  },
];

const stakeholdersData: Stakeholder[] = [
  {
    title: "Aspirational Learners",
    description:
      "Students and job-seekers gaining future-ready skills through our comprehensive programs.",
    icon: "🎓",
  },
  {
    title: "Academic Institutions",
    description:
      "Educational partners providing micro-credentials and infrastructure support for enhanced learning outcomes.",
    icon: "🏫",
  },
  {
    title: "IT Organizations",
    description:
      "Technology companies offering infrastructure, mentoring, and real-world project opportunities.",
    icon: "💼",
  },
  {
    title: "Industry Partners",
    description:
      "Businesses sharing knowledge and providing career opportunities for our program graduates.",
    icon: "🏭",
  },
];

const officesData: Office[] = [
  {
    flag: "🇮🇳",
    country: "India",
    role: "Global Headquarters",
    desc: "Primary delivery center",
    color: "from-orange-600 to-green-600",
  },
  {
    flag: "🇸🇬",
    country: "Singapore",
    role: "Asia-Pacific Hub",
    desc: "Regional training center",
    color: "from-red-600 to-red-700",
  },
  {
    flag: "🇦🇪",
    country: "UAE",
    role: "Middle East Operations",
    desc: "MENA market focus",
    color: "from-green-600 to-red-600",
  },
  {
    flag: "🇺🇸",
    country: "USA",
    role: "North America",
    desc: "Market development",
    color: "from-blue-600 to-red-600",
  },
];

// Components
const HeroSection: React.FC = () => (
  <section className="relative h-[60vh] sm:h-[70vh] pt-16 sm:pt-24 pb-8 sm:pb-16 text-gray-900 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-800 to-purple-900">
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
      <div className="text-left">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Our Journey
        </h1>
        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mb-4 rounded-full"></div>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed font-medium">
          From Vision to Global Impact – Founded in 2011, SFJ Business Solutions
          began with a simple yet powerful vision: to bridge the global skills
          gap through innovative technology training.
        </p>
      </div>
    </div>
  </section>
);
const WhoWeAreSection: React.FC = () => (
  <section className="md:pt-14 text-gray-800 bg-white" id="WhoWe-Are">
    <div className="p-4 md:container flex flex-wrap gap-10 mx-auto">
      <div className="w-auto lg:min-w-[700px] flex-1 pb-10">
        <h1 className="text-4xl text-center tracking-wide text-blue-700 font-bold">
          Who We Are
        </h1>
        <p className="prose pt-8 text-gray-800 text-lg leading-relaxed">
          Founded in 2011, SFJ Business Solutions has been a trusted knowledge
          and talent services partner for several multi-national organizations.
          Driven by a core team with a wealth of passion and expertise, we have
          built long-lasting relationships with customers all over the globe,
          helping them scale their businesses with just-in-time and
          cost-effective talent transformation services and IT services.
        </p>
        <p className="pt-8 text-gray-800 text-lg leading-relaxed">
          We have an exceptional track record in workforce training, staffing,
          consulting and implementations on several key technical capabilities
          including SAP and Oracle. Over the last decade, we have created
          tremendous value for our customers through our strong network of
          staff, consultants, trainers and partners.
        </p>
        <p className="pt-8 text-gray-800 text-lg leading-relaxed">
          Our Motto: <b className="text-xl text-blue-700">S</b>olve business
          challenges. <b className="text-xl text-blue-700">F</b>oster agility
          and growth. <b className="text-xl text-blue-700">J</b>ubilate customer
          success.
        </p>
      </div>

      <div className="w-full flex lg:flex-row flex-1 lg:w-full md:h-fit lg:gap-0 gap-10 items-center justify-center md:flex-col flex-col">
        <div className="lg:w-1/2 max-w-[400px] flex lg:min-w-[357px] lg:h-full md:h-[400px] h-[300px] relative">
          <Image
            fill
            alt="Our Vision"
            className="object-cover"
            src="/app/about/Our-Vision.png"
          />
          <div className="w-full h-full text-white lg:p-20 p-24 flex flex-col justify-center items-center relative bg-black/40">
            <p className="text-center text-xl mb-2 font-bold drop-shadow-lg">
              Our Vision
            </p>
            <p className="text-center font-medium drop-shadow-md">
              To be a market leader in creating a technology workforce for the
              future through disruptions in upskilling and staffing.
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 max-w-[400px] lg:min-w-[357px] lg:h-full md:h-[400px] h-[300px] relative">
          <Image
            fill
            alt="Our Mission"
            className="object-cover"
            src="/app/about/Our-Mission.png"
          />
          <div className="w-full h-full text-white gap-10 lg:p-20 p-24 flex flex-col justify-center items-center relative bg-black/40">
            <div>
              <p className="text-center text-xl mb-2 font-bold drop-shadow-lg">
                Our Mission
              </p>
              <p className="text-center font-medium drop-shadow-md">
                To help our customers achieve scale through innovative, agile
                and efficient talent transformation solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CoreValuesSection: React.FC = () => (
  <>
    <div className="w-full h-[100px]" id="Core-values"></div>
    <section className="lg:container mx-auto text-black bg-gray-50 py-12">
      <h1 className="text-4xl tracking-wide mb-10 text-center text-blue-700 font-bold">
        Core Values
      </h1>

      <div className="lg:container mb-10 mx-auto">
        <div className="flex tablet:flex-row flex-col gap-5 justify-center items-center">
          {[
            {
              title: "Passion",
              image: "/app/about/Passion.png",
              description:
                "A driving force behind our continuous innovation and value creation",
            },
            {
              title: "Expertise",
              image: "/app/about/Expertise.png",
              description:
                "A blend of experiences from the past and thought leadership focused on future",
            },
            {
              title: "Empathy",
              image: "/app/about/Empathy.png",
              description:
                "A customer-first approach that enables us to understand businesses and people better than most",
            },
          ].map((value, index) => (
            <div key={index} className="p-4 lg:w-[400px]">
              <div className="h-full rounded-lg">
                <div className="h-60 w-full flex justify-center relative">
                  <div className="w-[300px] h-full relative">
                    <Image
                      className="absolute inset-0 object-cover rounded-lg"
                      fill
                      alt={value.title}
                      src={value.image}
                    />
                  </div>
                  <div className="absolute inset-0 p-8 flex items-center justify-center bg-black/50 rounded-lg">
                    <p className="text-3xl font-bold text-white drop-shadow-lg">
                      {value.title}
                    </p>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <p className="leading-relaxed md:px-5 mb-3 text-gray-800 text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const TimelineSection: React.FC = () => (
  <div className="max-w-7xl mx-auto py-5 px-3 mb-20">
    <Image
      src="/app/about/Timeline-of-SFJ.png"
      alt="Timeline of SFJ"
      width={1200}
      height={600}
      className="w-full object-cover"
    />
  </div>
);

const FounderSection: React.FC = () => (
  <>
    <div className="w-full h-[50px]" id="MeetOur-Founder"></div>
    <section className="bg-blue-50 py-10 md:py-24">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
          Meet Our Founder
        </h1>
        <div className="flex justify-center mb-6">
          <Image
            src="/CEO.jpg"
            alt="Founder"
            width={240}
            height={240}
            className="h-60 w-60 rounded-full object-cover"
          />
        </div>
        <div className="max-w-3xl mx-auto mt-10">
          <div className="text-lg md:text-xl leading-relaxed space-y-4 text-gray-800">
            <div className="mb-8 px-4 md:px-0">
              <h3 className="font-bold text-center mb-6 text-gray-900 text-2xl">
                Introducing Our Visionary CEO
              </h3>
              <p className="text-justify">
                Mr. Sivasarathy, the leader behind SFJ Business Solutions. A
                seasoned professional with diverse expertise. Mr. Sivasarathy,
                or Siva as he is fondly called, is the founder and CEO of SFJ
                Business Solutions Pvt Ltd, a leading provider of IT consulting,
                outsourcing, and skilling solutions. With over two decades of
                experience in various technical domains such as SAP and Oracle,
                Siva has managed projects, delivered implementations, and
                provided consulting services. Before starting SFJ Business
                Solutions in 2011, he worked as a SAP consultant at TCS, one of
                the largest IT companies in the world.
              </p>
            </div>
            <div className="mb-4 px-4 md:px-0">
              <h3 className="font-bold text-center mb-6 text-gray-900 text-2xl">
                A visionary leader with a passion for education
              </h3>
              <p className="text-justify">
                Siva is not only an expert in IT but also a passionate educator
                who believes in transforming learning experiences with
                innovative solutions. He guides SFJ Business Solutions with his
                deep insight into the IT industry and his strong commitment to
                excellence. Under his leadership, SFJ Business Solutions has
                become a top player in the market, known for its quality
                services and customer satisfaction. Siva invites you to join our
                journey to revolutionize education with a CEO who understands
                the needs and challenges of the industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => (
  <div className="flex flex-col items-center p-5">
    <div className="relative lg:w-[200px] lg:h-[200px] md:w-[200px] md:h-[200px] w-[200px] h-[200px] rounded-full">
      <Image
        className="rounded-full object-cover"
        alt={`${member.name} profile`}
        src={member.image}
        fill
      />
    </div>
    <h2 className="mt-4 text-2xl text-gray-900 capitalize font-bold">
      {member.name}
    </h2>
    <div className="flex flex-col gap-5 justify-center">
      <p className="text-gray-700 h-[60px] mt-2 capitalize text-center font-medium">
        {member.role}
      </p>
    </div>

    <a
      className="hover:scale-105 mt-5 transition-all"
      href={member.description}
      target="_blank"
      rel="noreferrer"
      aria-label={`${member.name} LinkedIn profile`}
    >
      <svg
        className="w-8 h-8"
        width="100"
        height="100"
        viewBox="0 0 201 201"
        aria-hidden="true"
      >
        <rect width="201" height="201" fill="#0072b1" rx="19" ry="19" />
        <polygon
          fill="#fefefe"
          points="39 102 39 162 68 162 68 97 68 80 39 80"
        />
        <path
          fill="#fefefe"
          d="M54 39c-8 0-15 7-15 15 0 7 7 14 15 14 7 0 14-7 14-14 0-8-7-15-14-15zM161 105c-2-15-9-25-30-25-12 0-20 5-24 11l0 0 0-11-23 0 0 16 0 66 24 0 0-41c0-10 2-21 15-21 13 0 14 13 14 22l0 40 25 0 0-45 0 0c0-4 0-8-1-12z"
        />
      </svg>
    </a>
  </div>
);

const TeamSection: React.FC = () => (
  <>
    <div className="w-full h-[50px]" id="MeetOur-Team"></div>
    <section className="bg-white md:pt-24 md:pb-10">
      <div className="container px-6 mx-auto">
        <h1 className="text-3xl text-center text-gray-900 capitalize lg:text-4xl font-bold">
          Meet Our Team
        </h1>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-4">
          {teamData.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  </>
);

interface StakeholderCardProps {
  stakeholder: Stakeholder;
  index: number;
}

const StakeholderCard: React.FC<StakeholderCardProps> = ({
  stakeholder,
  index,
}) => (
  <div
    className="group bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-200"
    style={{ animationDelay: `${index * 200}ms` }}
  >
    <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
      {stakeholder.icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
      {stakeholder.title}
    </h3>
    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
      {stakeholder.description}
    </p>
    <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mt-4 group-hover:w-12 transition-all duration-300"></div>
  </div>
);

const StakeholdersSection: React.FC = () => (
  <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Our Collaborative Ecosystem
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 sm:mb-6 rounded-full"></div>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4 font-medium">
          Success in workforce development requires a collaborative ecosystem of
          learners, institutions, technology partners, and industry leaders.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stakeholdersData.map((stakeholder, index) => (
          <StakeholderCard
            key={index}
            stakeholder={stakeholder}
            index={index}
          />
        ))}
      </div>
    </div>
  </section>
);

interface OfficeCardProps {
  office: Office;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ office }) => (
  <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 sm:p-8 text-center hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-200">
    <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
      {office.flag}
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
      {office.country}
    </h3>
    <p
      className={`font-bold text-sm mb-3 bg-gradient-to-r ${office.color} bg-clip-text text-transparent`}
    >
      {office.role}
    </p>
    <p className="text-gray-700 text-sm sm:text-base font-medium">
      {office.desc}
    </p>
    <div
      className={`w-8 h-1 bg-gradient-to-r ${office.color} rounded-full mx-auto mt-4 group-hover:w-12 transition-all duration-300`}
    ></div>
  </div>
);

const GlobalPresenceSection: React.FC = () => (
  <section className="py-12 sm:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Global Presence, Local Impact
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 sm:mb-6 rounded-full"></div>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4 font-medium">
          With offices strategically located across Singapore, UAE, and the
          United States, SFJ delivers consistent, high-quality training
          experiences while adapting to local market needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {officesData.map((office, index) => (
          <OfficeCard key={index} office={office} />
        ))}
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-gradient-to-br from-slate-200 to-gray-300 text-gray-800 py-8 sm:py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-gray-700 text-sm sm:text-base font-medium">
        © 2024 SFJ Business Solutions. Bridging the global skills gap through
        innovative technology training.
      </p>
    </div>
  </footer>
);

// Main Component
const AboutPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            setVisibleItems(
              (prev) => new Set([...prev, target.dataset.index || ""])
            );
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => {
      observerRef.current?.observe(item);
    });

    return () => {
      timelineItems.forEach((item) => {
        observerRef.current?.unobserve(item);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <HeroSection />
      <WhoWeAreSection />
      <CoreValuesSection />
      <TimelineSection />
      <FounderSection />
      {/* <TeamSection /> */}
      <StakeholdersSection />
      <GlobalPresenceSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
