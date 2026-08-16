"use client";
import React from "react";
import Image from "next/image";
// import CareerMapping from "./CareerMapping";
import { motion } from "framer-motion";
import {
  Terminal,
  Code2,
  Cloud as CloudIcon,
  Brain,
  Briefcase,
  Layers,
} from "lucide-react";

const APPLY_FORM_URL = "https://forms.gle/q9mv9UZYsN2xqcg4A";
const BOOK_CALL_URL = "https://calendly.com/bskilling-digital/30min";

const awsFaqs = [
  {
    q: "What is AWS re/Start?",
    a: "AWS re/Start is a free, full-time, skills development program designed by AWS to prepare unemployed and underemployed individuals for entry-level careers in cloud computing.",
  },
  {
    q: "Who can apply for the AWS re/Start program?",
    a: "The program is ideal for individuals who are unemployed or underemployed, career changers, recent graduates, or anyone looking to start a career in cloud computing. No prior IT or coding experience is required.",
  },
  {
    q: "Do I need prior technical knowledge?",
    a: "No. AWS re/Start is designed for beginners and provides step-by-step training in cloud computing, Linux, networking, security, Python, and AWS services.",
  },
  {
    q: "Is the AWS re/Start program free?",
    a: "Yes. AWS re/Start is offered at no cost to eligible learners through authorized AWS training partners.",
  },
  {
    q: "How long is the program?",
    a: "The program runs for 12 weeks and includes instructor-led training, hands-on labs, career development, and certification preparation.",
  },
  {
    q: "What topics are covered?",
    a: "The curriculum includes Cloud Computing, AWS Services, Linux, Networking, Security, Python Programming, Databases, AWS Architecture, AI & Machine Learning, and professional skills such as resume writing and interview preparation.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Learners who successfully complete the program receive an AWS re/Start Certificate of Completion and are prepared to take the  AWS certified cloud practitioner exam voucheer.",
  },
  {
    q: "Does SFJ provide placement support?",
    a: "Yes. SFJ provides career readiness support, including resume building, mock interviews, employer networking, and job placement assistance through its industry network.",
  },
  {
    q: "What is the mode of training?",
    a: "Training may be delivered in classroom, virtual instructor-led, or hybrid mode, depending on the program batch and location.",
  },
  {
    q: "How do I apply?",
    a: "You can complete the online application form on our website. Eligible candidates will be contacted for the assessment and onboarding process.",
  },
];

const AwsFaqAccordion = () => {
  return (
    <div>
      <h4 className="text-xl font-semibold text-gray-900 mb-4">
        Frequently asked questions
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {awsFaqs.map((faq, index) => (
          <div
            key={faq.q}
            className="border border-gray-200 rounded-lg p-4 h-full"
          >
            <div className="text-base font-semibold text-gray-900">
              {index + 1}. {faq.q}
            </div>
            <p className="text-base text-gray-600 leading-relaxed mt-2">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AwsRestartContent = () => {
  return (
    <div className="space-y-8">
      {/* Hero banner */}
      <div className="relative rounded-2xl overflow-hidden min-h-[520px] md:min-h-[740px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Aws Restart Hero.svg')" }}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative w-full px-5 md:px-12 py-10 md:py-12">
          <div className="max-w-2xl flex flex-col items-start text-left">
            <Image
              src="/AWS restart logo.svg"
              alt="AWS re/Start logo"
              width={220}
              height={110}
              className="h-[3.2rem] md:h-16 w-auto mb-6"
            />
            <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              AWS re/Start Program
            </h3>
            <p className="text-white text-lg sm:text-xl md:text-2xl font-medium mb-4">
              Powering the Future of Cloud Talent
            </p>
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8">
              SFJ Business Solutions delivers AWS re/Start — a free, full-time,
              12-week cloud computing training program for, in official
              partnership with Amazon Web Services. No prior technical
              background required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={APPLY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </a>
              <a
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Book a Call - CSR
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section with image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="mb-4 mt-8">
            <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              AWS re/Start
            </h3>
            <h4 className="text-black-600 text-lg font-medium mt-1">
              Preparing individuals for cloud careers with free to the learner
              cohort-based training
            </h4>
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 mt-6">
              Helping people build careers in the cloud
            </h3>
          </div>
          <p className="text-black-600 text-base sm:text-lg leading-relaxed">
            AWS re/Start is a free, full-time, instructor-led workforce
            development program designed to prepare unemployed and underemployed
            individuals for entry-level careers in cloud computing. No prior
            technology experience is required—just the motivation to learn,
            develop in-demand technical skills, and build a successful long-term
            career in the cloud. The program provides a structured learning
            experience that equips participants with practical knowledge,
            hands-on training, and the confidence needed to succeed in
            today&#39;s rapidly evolving technology industry.
          </p>
          <p className="text-black-600 text-base sm:text-lg leading-relaxed mt-4">
            As an AWS Authorized Training Partner, SFJ Business Solutions
            collaborates with AWS to deliver the AWS re/Start program,
            empowering learners with both technical expertise and workplace
            readiness. The comprehensive curriculum covers cloud computing
            fundamentals, Linux, networking, AI,ML, security, Python, and core
            AWS services through interactive labs and real-world scenarios. In
            addition to technical training, participants develop essential
            professional skills such as communication, teamwork,
            problem-solving, resume building, interview preparation, time
            management, and career planning. This balanced approach ensures
            learners graduate with the technical capabilities, professional
            confidence, and job-ready skills required to launch successful
            careers in cloud computing and thrive in today&#39;s digital
            workforce.
          </p>
        </div>

        <div className="relative w-full h-[26rem] md:h-[540px] rounded-xl overflow-hidden">
          <Image
            src="/Aws feature.webp"
            alt="AWS re/Start program feature"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* About the curriculum */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative w-full h-[26rem] md:h-[540px] rounded-2xl overflow-hidden">
          <Image
            src="/Aws csr 2.webp"
            alt="AWS re/Start curriculum"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div>
          <div className="mb-4">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-900">
              About the curriculum
            </h3>
          </div>
          <p className="text-black-600 text-base sm:text-lg leading-relaxed">
            The program features hands-on labs, real-world scenario-based
            learning, interactive instructor-led classroom sessions, and
            practical projects that help learners build confidence, strengthen
            problem-solving abilities, and develop technical proficiency.
            Through experiential learning and guided practice, participants gain
            valuable exposure to cloud technologies and industry best practices.
            Learners also receive comprehensive preparation for the AWS
            Certified Cloud Practitioner certification, including access to
            high-quality learning resources, practice assessments, mock exams,
            and expert guidance to help them confidently prepare for and succeed
            in the certification exam.
          </p>
          <p className="text-black-600 text-base sm:text-lg leading-relaxed mt-4">
            Upon successful completion of the program, SFJ Business Solutions
            provides dedicated career guidance and ongoing placement support to
            help graduates begin their professional journey in the cloud
            industry. Learners receive assistance with resume development,
            interview preparation, professional networking, and career coaching,
            while also being connected with SFJ&#39;s network of employers and
            industry partners. This end-to-end support enables graduates to
            confidently transition into entry-level cloud and IT roles,
            equipping them with the technical knowledge, workplace skills, and
            industry connections needed to build successful and sustainable
            careers.
          </p>
        </div>
      </div>

      {/* What you'll learn */}
      <div>
        <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          What you&#39;ll learn
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              icon: Layers,
              title: "Cloud Foundations & AWS Services",
              desc: "Build a strong understanding of cloud computing concepts, AWS global infrastructure, core services, pricing models, and cloud best practices.",
            },
            {
              icon: Terminal,
              title: "Linux, Networking & Security",
              desc: "Learn Linux administration, networking fundamentals, Amazon VPC, Identity and Access Management (IAM), and cloud security principles through hands-on labs.",
            },
            {
              icon: Code2,
              title: "Programming & Databases",
              desc: "Develop Python programming skills for automation and work with relational and NoSQL databases using Amazon RDS, Aurora, and DynamoDB.",
            },
            {
              icon: CloudIcon,
              title: "AWS Architecture & Cloud Operations",
              desc: "Gain practical experience with EC2, S3, Auto Scaling, Load Balancing, CloudFormation, monitoring, and designing secure, scalable cloud solutions.",
            },
            {
              icon: Brain,
              title: "AI & Machine Learning",
              desc: "Explore the fundamentals of AI, machine learning, Amazon SageMaker, Amazon Bedrock, and prompt engineering to build AI-powered cloud solutions.",
            },
            {
              icon: Briefcase,
              title: "Career Readiness & Certification",
              desc: "Strengthen your communication, resume writing, interview skills, and prepare for the AWS Certified Cloud Practitioner certification with mock exams and career support.",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.15,
                }}
                className="sweep-card bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <svg className="sweep-svg" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <rect key={i} pathLength={100} />
                  ))}
                </svg>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </div>
                <div className="text-base text-gray-600 leading-relaxed">
                  {item.desc}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Career mapping — hidden for now, will be re-enabled later */}
      {/* <CareerMapping /> */}

      {/* Journey flow */}
      <div className="bg-gray-100 rounded-2xl p-5 sm:p-8 md:p-10">
        <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
          <span className="text-gray-900 text-[13px] font-semibold tracking-wide">
            OUR JOURNEY
          </span>
        </div>

        <h3 className="text-gray-900 text-2xl md:text-3xl font-bold mb-6">
          Your path through AWS re/Start
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-stretch">
          <div className="relative pl-12">
            <div className="absolute left-[13px] top-4 bottom-10 w-px bg-gray-300" />

            {[
              {
                title: "Apply",
                desc: "Register for the AWS re/Start program, no prior tech experience required.",
              },
              {
                title: "Assessment",
                desc: "Complete the screening and counselling process.",
              },
              {
                title: "Orientation",
                desc: "Get introduced to the program structure and expectations.",
              },
              {
                title: "Training",
                desc: "12 weeks of instructor-led learning with hands-on labs and real-world projects.",
              },
              {
                title: "Career readiness",
                desc: "Resume building, interview preparation, and professional skills training.",
              },
              {
                title: "Graduate and get connected",
                desc: "Earn your AWS re/Start certificate, prepare for AWS Certified Cloud Practitioner, and access placement support.",
              },
            ].map((step) => (
              <div key={step.title} className="relative mb-7 last:mb-0">
                {/* concentric ring marker */}
                <div className="absolute -left-12 top-0.5 w-[26px] h-[26px] rounded-full bg-[#0d1b1e] flex items-center justify-center shadow-[0_0_0_1px_rgba(255,255,255,0.35)_inset,0_2px_8px_rgba(13,27,30,0.35)]">
                  <div className="w-[19px] h-[19px] rounded-full border border-white/40 flex items-center justify-center">
                    <div className="w-[9px] h-[9px] rounded-full bg-white" />
                  </div>
                </div>
                <div className="text-gray-900 text-lg font-semibold mb-1">
                  {step.title}
                </div>
                <div className="text-gray-600 text-base leading-relaxed">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="relative w-full h-[320px] sm:h-[480px] md:h-full md:min-h-[560px] md:-mt-[68px] rounded-xl overflow-hidden">
            <Image
              src="/AWS journey.png"
              alt="AWS re/Start journey"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* FAQ block */}
      <div className="border border-gray-200 rounded-2xl p-6">
        <AwsFaqAccordion />
      </div>
    </div>
  );
};

export default AwsRestartContent;
