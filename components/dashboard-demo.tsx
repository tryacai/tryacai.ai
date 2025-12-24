"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Phone, Clock, DollarSign } from "lucide-react";

export const DashboardDemo = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const metrics = [
    {
      label: "Appointments Booked",
      value: "42",
      icon: TrendingUp,
      color: "from-red-500 via-purple-500 to-blue-500",
    },
    {
      label: "Missed Calls Saved",
      value: "18",
      icon: Phone,
      color: "from-red-500 via-purple-500 to-blue-500",
    },
    {
      label: "After-Hours Pickup",
      value: "100%",
      icon: Clock,
      color: "from-red-500 via-purple-500 to-blue-500",
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
    { name: "Yelp", value: 35, color: "from-red-500 to-purple-500" },
    { name: "Angi", value: 40, color: "from-purple-500 to-blue-500" },
    { name: "Google", value: 25, color: "from-blue-500 to-cyan-500" },
  ];

  const jobTypes = [
    { name: "Water Heater", value: 40, color: "#EF4444" },
    { name: "Leak", value: 35, color: "#A855F7" },
    { name: "Install", value: 25, color: "#3B82F6" },
  ];

  return (
    <div className="w-full bg-white dark:bg-neutral-900 rounded-[18px] border-2 border-neutral-300 dark:border-neutral-600 p-4 md:p-6 shadow-xl dark:shadow-2xl shadow-neutral-200/50 dark:shadow-black/30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
            Plumbing LLC
          </h2>
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            Interactive Demo
          </span>
        </div>
        <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
          This is an example. You can create your own custom dashboard with all
          your analytics viewable at any time.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="group"
          >
            <div className="p-3 rounded-lg bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div
                className={`w-8 h-8 rounded-md bg-gradient-to-br ${metric.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200`}
              >
                <metric.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-0.5">
                {metric.value}
              </div>
              <div className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-400">
                {metric.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart - Calls vs Bookings */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-4 rounded-lg bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700"
        >
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
            Calls vs Bookings
          </h3>
          <div className="relative h-36">
            <svg className="w-full h-full" viewBox="0 0 400 150">
              {/* Grid lines */}
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1="40"
                  y1={30 + i * 30}
                  x2="380"
                  y2={30 + i * 30}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-neutral-300 dark:text-neutral-600"
                />
              ))}

              {/* Calls line */}
              <motion.polyline
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                points={callsVsBookings
                  .map(
                    (d, i) =>
                      `${60 + i * 48},${120 - (d.calls / 20) * 90}`
                  )
                  .join(" ")}
                fill="none"
                stroke="#EC4899"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={hoveredPoint !== null && hoveredPoint % 2 === 1 ? 0.3 : 1}
              />

              {/* Bookings line */}
              <motion.polyline
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.7 }}
                points={callsVsBookings
                  .map(
                    (d, i) =>
                      `${60 + i * 48},${120 - (d.bookings / 20) * 90}`
                  )
                  .join(" ")}
                fill="none"
                stroke="#A855F7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={hoveredPoint !== null && hoveredPoint % 2 === 0 ? 0.3 : 1}
              />

              {/* Data points with hover effect */}
              {callsVsBookings.map((d, i) => (
                <g key={i}>
                  <circle
                    cx={60 + i * 48}
                    cy={120 - (d.calls / 20) * 90}
                    r={hoveredPoint === i * 2 ? "6" : "3"}
                    fill="#EC4899"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredPoint(i * 2)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {hoveredPoint === i * 2 && (
                    <g>
                      <rect
                        x={60 + i * 48 - 25}
                        y={120 - (d.calls / 20) * 90 - 25}
                        width="50"
                        height="18"
                        fill="black"
                        opacity="0.8"
                        rx="4"
                      />
                      <text
                        x={60 + i * 48}
                        y={120 - (d.calls / 20) * 90 - 13}
                        textAnchor="middle"
                        className="text-[10px] fill-white font-semibold"
                      >
                        {d.calls} calls
                      </text>
                    </g>
                  )}
                  <circle
                    cx={60 + i * 48}
                    cy={120 - (d.bookings / 20) * 90}
                    r={hoveredPoint === i * 2 + 1 ? "6" : "3"}
                    fill="#A855F7"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredPoint(i * 2 + 1)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {hoveredPoint === i * 2 + 1 && (
                    <g>
                      <rect
                        x={60 + i * 48 - 30}
                        y={120 - (d.bookings / 20) * 90 - 25}
                        width="60"
                        height="18"
                        fill="black"
                        opacity="0.8"
                        rx="4"
                      />
                      <text
                        x={60 + i * 48}
                        y={120 - (d.bookings / 20) * 90 - 13}
                        textAnchor="middle"
                        className="text-[10px] fill-white font-semibold"
                      >
                        {d.bookings} bookings
                      </text>
                    </g>
                  )}
                </g>
              ))}

              {/* Labels */}
              {callsVsBookings.map((d, i) => (
                <text
                  key={i}
                  x={60 + i * 48}
                  y="140"
                  textAnchor="middle"
                  className="text-[9px] fill-neutral-600 dark:fill-neutral-400"
                >
                  {d.day}
                </text>
              ))}
            </svg>
          </div>
          <div className="flex items-center gap-3 mt-3 text-[10px]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
              <span className="text-neutral-600 dark:text-neutral-400">
                Calls
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
              <span className="text-neutral-600 dark:text-neutral-400">
                Bookings
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bar Chart - Lead Sources */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-4 rounded-lg bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700"
        >
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
            Lead Sources
          </h3>
          <div className="relative h-36 flex items-end justify-around gap-3 px-3">
            {leadSources.map((source, index) => (
              <motion.div
                key={source.name}
                initial={{ height: 0 }}
                animate={{ height: `${(source.value / 50) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                className={`group flex-1 rounded-t-md cursor-pointer relative bg-gradient-to-t ${source.color}`}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap">
                  {source.value}%
                </div>
                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                  {source.name}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 pt-3"></div>
        </motion.div>

        {/* Pie Chart - Job Types */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="p-4 rounded-lg bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 lg:col-span-2"
        >
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
            Job Types
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="relative w-36 h-36">
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
                  
                  const radius = hoveredSlice === index ? 85 : 80;
                  const startX =
                    100 + radius * Math.cos((startAngle * Math.PI) / 180);
                  const startY =
                    100 + radius * Math.sin((startAngle * Math.PI) / 180);
                  const endX =
                    100 + radius * Math.cos((endAngle * Math.PI) / 180);
                  const endY =
                    100 + radius * Math.sin((endAngle * Math.PI) / 180);

                  const largeArcFlag = angle > 180 ? 1 : 0;

                  return (
                    <motion.g
                      key={job.name}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredSlice(index)}
                      onMouseLeave={() => setHoveredSlice(null)}
                    >
                      <path
                        d={`M 100 100 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                        fill={job.color}
                        className="transition-all duration-200"
                        opacity={hoveredSlice !== null && hoveredSlice !== index ? 0.5 : 1}
                      />
                    </motion.g>
                  );
                })}
                <circle
                  cx="100"
                  cy="100"
                  r="38"
                  fill="currentColor"
                  className="text-white dark:text-neutral-900"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              {jobTypes.map((job, index) => (
                <motion.div
                  key={job.name}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
                  className="flex items-center gap-2 cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredSlice(index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  style={{
                    transform: hoveredSlice === index ? 'scale(1.05)' : 'scale(1)',
                    fontWeight: hoveredSlice === index ? '700' : '400'
                  }}
                >
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: job.color }}
                  ></div>
                  <span className="text-xs text-neutral-700 dark:text-neutral-300">
                    {job.name}
                  </span>
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white">
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
