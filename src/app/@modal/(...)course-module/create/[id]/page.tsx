"use client";
import CreateCourseModule from "@/components/Modal/CreateCourseModule";
import { Modal } from "@/components/Modal/Modal";
import React from "react";

export default function CreateCourseModuleModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then(({ id }) => setId(id));
  }, [params]);

  return <CreateCourseModule />;
}
