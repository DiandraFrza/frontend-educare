"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TestimonialData } from "@/app/api/data";
import { getImagePrefix } from "@/utils/util";
import { motion } from 'framer-motion';

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        speed: 500,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Icon 
                        key={i}
                        icon={i < rating ? "solar:star-bold" : "solar:star-linear"}
                        className={`text-sm ${i < rating ? 'text-accent-400' : 'text-slate-300 dark:text-slate-600'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <section id="testimonial" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
            
            <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10'>
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 text-sm font-semibold rounded-full shadow-soft dark:shadow-slate-900/50 mb-4 border border-slate-100 dark:border-slate-700">
                        Testimoni
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
                        Apa Kata Alumni Kami?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Dengarkan pengalaman langsung dari peserta yang telah 
                        menyelesaikan program pelatihan di Educare Academy.
                    </p>
                </motion.div>

                <Slider {...settings}>
                    {TestimonialData.map((item, i) => (
                        <div key={i} className="px-3">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-soft dark:shadow-slate-900/50 h-full hover:shadow-soft-lg dark:hover:shadow-slate-900/80 transition-all duration-300"
                            >
                                {/* Quote Icon */}
                                <div className="mb-4">
                                    <Icon icon="solar:quote-up-square-linear" className="text-3xl text-primary-200 dark:text-primary-800" />
                                </div>

                                {/* Rating */}
                                <div className="mb-4">
                                    {renderStars(item.rating)}
                                </div>

                                {/* Comment */}
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-sm">
                                    "{item.comment}"
                                </p>

                                {/* Profile */}
                                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-full flex items-center justify-center overflow-hidden">
                                        <Image 
                                            src={`${getImagePrefix()}${item.imgSrc}`}
                                            alt={item.name}
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-secondary-900 dark:text-slate-200 text-sm">
                                            {item.name}
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {item.profession}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </Slider>

                {/* Custom Dots */}
                <style jsx global>{`
                    .slick-dots {
                        bottom: -50px;
                    }
                    .slick-dots li button:before {
                        font-size: 10px;
                        color: #CBD5E1;
                        opacity: 1;
                    }
                    .dark .slick-dots li button:before {
                        color: #475569;
                    }
                    .slick-dots li.slick-active button:before {
                        color: #3B82F6;
                        opacity: 1;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default Testimonial;
