import CreateExamUI from "@/app/shared/(ui)/CreateExamUI";

interface CreateFinalExamPageProps {
  params: Promise<{ id: string; moduleId: string }>;
}

export default async function CreateCategoryPage({
  params,
}: CreateFinalExamPageProps) {
  const { id, moduleId } = await params;
  return <CreateExamUI moduleId={moduleId} />;
}
