"use client";
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

import {
  Users,
  Building2,
  MapPin,
  UserCheck,
  GraduationCap,
  Award,
  Factory,
  Banknote,
  Plane,
  Radio,
  Heart,
  Zap,
  ShoppingBag,
  Store,
  Target,
  TrendingUp,
  Globe,
  Star,
} from "lucide-react";

const parseStatNumber = (value: string) => {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: parseInt(match[1], 10), suffix: match[2] };
};

const AnimatedStatCard = ({
  value,
  delay,
}: {
  value: string;
  delay: number;
}) => {
  const { target, suffix } = parseStatNumber(value);
  const [count, setCount] = React.useState(0);
  const hasAnimated = React.useRef(false);

  const startCount = () => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 2200;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={startCount}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="text-2xl font-bold text-gray-900 leading-none">
        {count}
        {suffix}
      </div>
    </motion.div>
  );
};

<svg
  width="56"
  height="56"
  viewBox="0 0 56 56"
  className="absolute inset-0 text-gray-400"
>
  <line x1="28" y1="28" x2="28" y2="4" stroke="currentColor" strokeWidth="1" />
  <line x1="28" y1="28" x2="45" y2="11" stroke="currentColor" strokeWidth="1" />
  <line x1="28" y1="28" x2="52" y2="28" stroke="currentColor" strokeWidth="1" />
  <line x1="28" y1="28" x2="45" y2="45" stroke="currentColor" strokeWidth="1" />
  <line x1="28" y1="28" x2="28" y2="52" stroke="currentColor" strokeWidth="1" />
  <line x1="28" y1="28" x2="11" y2="45" stroke="currentColor" strokeWidth="1" />
  <line x1="28" y1="28" x2="4" y2="28" stroke="currentColor" strokeWidth="1" />
  <line x1="28" y1="28" x2="11" y2="11" stroke="currentColor" strokeWidth="1" />
</svg>;

const FootprintSection = () => {
  const footprintStats = [
    {
      id: 1,
      number: "400+",
      title: "Clients",
      icon: <Users className="w-6 h-6" />,
      description: "Global enterprises trust us",
    },
    {
      id: 2,
      number: "20+",
      title: "Fortune 100 Clients",
      icon: <Building2 className="w-6 h-6" />,
      description: "Industry-leading partnerships",
    },
    {
      id: 3,
      number: "15K+",
      title: "IT Placements",
      icon: <MapPin className="w-6 h-6" />,
      description: "Successful career transitions",
    },
    {
      id: 4,
      number: "200+",
      title: "CXOs Placed",
      icon: <UserCheck className="w-6 h-6" />,
      description: "Executive leadership roles",
    },
    {
      id: 5,
      number: "30K+",
      title: "SAP Professionals",
      icon: <GraduationCap className="w-6 h-6" />,
      description: "SAP-certified experts",
    },
    {
      id: 6,
      number: "10K+",
      title: "Oracle Professionals",
      icon: <Award className="w-6 h-6" />,
      description: "Oracle-certified specialists",
    },
    {
      id: 7,
      number: "5K+",
      title: "Trainers",
      icon: <Target className="w-6 h-6" />,
      description: "Expert instructors worldwide",
    },
    {
      id: 8,
      number: "1K+",
      title: "SMEs",
      icon: <Star className="w-6 h-6" />,
      description: "Subject matter experts",
    },
  ];

  const industries = [
    {
      id: 1,
      title: "Manufacturing",
      icon: <Factory className="w-8 h-8" />,
      description: "Industrial automation & process optimization",
      badge: "Heavy Industry",
    },
    {
      id: 2,
      title: "BFSI",
      icon: <Banknote className="w-8 h-8" />,
      description: "Banking, Financial Services & Insurance",
      badge: "Financial",
    },
    {
      id: 3,
      title: "Travel & Transportation",
      icon: <Plane className="w-8 h-8" />,
      description: "Logistics & transportation solutions",
      badge: "Mobility",
    },
    {
      id: 4,
      title: "Media",
      icon: <Radio className="w-8 h-8" />,
      description: "Digital media & broadcasting platforms",
      badge: "Entertainment",
    },
    {
      id: 5,
      title: "Healthcare",
      icon: <Heart className="w-8 h-8" />,
      description: "Healthcare technology & patient care",
      badge: "Medical",
    },
    {
      id: 6,
      title: "Energy & Utilities",
      icon: <Zap className="w-8 h-8" />,
      description: "Power generation & utility management",
      badge: "Energy",
    },
    {
      id: 7,
      title: "Consumer Goods",
      icon: <ShoppingBag className="w-8 h-8" />,
      description: "Consumer products & brand management",
      badge: "Consumer",
    },
    {
      id: 8,
      title: "Retail",
      icon: <Store className="w-8 h-8" />,
      description: "E-commerce & retail technology",
      badge: "Commerce",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-24 pt-0 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-20 -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100 to-transparent rounded-full blur-3xl opacity-20 translate-x-48 translate-y-48"></div>

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Global Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming businesses globally with our expertise and proven track
            record across industries
          </p>
        </motion.div>

        <Tabs defaultValue="footprint" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="footprint" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Our Footprint
            </TabsTrigger>
            <TabsTrigger value="industries" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Industries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="footprint" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {footprintStats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full bg-gray-100 border-0 shadow-none hover:shadow-sm transition-all duration-300 group">
                    <CardContent className="p-2.5 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-white">
                        {stat.icon}
                      </div>
                      <div>
                        <AnimatedStatCard
                          value={stat.number}
                          delay={index * 0.1}
                        />
                        <div className="text-sm text-gray-500">
                          {stat.title}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="industries" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              {industries.map((industry) => (
                <motion.div
                  key={industry.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full bg-gray-100 border-0 shadow-none hover:shadow-sm transition-all duration-300 group">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-white">
                        {industry.icon}
                      </div>
                      <div>
                        <div className="text-base font-bold text-gray-900">
                          {industry.title}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1">
                          {industry.description}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Companies Served</div>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">25+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-green-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FootprintSection;
