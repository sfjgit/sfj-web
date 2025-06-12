"use client";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import {
  Clock,
  Search,
  BookOpen,
  GraduationCap,
  Code,
  Briefcase,
  Cpu,
  Wrench,
} from "lucide-react";

const CourseCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Arts & Science courses (combined from original images)
  const artsAndScienceCourses = [
    // Arts courses
    {
      id: 1,
      stream: "General",
      course: "Corporate Accounting",
      content: "Corporate Accounting",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 2,
      stream: "General",
      course: "Advanced Tally with GST",
      content: "Advanced Tally with GST",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 3,
      stream: "General",
      course: "Income Tax & GST",
      content: "Income Tax & GST",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 4,
      stream: "General",
      course: "Banking & Back Office Operation",
      content: "Banking & Back Office Operation",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 5,
      stream: "General",
      course: "Retail Banking & Wealth Management",
      content: "Retail Banking & Wealth Management",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 6,
      stream: "General",
      course: "NBFC Products & Services",
      content: "NBFC Products & Services",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 7,
      stream: "General",
      course: "Insurance Service & Ops",
      content: "Insurance Service & Ops",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 8,
      stream: "General",
      course: "Claim Analyst",
      content: "Claim Analyst",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 9,
      stream: "B.Com/BBA/BA Economics",
      course: "Tax Planning and Management",
      content: "Tax Planning & Management",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 10,
      stream: "B.Com/BBA/BA Economics",
      course: "Investment Analysis & Portfolio Management",
      content: "Investment Analysis & Portfolio Management",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 11,
      stream: "B.Com/BBA/BA Economics",
      course: "GST Compliance & Taxation",
      content: "GST Compliance & Taxation",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 12,
      stream: "B.Com/BBA/BA Economics",
      course: "Financial Modelling & Valuation",
      content: "Financial Modelling & Valuation",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 13,
      stream: "B.Com/BBA/BA Economics",
      course: "Fintech",
      content: "Fintech",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 14,
      stream: "B.Com/BBA/BA Economics",
      course: "Ecommerce analyst",
      content: "Ecommerce analyst",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 15,
      stream: "B.Com/BBA/BA Economics",
      course: "Operational Logistics",
      content: "Operational Logistics",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 16,
      stream: "B.Com/BBA/BA Economics",
      course: "Supply Chain Management",
      content: "Supply Chain Management",
      duration: 45,
      category: "Commerce",
    },
    {
      id: 17,
      stream: "B.Sc CS/IT/BCA",
      course: "Fundamentals of Web Development",
      content: "Fundamentals of Web Development",
      duration: 45,
      category: "Technology",
    },
    {
      id: 18,
      stream: "B.Sc CS/IT/BCA",
      course: "UI / UX Design",
      content: "UI / UX Design",
      duration: 45,
      category: "Technology",
    },
    {
      id: 19,
      stream: "B.Sc CS/IT/BCA",
      course: "Front End Development",
      content: "Front End Development",
      duration: 45,
      category: "Technology",
    },
    {
      id: 20,
      stream: "B.Sc CS/IT/BCA",
      course: "Java Full Stack Development",
      content: "Java Full Stack Development",
      duration: 45,
      category: "Technology",
    },
    {
      id: 21,
      stream: "B.Sc CS/IT/BCA",
      course: "IT Service Support Service management",
      content: "IT Service Support Service management",
      duration: 45,
      category: "Technology",
    },
    {
      id: 22,
      stream: "B.Sc CS/IT/BCA",
      course: "Data Science with Python",
      content: "Data Science with Python",
      duration: 45,
      category: "Technology",
    },
    {
      id: 23,
      stream: "B.Sc CS/IT/BCA",
      course: "Cloud Computing",
      content: "Google Cloud Computing",
      duration: 45,
      category: "Technology",
    },
    {
      id: 24,
      stream: "B.Sc CS/IT/BCA",
      course: "GEN - AI",
      content: "GEN - AI",
      duration: 45,
      category: "Technology",
    },
    {
      id: 25,
      stream: "B.Sc CS/IT/BCA",
      course: "Cyber Security",
      content: "Cyber Security",
      duration: 45,
      category: "Technology",
    },
    {
      id: 26,
      stream: "B.Sc CS/IT/BCA",
      course: "Software Testing",
      content: "Software Testing",
      duration: 45,
      category: "Technology",
    },
    {
      id: 27,
      stream: "B.Sc CS/IT/BCA",
      course: "Cloud Infrastructure Professional",
      content: "Cloud Infrastructure Professional",
      duration: 45,
      category: "Technology",
    },
    {
      id: 28,
      stream: "B.Sc Statistics/Data Science",
      course: "Data Analytics & Visualization",
      content: "Data Analytics & Visualization",
      duration: 45,
      category: "Technology",
    },
    // Science courses
    {
      id: 29,
      stream: "B.Sc Chemistry",
      course: "Good Manufacturing Practices",
      content: "Good Manufacturing Practices",
      duration: 45,
      category: "Science",
    },
    {
      id: 30,
      stream: "B.Sc Chemistry",
      course: "EV Battery Management",
      content: "EV Battery Management",
      duration: 45,
      category: "Science",
    },
    {
      id: 31,
      stream: "B.Sc Zoology And Allied",
      course: "Medical Coding",
      content: "Medical Coding",
      duration: 45,
      category: "Science",
    },
    {
      id: 32,
      stream: "B.Sc Zoology And Allied",
      course: "Healthcare & Data Management",
      content: "Healthcare & Data Management",
      duration: 45,
      category: "Science",
    },
    {
      id: 33,
      stream: "B.Sc Botany/Food Science/Nutrition",
      course: "Food Safety & Quality Management",
      content: "Food Safety & Quality Management",
      duration: 45,
      category: "Science",
    },
    {
      id: 34,
      stream: "Other Arts",
      course: "Digital Marketing",
      content: "Digital Marketing",
      duration: 45,
      category: "General",
    },
    {
      id: 35,
      stream: "Other Arts",
      course: "Graphic Design",
      content: "Graphic Design",
      duration: 45,
      category: "General",
    },
    {
      id: 36,
      stream: "All Department",
      course: "Employability Skills",
      content: "Employability Skills",
      duration: 45,
      category: "General",
    },
    {
      id: 37,
      stream: "All Department",
      course: "English for Professional Communication",
      content: "English for Professional Communication",
      duration: 45,
      category: "General",
    },
    {
      id: 38,
      stream: "All Department",
      course: "Digital Skills",
      content: "Digital Skills",
      duration: 45,
      category: "General",
    },
  ];

  // Engineering courses
  const engineeringCourses = [
    {
      id: 1,
      domain: "ALL",
      semester: 1,
      course: "English Language Training",
      duration: 45,
    },
    {
      id: 2,
      domain: "CSE/IT TECH & OTHERS",
      semester: 3,
      course: "Digital Skills",
      duration: 45,
    },
    {
      id: 3,
      domain: "CIVIL ECE EEE MECH",
      semester: 3,
      course: "Employability Skills",
      duration: 45,
    },
    {
      id: 4,
      domain: "CSE/IT",
      semester: 5,
      course: "UI & UX Design",
      duration: 45,
    },
    {
      id: 5,
      domain: "CSE/IT",
      semester: 5,
      course: "Cyber Security",
      duration: 45,
    },
    {
      id: 6,
      domain: "CSE/IT",
      semester: 5,
      course: "Cloud Computing & Management",
      duration: 45,
    },
    {
      id: 7,
      domain: "CSE/IT",
      semester: 5,
      course: "Neural Networks and Deep Learning",
      duration: 45,
    },
    {
      id: 8,
      domain: "ECE",
      semester: 5,
      course: "Industrial IoT and Industry 4.0",
      duration: 45,
    },
    {
      id: 9,
      domain: "ECE",
      semester: 5,
      course: "IC Chip Design & Verification (Semiconductor)",
      duration: 45,
    },
    {
      id: 10,
      domain: "CIVIL",
      semester: 5,
      course: "Interior Design Techniques Demystified",
      duration: 45,
    },
    {
      id: 11,
      domain: "MECH & TECH",
      semester: 5,
      course: "Additive Manufacturing",
      duration: 45,
    },
    {
      id: 12,
      domain: "EEE",
      semester: 5,
      course: "EV Technology for Manufacturing (EEE)",
      duration: 45,
    },
    {
      id: 13,
      domain: "CSE/IT",
      semester: 7,
      course: "Kubernetes Level- 2",
      duration: 45,
    },
    { id: 14, domain: "CSE/IT", semester: 7, course: "Devops", duration: 45 },
    {
      id: 15,
      domain: "CSE/IT",
      semester: 7,
      course: "unity (shuffle)",
      duration: 45,
    },
    {
      id: 16,
      domain: "CSE/IT",
      semester: 7,
      course: "Java with Spring Boot (Shuffle)",
      duration: 45,
    },
    {
      id: 17,
      domain: "CSE/IT",
      semester: 7,
      course: "Natural Language Processing (Shuffle)",
      duration: 45,
    },
    {
      id: 18,
      domain: "CSE/IT",
      semester: 7,
      course: "Speech Recognition Techniques (Shuffle)",
      duration: 45,
    },
    {
      id: 19,
      domain: "CSE/IT",
      semester: 7,
      course: "Java with Spring Boot- Level-2",
      duration: 45,
    },
    {
      id: 20,
      domain: "ECE",
      semester: 7,
      course: "AJAX Advanced- Level 2",
      duration: 45,
    },
    {
      id: 21,
      domain: "ECE",
      semester: 7,
      course: "IC Chip Design and Verification- Level- 2",
      duration: 45,
    },
    {
      id: 22,
      domain: "CIVIL",
      semester: 7,
      course: "Sustainable Building Design",
      duration: 45,
    },
    {
      id: 23,
      domain: "EEE",
      semester: 7,
      course: "Sensor Interface skills (Shuffle)",
      duration: 45,
    },
    {
      id: 24,
      domain: "EEE",
      semester: 7,
      course: "PCB Design Using Fusion (Shuffle)",
      duration: 45,
    },
    {
      id: 25,
      domain: "MECH",
      semester: 7,
      course: "Hyper Mesh I (Shuffle)",
      duration: 45,
    },
    {
      id: 26,
      domain: "MECH",
      semester: 7,
      course: "Product Conceptualization and Prototyping (Shuffle)",
      duration: 45,
    },
    {
      id: 27,
      domain: "TECH & OTHERS",
      semester: 7,
      course: "Sustainable Food Product Development- Level 2",
      duration: 45,
    },
  ];

  // Polytechnic courses
  const polytechnicCourses = [
    {
      id: 1,
      semester: 1,
      domain: "All Branches",
      course: "English Essentials",
      duration: 60,
    },
    {
      id: 2,
      semester: 1,
      domain: "All Branches",
      course: "Revit",
      duration: 60,
    },
    {
      id: 3,
      semester: 1,
      domain: "All Branches",
      course: "Drone Surveying",
      duration: 60,
    },
    {
      id: 4,
      semester: 1,
      domain: "Civil and Allied Branches",
      course: "Building Information Modelling",
      duration: 60,
    },
    {
      id: 5,
      semester: 1,
      domain: "Civil and Allied Branches",
      course: "Concrete Construction Work",
      duration: 60,
    },
    {
      id: 6,
      semester: 1,
      domain: "Civil and Allied Branches",
      course: "Digital Construction",
      duration: 60,
    },
    {
      id: 7,
      semester: 1,
      domain: "Civil and Allied Branches",
      course: "Construction Cost Estimation",
      duration: 60,
    },
    {
      id: 8,
      semester: 1,
      domain: "CSE, IT and Allied Branches",
      course: "IT Network Systems Administration",
      duration: 60,
    },
    {
      id: 9,
      semester: 1,
      domain: "CSE, IT and Allied Branches",
      course: "Cloud Computing",
      duration: 60,
    },
    {
      id: 10,
      semester: 1,
      domain: "CSE, IT and Allied Branches",
      course: "Cyber Security",
      duration: 60,
    },
    {
      id: 11,
      semester: 1,
      domain: "CSE, IT and Allied Branches",
      course: "Web Technologies",
      duration: 60,
    },
    {
      id: 12,
      semester: 1,
      domain: "CSE, IT and Allied Branches",
      course: "Information Technology Hardware",
      duration: 60,
    },
    {
      id: 13,
      semester: 1,
      domain: "ECE and Allied Branches",
      course: "IoT & Sensor Integration",
      duration: 60,
    },
    {
      id: 14,
      semester: 1,
      domain: "ECE and Allied Branches",
      course: "PCB Design & Simulation",
      duration: 60,
    },
    {
      id: 15,
      semester: 1,
      domain: "ECE and Allied Branches",
      course: "Embedded Systems",
      duration: 60,
    },
    {
      id: 16,
      semester: 3,
      domain: "ECE and Allied Branches",
      course: "Wordssmith Fundamental of Electronics",
      duration: 60,
    },
    {
      id: 17,
      semester: 3,
      domain: "ECE and Allied Branches",
      course: "Consumer Electronics Troubleshooting",
      duration: 60,
    },
    {
      id: 18,
      semester: 3,
      domain: "EEE and Allied Branches",
      course: "5G and Wireless Communication",
      duration: 60,
    },
    {
      id: 19,
      semester: 3,
      domain: "EEE and Allied Branches",
      course: "Electrical Installation and Electronic Devices",
      duration: 60,
    },
    {
      id: 20,
      semester: 3,
      domain: "EEE and Allied Branches",
      course: "IoT Home automation & PLC Programming Automation",
      duration: 60,
    },
    {
      id: 21,
      semester: 3,
      domain: "EEE and Allied Branches",
      course: "Solar PV Design & Installation",
      duration: 60,
    },
    {
      id: 22,
      semester: 3,
      domain: "EEE and Allied Branches",
      course: "Testing & Electronics",
      duration: 60,
    },
    {
      id: 23,
      semester: 3,
      domain: "Mechanical, Allied and Other Branches",
      course: "Wordssmith Component of CNC Milling",
      duration: 60,
    },
    {
      id: 24,
      semester: 3,
      domain: "Mechanical, Allied and Other Branches",
      course: "Wordssmith Component of CNC Turning",
      duration: 60,
    },
    {
      id: 25,
      semester: 3,
      domain: "Mechanical, Allied and Other Branches",
      course: "Mechatronics",
      duration: 60,
    },
    {
      id: 26,
      semester: 3,
      domain: "Mechanical, Allied and Other Branches",
      course: "Industrial Design Technology",
      duration: 60,
    },
    {
      id: 27,
      semester: 3,
      domain: "Mechanical, Allied and Other Branches",
      course: "Additive Manufacturing",
      duration: 60,
    },
    {
      id: 28,
      semester: 3,
      domain: "Mechanical, Allied and Other Branches",
      course: "Heating, Ventilation, and air conditioning",
      duration: 60,
    },
    {
      id: 29,
      semester: 3,
      domain: "Mechanical, Allied and Other Branches",
      course: "Robotics & Cobotics",
      duration: 60,
    },
  ];

  const getStreamIcon = (
    stream: string | string[],
    type: string | undefined
  ) => {
    if (type === "engineering") return <Cpu className="w-4 h-4" />;
    if (type === "polytechnic") return <Wrench className="w-4 h-4" />;
    if (
      stream.includes("CS") ||
      stream.includes("IT") ||
      stream.includes("BCA") ||
      stream.includes("Technology")
    )
      return <Code className="w-4 h-4" />;
    if (
      stream.includes("Com") ||
      stream.includes("BBA") ||
      stream.includes("Economics") ||
      stream.includes("Commerce")
    )
      return <Briefcase className="w-4 h-4" />;
    if (stream.includes("Sc") || stream.includes("Science"))
      return <BookOpen className="w-4 h-4" />;
    return <GraduationCap className="w-4 h-4" />;
  };

  const getStreamColor = (
    stream: string | string[],
    type: string | undefined
  ) => {
    if (type === "engineering")
      return "bg-orange-100 text-orange-800 border-orange-200";
    if (type === "polytechnic")
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    if (
      stream.includes("CS") ||
      stream.includes("IT") ||
      stream.includes("BCA") ||
      stream.includes("Technology")
    )
      return "bg-blue-100 text-blue-800 border-blue-200";
    if (
      stream.includes("Com") ||
      stream.includes("BBA") ||
      stream.includes("Economics") ||
      stream.includes("Commerce")
    )
      return "bg-green-100 text-green-800 border-green-200";
    if (stream.includes("Sc") || stream.includes("Science"))
      return "bg-purple-100 text-purple-800 border-purple-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const filterCourses = (courses: any[]) => {
    return courses.filter(
      (course: {
        course: string;
        stream: string;
        domain: string;
        content: string;
      }) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          course.course.toLowerCase().includes(searchLower) ||
          (course.stream &&
            course.stream.toLowerCase().includes(searchLower)) ||
          (course.domain &&
            course.domain.toLowerCase().includes(searchLower)) ||
          (course.content && course.content.toLowerCase().includes(searchLower))
        );
      }
    );
  };

  const ArtsAndScienceGrid = ({ courses }: { courses: any[] }) => {
    const filteredCourses = filterCourses(courses);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Arts & Science Courses
          </h2>
          <Badge variant="secondary" className="text-sm">
            {filteredCourses.length} courses
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(
            (course: {
              id: React.Key | null | undefined;
              stream:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              duration:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              course:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              content:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-all duration-300 border-0 shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge
                      className={
                        // @ts-ignore
                        `${getStreamColor(course.stream)} text-xs font-medium`
                      }
                    >
                      <div className="flex items-center gap-1">
                        {
                          // @ts-ignore

                          getStreamIcon(course.stream)
                        }
                        {course.stream}
                      </div>
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {course.duration}h
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {course.course}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 mb-4">
                    {course.content}
                  </CardDescription>
                  {/* <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Enroll Now
                  </Button> */}
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    );
  };

  const EngineeringGrid = ({ courses }: { courses: any[] }) => {
    const filteredCourses = filterCourses(courses);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Engineering Courses
          </h2>
          <Badge variant="secondary" className="text-sm">
            {filteredCourses.length} courses
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(
            (course: {
              id: React.Key | null | undefined;
              domain:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              duration:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              course:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              semester:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-all duration-300 border-0 shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge
                      className={`${getStreamColor(
                        // @ts-ignore
                        course.domain,
                        "engineering"
                      )} text-xs font-medium`}
                    >
                      <div className="flex items-center gap-1">
                        {
                          // @ts-ignore
                          getStreamIcon(course.domain, "engineering")
                        }
                        {course.domain}
                      </div>
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {course.duration}h
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {course.course}
                  </CardTitle>
                  <div className="text-sm text-blue-600 font-medium">
                    Semester {course.semester}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    Enroll Now
                  </Button> */}
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    );
  };

  const PolytechnicGrid = ({ courses }: { courses: any[] }) => {
    const filteredCourses = filterCourses(courses);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Polytechnic Courses
          </h2>
          <Badge variant="secondary" className="text-sm">
            {filteredCourses.length} courses
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(
            (course: {
              id: React.Key | null | undefined;
              domain:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              duration:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              course:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              semester:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-all duration-300 border-0 shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge
                      className={`${getStreamColor(
                        // @ts-ignore
                        course.domain,
                        "polytechnic"
                      )} text-xs font-medium`}
                    >
                      <div className="flex items-center gap-1">
                        {
                          // @ts-ignore
                          getStreamIcon(course.domain, "polytechnic")
                        }
                        {course.domain}
                      </div>
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {course.duration}h
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {course.course}
                  </CardTitle>
                  <div className="text-sm text-indigo-600 font-medium">
                    Semester {course.semester}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Enroll Now
                  </Button> */}
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    );
  };

  const allCourses = [
    ...artsAndScienceCourses,
    ...engineeringCourses,
    ...polytechnicCourses,
  ];
  const totalCourses = allCourses.length;
  const totalHours = allCourses.reduce(
    (sum, course) => sum + course.duration,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Complete Course Catalog
              </h1>
              <p className="text-gray-600 mt-1">
                Academic Year 2025-26 • Professional Development Programs
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {totalCourses}
                </div>
                <div className="text-sm text-gray-500">Total Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {totalHours}
                </div>
                <div className="text-sm text-gray-500">Total Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search courses, streams, or domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="arts-science" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-gray-100">
            <TabsTrigger
              value="arts-science"
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Arts & Science
            </TabsTrigger>
            <TabsTrigger
              value="engineering"
              className="flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              Engineering
            </TabsTrigger>
            <TabsTrigger
              value="polytechnic"
              className="flex items-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              Polytechnic
            </TabsTrigger>
          </TabsList>

          <TabsContent value="arts-science" className="space-y-6">
            <ArtsAndScienceGrid courses={artsAndScienceCourses} />
          </TabsContent>

          <TabsContent value="engineering" className="space-y-6">
            <EngineeringGrid courses={engineeringCourses} />
          </TabsContent>

          <TabsContent value="polytechnic" className="space-y-6">
            <PolytechnicGrid courses={polytechnicCourses} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseCatalog;
