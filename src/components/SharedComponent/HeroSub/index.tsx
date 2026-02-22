/** @format */

import React, { FC } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Breadcrumb {
  label: string;
  href: string;
}

interface HeroSubProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
}

const HeroSub: FC<HeroSubProps> = ({ title, description, breadcrumbs }) => {
  return (
    <>
      <section className="text-slate-900 dark:text-white py-2 md:py-2 bg-herosub-bg bg-no-repeat bg-cover lg:mt-40 sm:mt-2">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-slate-900 dark:text-white">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {index > 0 && <Icon icon="solar:arrow-right-linear" className="text-slate-500 dark:text-slate-400" />}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-slate-900 dark:text-white font-medium">{crumb.label}</span>
                    ) : (
                      <Link href={crumb.href} className="hover:text-slate-200 transition-colors">
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl lg:text-56 font-medium mb-3">{title}</h2>

          {description && <p className="text-slate-900 dark:text-white text-base md:text-lg max-w-2xl">{description}</p>}
        </div>
      </section>
    </>
  );
};

export default HeroSub;
