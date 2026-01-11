import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center w-12 h-8 rounded-full bg-muted border border-border overflow-hidden transition-colors hover:bg-muted/80"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <motion.div
        className="absolute inset-0 flex items-center"
        animate={{ x: language === "en" ? 0 : -24 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <span className="w-12 flex items-center justify-center text-xs font-bold text-foreground">
          EN
        </span>
        <span className="w-12 flex items-center justify-center text-xs font-bold text-foreground">
          ع
        </span>
      </motion.div>
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-primary shadow-md"
        animate={{ x: language === "en" ? -10 : 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.button>
  );
};

export default LanguageToggle;
