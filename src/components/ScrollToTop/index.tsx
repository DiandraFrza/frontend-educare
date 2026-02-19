'use client'
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-secondary-800 dark:bg-slate-700 text-white shadow-lg shadow-secondary-900/20 dark:shadow-slate-900/50 transition-all duration-300 ease-in-out hover:bg-primary-600 dark:hover:bg-primary-500 hover:-translate-y-1"
        >
          <Icon icon="solar:arrow-up-linear" className="text-xl" />
        </button>
      )}
    </div>
  );
}
