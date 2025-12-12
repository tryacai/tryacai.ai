"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Phone, Clock, DollarSign } from "lucide-react";

export const DashboardDemo = () => {
  const metrics = [
    {
      label: "Appointments Booked",
      value: "42",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Missed Calls Saved",
      value: "18",
      icon: Phone,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "After-Hours Pickup",
      value: "100%",
      icon: Clock,
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Revenue Recovered",
      value: "$8,450",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
    },
  ];

  // Sample data for charts
  const callsVsBookings = [
    { day: "Mon", calls: 12, bookings: 8 },
    { day: "Tue", calls: 15, bookings: 11 },
    { day: "Wed", calls: 18, bookings: 14 },
    { day: "Thu", calls: 14, bookings: 10 },
    { day: "Fri", calls: 20, bookings: 16 },
    { day: "Sat", calls: 10, bookings: 7 },
    { day: "Sun", calls: 8, bookings: 6 },
  ];

  const leadSources = [
    { name: "Google", value: 45, color: "#4285F4" },
    { name: "Yelp", value: 30, color: "#D32323" },
    { name: "Direct", value: 25, color: "#10B981" },
  ];

  const jobTypes = [
    { name: "Water Heater", value: 40, color: "#3B82F6" },
    { name: "Leak", value: 35, color: "#8B5CF6" },
    { name: "Install", value: 25, color: "#EC4899" },
  ];

  return (
    <div className="w-full bg-white dark:bg-neutral-900 rounded-[24px] border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Plumbing Brothers
          </h2>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            Interactive Demo
          </span>
        </div>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
          This is an example. You can create your own custom dashboard with all
          your analytics viewable at any time.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="group"
          >
            <div className="p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
              >
                <metric.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-1">
                {metric.value}
              </div>
              <div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                {metric.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Calls vs Bookings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700"
        >
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Calls vs Bookings
          </h3>
          <div className="relative h-48">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="40"
                  y1={40 + i * 30}
                  x2="380"
                  y2={40 + i * 30}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-neutral-300 dark:text-neutral-600"
                />
              ))}

              {/* Calls line (blue) */}
              <motion.polyline
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                points={callsVsBookings
                  .map(
                    (d, i) =>
                      `${60 + i * 48},${160 - (d.calls / 20) * 120}`
                  )
                  .join(" ")}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Bookings line (purple) */}
              <motion.polyline
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.7 }}
                points={callsVsBookings
                  .map(
                    (d, i) =>
                      `${60 + i * 48},${160 - (d.bookings / 20) * 120}`
                  )
                  .join(" ")}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points with hover effect */}
              {callsVsBookings.map((d, i) => (
                <g key={i}>
                  <circle
                    cx={60 + i * 48}
                    cy={160 - (d.calls / 20) * 120}
                    r="4"
                    fill="#3B82F6"
                    className="hover:r-6 transition-all cursor-pointer"
                  >
                    <title>{`${d.day}: ${d.calls} calls`}</title>
                  </circle>
                  <circle
                    cx={60 + i * 48}
                    cy={160 - (d.bookings / 20) * 120}
                    r="4"
                    fill="#8B5CF6"
                    className="hover:r-6 transition-all cursor-pointer"
                  >
                    <title>{`${d.day}: ${d.bookings} bookings`}</title>
                  </circle>
                </g>
              ))}

              {/* Labels */}
              {callsVsBookings.map((d, i) => (
                <text
                  key={i}
                  x={60 + i * 48}
                  y="185"
                  textAnchor="middle"
                  className="text-[10px] fill-neutral-600 dark:fill-neutral-400"
                >
                  {d.day}
                </text>
              ))}
            </svg>
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-neutral-600 dark:text-neutral-400">
                Calls
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-neutral-600 dark:text-neutral-400">
                Bookings
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bar Chart - Lead Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-6 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700"
        >
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Lead Sources
          </h3>
          <div className="relative h-48 flex items-end justify-around gap-4 px-4">
            {leadSources.map((source, index) => (
              <motion.div
                key={source.name}
                initial={{ height: 0 }}
                animate={{ height: `${(source.value / 50) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                className="group flex-1 rounded-t-lg cursor-pointer relative"
                style={{ backgroundColor: source.color }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                  {source.value}%
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                  {source.name}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 pt-4"></div>
        </motion.div>

        {/* Pie Chart - Job Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="p-6 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Job Types
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative w-48 h-48">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 200 200"
              >
                {jobTypes.map((job, index) => {
                  const total = jobTypes.reduce((sum, j) => sum + j.value, 0);
                  const percentage = (job.value / total) * 100;
                  const angle = (percentage / 100) * 360;
                  const prevAngles = jobTypes
                    .slice(0, index)
                    .reduce(
                      (sum, j) => sum + ((j.value / total) * 100 / 100) * 360,
                      0
                    );

                  const startAngle = prevAngles;
                  const endAngle = prevAngles + angle;

                  const startX =
                    100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                  const startY =
                    100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                  const endX =
                    100 + 80 * Math.cos((endAngle * Math.PI) / 180);
                  const endY =
                    100 + 80 * Math.sin((endAngle * Math.PI) / 180);

                  const largeArcFlag = angle > 180 ? 1 : 0;

                  return (
                    <motion.g
                      key={job.name}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className="cursor-pointer"
                    >
                      <path
                        d={`M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                        fill={job.color}
                        className="hover:opacity-80 transition-all"
                      >
                        <title>{`${job.name}: ${job.value}%`}</title>
                      </path>
                    </motion.g>
                  );
                })}
                <circle
                  cx="100"
                  cy="100"
                  r="50"
                  fill="currentColor"
                  className="text-white dark:text-neutral-900"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              {jobTypes.map((job, index) => (
                <motion.div
                  key={job.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: job.color }}
                  ></div>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {job.name}
                  </span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {job.value}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
