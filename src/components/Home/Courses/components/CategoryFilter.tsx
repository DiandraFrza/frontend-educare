"use client";

import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from 'framer-motion';
import { CourseCategoryInfo } from '@/types/course';

interface CategoryFilterProps {
  categories: CourseCategoryInfo[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onCategoryChange('all')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
          activeCategory === 'all'
            ? 'bg-secondary-900 dark:bg-secondary-800 text-white shadow-soft'
            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
        }`}
      >
        <Icon icon="solar:widget-linear" className="text-base" />
        <span>Semua</span>
      </motion.button>

      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeCategory === category.id
              ? 'bg-secondary-900 dark:bg-secondary-800 text-white shadow-soft'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Icon icon={category.icon} className="text-base" />
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
