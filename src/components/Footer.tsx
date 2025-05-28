import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SFJ</span>
              </div>
              <div>
                <span className="text-lg font-bold">SFJ Business Solutions</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering global talent for the AI-driven future through comprehensive workforce development.
            </p>
            <p className="text-sm text-gray-400">
              Bridging the gap between talent potential and industry demands since 2011
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/solutions" className="text-gray-300 hover:text-white transition-colors">Solutions</Link></li>
              <li><Link href="/impact" className="text-gray-300 hover:text-white transition-colors">Impact</Link></li>
              <li><Link href="/partners" className="text-gray-300 hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Corporate Training</li>
              <li>Skill Development</li>
              <li>Digital Literacy</li>
              <li>Professional Certification</li>
              <li>Workforce Transformation</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Global Offices</h3>
            <div className="space-y-3 text-gray-300">
              <div>
                <p className="font-medium">🇮🇳 India (HQ)</p>
                <p className="text-sm">Global headquarters</p>
              </div>
              <div>
                <p className="font-medium">🇸🇬 Singapore</p>
                <p className="text-sm">Asia-Pacific hub</p>
              </div>
              <div>
                <p className="font-medium">🇦🇪 UAE</p>
                <p className="text-sm">Middle East operations</p>
              </div>
              <div>
                <p className="font-medium">🇺🇸 United States</p>
                <p className="text-sm">North America</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 SFJ Business Solutions Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
