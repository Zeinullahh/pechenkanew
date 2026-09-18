"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/contexts/LanguageContext";

const PolicySidebar = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        
        // Find the currently active section
        const sectionElements = sections.map(section => ({
          id: section.id,
          element: document.getElementById(section.id)
        })).filter(section => section.element);

        const scrollPosition = window.scrollY + 100; // Offset for header

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section.element.offsetTop <= scrollPosition) {
            setActiveSection(section.id);
            break;
          }
        }

        setTimeout(() => setIsScrolling(false), 100);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, isScrolling]);

  const handleSectionClick = (sectionId) => {
    setIsScrolling(true);
    setActiveSection(sectionId);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    
    setTimeout(() => setIsScrolling(false), 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const activeItemVariants = {
    active: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      color: "#ffffff",
      borderLeftColor: "#ffffff",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    inactive: {
      backgroundColor: "transparent",
      color: "#d1d5db",
      borderLeftColor: "transparent",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.aside 
      className="sticky top-40 h-[70vh] w-full md:w-80 md:mr-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <nav className="flex flex-col h-full space-y-1 p-4 bg-black/60 border border-white/15 rounded-2xl backdrop-blur-xl">
        <motion.h3 
          className="text-white font-semibold text-base mb-3 border-b border-white/30 pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {t("policySidebar.tableOfContents", "Table of Contents")}
        </motion.h3>
        
        <div className="flex-1 overflow-y-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1"
          >
            <AnimatePresence mode="wait">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    transition: { duration: 0.15 }
                  }}
                >
                  <motion.a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick(section.id);
                    }}
                    className={`text-sm py-3 px-4 rounded-md block cursor-pointer border-l-4 transition-all duration-200 ${
                      activeSection === section.id 
                        ? 'border-white bg-white/10 text-white font-medium' 
                        : 'border-transparent text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    variants={activeItemVariants}
                    animate={activeSection === section.id ? "active" : "inactive"}
                    whileHover={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      color: "#ffffff",
                      transition: { duration: 0.15 }
                    }}
                  >
                    {section.title}
                  </motion.a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </nav>
    </motion.aside>
  );
};

export default PolicySidebar;
