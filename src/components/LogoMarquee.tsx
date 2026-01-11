import { motion } from "framer-motion";

interface LogoMarqueeProps {
  logosRow1: string[];
  logosRow2: string[];
}

const LogoMarquee = ({ logosRow1, logosRow2 }: LogoMarqueeProps) => {
  return (
    <div className="w-full overflow-hidden space-y-8" dir="ltr">
      {/* Row 1 - Moving Left */}
      <div className="relative">
        <motion.div
          className="flex gap-12 items-center"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Duplicate logos for seamless loop */}
          {[...logosRow1, ...logosRow1, ...logosRow1].map((logo, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 h-16 w-40 px-4 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo}
                alt={`Client logo ${index + 1}`}
                className="h-12 w-auto max-w-[120px] object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Moving Right */}
      <div className="relative">
        <motion.div
          className="flex gap-12 items-center"
          animate={{
            x: [-1920, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Duplicate logos for seamless loop */}
          {[...logosRow2, ...logosRow2, ...logosRow2].map((logo, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 h-16 w-40 px-4 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo}
                alt={`Client logo ${index + 1}`}
                className="h-12 w-auto max-w-[120px] object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LogoMarquee;
