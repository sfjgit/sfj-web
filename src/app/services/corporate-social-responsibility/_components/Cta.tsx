import React, { useState } from "react";
import { Globe, Download } from "lucide-react";

const CSRBottomCTA = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Function to handle PDF download
  const handlePDFDownload = async () => {
    setIsDownloading(true);
    try {
      // Method 1: If PDF is in your public folder
      const link = document.createElement("a");
      link.href = "/csr-brochure.pdf"; // Path to your PDF in public folder
      link.download = "CSR-Brochure.pdf"; // Name for downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Method 2: If you need to fetch from a URL or API (uncomment if needed)
      /*
      const response = await fetch('/api/download-csr-pdf'); // Your API endpoint
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CSR-Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      */
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert(
        "Sorry, there was an error downloading the brochure. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="text-center mt-8">
      <div className="bg-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-center mb-4">
          <Globe className="w-8 h-8 mr-3" />
          <h2 className="text-2xl font-bold">
            Join Us in Shaping India&#39;s Tech Future
          </h2>
        </div>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          From schools to rural communities — together, we can unlock
          future-ready opportunities and create measurable impact across India.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Contact Our CSR Team
            </button> */}
          <button
            onClick={handlePDFDownload}
            disabled={isDownloading}
            className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download CSR Brochure
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CSRBottomCTA;
