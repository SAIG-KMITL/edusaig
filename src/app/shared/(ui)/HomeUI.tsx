"use client";

import CourseCard from "@/components/Cards/CourseCard";
import { courses } from "@/constants/course";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  Search,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomeUI() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-skyBlue" />,
      title: "Expert-Led Courses",
      description:
        "Learn from industry professionals and experienced instructors",
    },
    {
      icon: <Users className="w-6 h-6 text-skyBlue" />,
      title: "Community Learning",
      description: "Join a community of learners and share knowledge",
    },
    {
      icon: <Target className="w-6 h-6 text-skyBlue" />,
      title: "Personalized Path",
      description: "Custom learning paths tailored to your goals",
    },
  ];

  const categories = [
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Data Science",
    "AI",
  ];

  const stats = [
    { number: "100+", label: "Expert Instructors" },
    { number: "1000+", label: "Active Students" },
    { number: "500+", label: "Courses" },
    {
      number: "4.8",
      label: "Average Rating",
      icon: <Star className="w-5 h-5 text-skyBlue" />,
    },
  ];

  return (
    <section className="min-h-screen">
      <div className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center rounded-full bg-electricViolet/20 px-3 py-1 text-sm mb-6">
                <Sparkles className="w-4 h-4 mr-2 text-white" />
                <span className="text-white">New courses added weekly</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Elevate Your Skills with Edusaig
              </h1>
              <p className="text-xl text-silver mb-8">
                Join thousands of learners acquiring new skills and advancing
                their careers through our comprehensive courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-3 bg-electricViolet text-white rounded-lg font-medium hover:bg-darkMagenta transition-colors">
                  Get Started
                </button>
                <button className="px-8 py-3 bg-royalPurple/30 text-white rounded-lg font-medium hover:bg-royalPurple/50 transition-colors">
                  View Courses
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-electricViolet to-skyBlue rounded-lg blur opacity-30" />
                <div className="relative rounded-lg p-2 bg-darkMagenta/20">
                  <Image
                    src="https://www.gumlet.com/learn/content/images/2022/07/Elearning_platform.jpg"
                    alt="Learning Platform"
                    width={600}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-silver" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-royalPurple rounded-lg bg-steelGray text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-electricViolet"
                placeholder="Search for courses, topics, or skills..."
              />
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-full bg-royalPurple text-white hover:bg-darkMagenta transition-colors"
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Featured Courses
                </h2>
                <p className="text-silver">Explore our most popular courses</p>
              </div>
              <Link
                href="/course"
                className="flex items-center text-skyBlue hover:text-electricViolet transition-colors"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <CourseCard data={course} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose Our Platform
              </h2>
              <p className="text-silver max-w-2xl mx-auto">
                Experience a modern learning environment with features designed
                to help you succeed
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-steelGray p-6 rounded-lg"
                >
                  <div className="w-12 h-12 bg-electricViolet/10 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-silver">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-2">
                    {stat.number}
                    {stat.icon}
                  </div>
                  <p className="text-silver">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-20 rounded-2xl p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-silver mb-8 max-w-2xl mx-auto">
                Join thousands of students already learning on our platform.
                Start your journey today!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-electricViolet rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Get Started Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
