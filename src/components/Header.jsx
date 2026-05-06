import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/**
 * Header — top navigation bar shared across pages.
 *
 * Props:
 *   title  {string}   — page title displayed in the centre
 *   onBack {function} — called when the back button is clicked
 */
export default function Header({ title, onBack }) { 
  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-green-100 shadow-sm shadow-green-50"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Back button */}
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex items-center gap-1.5 text-green-700 hover:text-green-900 hover:bg-green-50 px-2 py-1.5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Page title */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-bold text-green-900 tracking-tight">
          {title}
        </h1>

        {/* Spacer to balance the back button */}
        <div className="w-16" aria-hidden="true" />
      </div>
    </motion.header>
  );
}
