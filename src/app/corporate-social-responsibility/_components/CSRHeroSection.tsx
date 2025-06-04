/* eslint-disable @next/next/no-img-element */
const CSRHeroSection = () => {
  return (
    <section className="relative min-h-screen  overflow-hidden">
      {/* Dynamic Background Elements */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        // onCanPlay={() => setVideoLoaded(true)}
        onError={(e) => console.log("Video error:", e)}
        style={{ zIndex: 1 }}
      >
        <source src="/app/home/hero-section.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400/25 to-blue-600/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-blue-400/60 rounded-full animate-bounce`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Content Section */}
          <div className="space-y-8">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full backdrop-blur-xl">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 animate-pulse shadow-lg shadow-blue-400/50"></div>
              <span className="text-sm font-semibold text-blue-200 tracking-wide">
                🚀 Transforming Lives • Building Tomorrow
              </span>
            </div>

            {/* Hero Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black leading-none">
                <span className="block text-white mb-2">Empowering</span>

                <span className="block text-white">Lives Daily</span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl font-light">
                Revolutionary skilling programs that transform communities and
                build India&#39;s future workforce through cutting-edge
                technology and sustainable development.
              </p>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-3 gap-8 py-8">
              {[
                {
                  value: "50K+",
                  label: "Lives Transformed",
                  color: "from-blue-400 to-cyan-400",
                },
                {
                  value: "200+",
                  label: "Active Programs",
                  color: "from-purple-400 to-pink-400",
                },
                {
                  value: "15+",
                  label: "States Covered",
                  color: "from-cyan-400 to-blue-400",
                },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <span className="mr-2">🎯 Explore Our Impact</span>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
                </div>
              </button>

              <button className="group px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl backdrop-blur-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center">
                  <span className="mr-2">📊 View Programs</span>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
                </div>
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            {/* Floating Elements */}
            <img
              src="/app/CSR/csr.png"
              alt="Corporate Social Responsibility"
              className="w-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-white/60 animate-bounce">
          <span className="text-xs mb-2 tracking-wider">SCROLL TO EXPLORE</span>
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CSRHeroSection;
