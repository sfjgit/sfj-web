/* eslint-disable @next/next/no-img-element */
const CSRHeroSection = () => {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        {/* Light Gradient Orbs */}
        <div className="absolute top-10 left-1/4 w-48 h-48 bg-gradient-to-r from-orange-200/20 to-amber-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-r from-amber-200/15 to-orange-200/15 rounded-full blur-2xl"></div>

        {/* Minimal Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Content Section */}
          <div className="space-y-5">
            {/* Compact Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-orange-100/60 border border-orange-200/50 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-orange-700">
                Corporate Social Responsibility
              </span>
            </div>

            {/* Compact Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-slate-900">Building</span>
                <span className="block bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                  Sustainable
                </span>
                <span className="block text-slate-900">Communities</span>
              </h1>

              <p className="text-base text-slate-700 leading-relaxed max-w-lg">
                Driving positive change through strategic community development,
                education initiatives, and sustainable growth programs.
              </p>
            </div>

            {/* Compact Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button className="group relative px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <span className="mr-2">Our Impact</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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

              <button className="group px-5 py-2.5 bg-white/60 border border-orange-200/60 text-slate-800 text-sm font-medium rounded-lg backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center">
                  <span className="mr-2">View Programs</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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

            {/* Compact Stats */}
            <div className="flex items-center gap-6 pt-6">
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900">25K+</div>
                <div className="text-xs text-slate-600">Lives Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900">15+</div>
                <div className="text-xs text-slate-600">CSR Programs</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900">5+</div>
                <div className="text-xs text-slate-600">Communities</div>
              </div>
            </div>
          </div>

          {/* Compact Image Section */}
          <div className="relative">
            <div className="relative group">
              {/* Subtle Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>

              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl border border-orange-200/30 backdrop-blur-sm bg-white/20">
                <img
                  src="/app/CSR/csr.png"
                  alt="Corporate Social Responsibility Initiative"
                  className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Light Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-100/20 via-transparent to-transparent"></div>
              </div>

              {/* Minimal Floating Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Light Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-50 to-transparent"></div>
    </section>
  );
};

export default CSRHeroSection;
