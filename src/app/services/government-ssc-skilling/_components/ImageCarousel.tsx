"use client";
import Image from "next/image";

export default function ImageCarousel() {
  const images = [
    { src: "/carousel/carousel-1.webp", alt: "Training Program 1" },
    { src: "/carousel/carousel-2.webp", alt: "Training Program 2" },
    { src: "/carousel/carousel-3.webp", alt: "Training Program 3" },
    { src: "/carousel/carousel-4.webp", alt: "Training Program 4" },
    { src: "/carousel/carousel-5.webp", alt: "Training Program 5" },
    { src: "/carousel/carousel-6.webp", alt: "Training Program 6" },
    { src: "/carousel/carousel-7.webp", alt: "Training Program 7" },
    { src: "/carousel/carousel-8.webp", alt: "Training Program 8" },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Events & Program Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Showcasing our impactful events, hackathons, and training programs
            delivered across institutions.
          </p>
        </div>

        {/* Infinite Scroll Carousel */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll w-max">
            {/* First set of images */}
            {images.map((image, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-64 md:w-80 lg:w-80"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {images.map((image, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-64 md:w-80 lg:w-80"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          {/* <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" /> */}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
