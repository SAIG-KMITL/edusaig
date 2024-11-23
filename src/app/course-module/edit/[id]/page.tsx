"use client";
import EditCourseModule from "@/components/Modal/EditCourseModule";
import { courses } from "@/constants/course";
import { CourseModuleType } from "@/types/course.type";
import React from "react";

const sample: CourseModuleType = {
  id: "1",
  course: courses[0],
  title: "Course Module",
  description: "Course Module Description",
  orderIndex: 1,
  createdAt: "2021-09-01T00:00:00.000Z",
  updatedAt: "2021-09-01T00:00:00.000Z",
};

export default function EditCourseModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  return <EditCourseModule courseModule={sample} />;
}
