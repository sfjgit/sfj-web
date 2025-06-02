"use client";
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const FootprintSection = () => {
  const footprintStats = [
    {
      id: 1,
      number: "50+",
      title: "Clients",
      icon: <Users className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500",
      description: "Global enterprises trust us",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500",
    },
    {
      id: 2,
      number: "20+",
      title: "Fortune 100 Clients",
      icon: <Building2 className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500",
      description: "Industry-leading partnerships",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-500",
    },
    {
      id: 3,
      number: "15K+",
      title: "IT Placements",
      icon: <MapPin className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-500",
      description: "Successful career transitions",
      bgColor: "bg-green-50",
      iconBg: "bg-green-500",
    },
    {
      id: 4,
      number: "200+",
      title: "CXOs Placed",
      icon: <UserCheck className="w-6 h-6" />,
      gradient: "from-orange-500 to-red-500",
      description: "Executive leadership roles",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-500",
    },
    {
      id: 5,
      number: "30K+",
      title: "SAP Professionals",
      icon: <GraduationCap className="w-6 h-6" />,
      gradient: "from-indigo-500 to-blue-500",
      description: "SAP-certified experts",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-500",
    },
    {
      id: 6,
      number: "10K+",
      title: "Oracle Professionals",
      icon: <Award className="w-6 h-6" />,
      gradient: "from-teal-500 to-cyan-500",
      description: "Oracle-certified specialists",
      bgColor: "bg-teal-50",
      iconBg: "bg-teal-500",
    },
    {
      id: 7,
      number: "5K+",
      title: "Trainers",
      icon: <Target className="w-6 h-6" />,
      gradient: "from-rose-500 to-pink-500",
      description: "Expert instructors worldwide",
      bgColor: "bg-rose-50",
      iconBg: "bg-rose-500",
    },
    {
      id: 8,
      number: "1K+",
      title: "SMEs",
      icon: <Star className="w-6 h-6" />,
      gradient: "from-yellow-500 to-orange-500",
      description: "Subject matter experts",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-500",
    },
  ];

  const industries = [
    {
      id: 1,
      title: "Manufacturing",
      icon: <Factory className="w-8 h-8" />,
      description: "Industrial automation & process optimization",
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      iconBg: "bg-gray-600",
      badge: "Heavy Industry",
    },
    {
      id: 2,
      title: "BFSI",
      icon: <Banknote className="w-8 h-8" />,
      description: "Banking, Financial Services & Insurance",
      color: "text-green-700",
      bgColor: "bg-green-50",
      iconBg: "bg-green-600",
      badge: "Financial",
    },
    {
      id: 3,
      title: "Travel & Transportation",
      icon: <Plane className="w-8 h-8" />,
      description: "Logistics & transportation solutions",
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-600",
      badge: "Mobility",
    },
    {
      id: 4,
      title: "Media",
      icon: <Radio className="w-8 h-8" />,
      description: "Digital media & broadcasting platforms",
      color: "text-purple-700",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-600",
      badge: "Entertainment",
    },
    {
      id: 5,
      title: "Healthcare",
      icon: <Heart className="w-8 h-8" />,
      description: "Healthcare technology & patient care",
      color: "text-red-700",
      bgColor: "bg-red-50",
      iconBg: "bg-red-600",
      badge: "Medical",
    },
    {
      id: 6,
      title: "Energy & Utilities",
      icon: <Zap className="w-8 h-8" />,
      description: "Power generation & utility management",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-600",
      badge: "Energy",
    },
    {
      id: 7,
      title: "Consumer Goods",
      icon: <ShoppingBag className="w-8 h-8" />,
      description: "Consumer products & brand management",
      color: "text-pink-700",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-600",
      badge: "Consumer",
    },
    {
      id: 8,
      title: "Retail",
      icon: <Store className="w-8 h-8" />,
      description: "E-commerce & retail technology",
      color: "text-indigo-700",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-600",
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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-20 -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100 to-transparent rounded-full blur-3xl opacity-20 translate-x-48 translate-y-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-600 rounded-full"></div>
            <Badge
              variant="outline"
              className="text-blue-600 border-blue-200 bg-blue-50"
            >
              <Globe className="w-4 h-4 mr-2" />
              Global Presence
            </Badge>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-600 rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Our Global{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming businesses globally with our expertise and proven track
            record across industries
          </p>
        </motion.div>

        {/* Tabs Component */}
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

          {/* Footprint Stats Tab */}
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
                  <Card
                    className={`h-full ${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`p-3 rounded-xl ${stat.iconBg} text-white group-hover:scale-110 transition-transform duration-300`}
                        >
                          {stat.icon}
                        </div>
                        <motion.div
                          className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {stat.number}
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-lg mb-2 text-gray-900">
                        {stat.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {stat.description}
                      </CardDescription>
                      <div className="mt-4 w-full h-2 bg-white/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Industries Tab */}
          <TabsContent value="industries" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`h-full ${industry.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`p-3 rounded-xl ${industry.iconBg} text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                        >
                          {industry.icon}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {industry.badge}
                        </Badge>
                      </div>
                      <CardTitle
                        className={`text-xl ${industry.color} group-hover:scale-105 transition-transform duration-300`}
                      >
                        {industry.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4">
                        {industry.description}
                      </CardDescription>
                      <div className="w-full h-1 bg-white/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${industry.iconBg.replace(
                            "bg-",
                            "bg-gradient-to-r from-"
                          )} to-opacity-70 rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1.2, delay: index * 0.15 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Bottom Stats */}
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
