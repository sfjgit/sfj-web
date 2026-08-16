import React from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

const ContactFooter = () => {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["+91 80 1234 5678", "+91 80 9876 5432"],
      color: "bg-blue-500",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["training@sfj.com", "partnerships@sfj.com"],
      color: "bg-green-500",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      details: ["SFJ Training Center", "Bengaluru, Karnataka, India"],
      color: "bg-purple-500",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      color: "bg-orange-500",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const quickLinks = [
    "Training Programs",
    "Engineering Courses",
    "MBA Specializations",
    "BFSI Programs",
    "Leadership Training",
    "Industry Certifications",
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const services = [
    "Institutional Training",
    "Corporate Training",
    "Online Learning",
    "Skill Assessments",
    "Career Counseling",
    "Placement Support",
  ];

  return (
    <section id="contact" className="bg-gray-900 text-white">
      {/* Contact Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your institution&apos;s training programs?
              Contact us to discuss your requirements
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="bg-gray-800 rounded-xl p-6">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 ${info.color} rounded-lg mb-4 text-white`}
                      >
                        {info.icon}
                      </div>
                      <h4 className="text-lg font-semibold mb-3">
                        {info.title}
                      </h4>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p
                            key={detailIndex}
                            className="text-gray-300 text-sm"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partnership Benefits */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4">Why Partner With Us?</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">Industry-aligned curriculum</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">
                      Global certification programs
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">Placement assistance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">24/7 learning support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="block text-sm font-medium mb-2">
                      Institution Name
                    </div>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Your institution name"
                    />
                  </div>
                  <div>
                    <div className="block text-sm font-medium mb-2">
                      Contact Person
                    </div>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="block text-sm font-medium mb-2">Email</div>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <div className="block text-sm font-medium mb-2">Phone</div>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <div className="block text-sm font-medium mb-2">
                    Program Interest
                  </div>
                  <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                    <option value="">Select a program</option>
                    <option value="engineering">Engineering Programs</option>
                    <option value="mba">MBA Specializations</option>
                    <option value="bfsi">BFSI Training</option>
                    <option value="leadership">Leadership Development</option>
                    <option value="custom">Custom Training Solutions</option>
                  </select>
                </div>

                <div>
                  <div className="block text-sm font-medium mb-2">Message</div>
                  <textarea
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Tell us about your training requirements..."
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center"
                >
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-blue-500">SFJ</span>
                <span className="text-gray-300">Training Solutions</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Transforming education through comprehensive training programs
                designed for the future workforce. Empowering institutions and
                students with industry-relevant skills.
              </p>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 SFJ Training Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </section>
  );
};

export default ContactFooter;
