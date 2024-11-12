import { CourseType } from "@/types/course.type";
import { formatDuration, formatPrice } from "@/utils/format";
import { BarChart, Clock, DollarSign, User } from "lucide-react";
import React from "react";

interface CourseTableProps {
  courses: CourseType[];
}

export default function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Teacher</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Level</th>
              <th className="p-4 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-12 object-cover rounded lg:flex hidden"
                    />
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {course.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">{course.category}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-400" />
                    <span>{course.teacher}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart size={16} className="text-gray-400" />
                    <span className="capitalize">{course.level}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign size={16} className="text-gray-400" />
                    <span className="font-medium">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
