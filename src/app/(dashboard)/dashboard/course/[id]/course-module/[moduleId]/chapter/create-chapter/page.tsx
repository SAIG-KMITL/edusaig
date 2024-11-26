import CreateChapterUI from "@/app/shared/(ui)/CreateChapterUI";

interface CreateChapterPageProps {
  params: Promise<{ id: string, moduleId: string }>;
}

export default async function CreateChapterPage({ params }: CreateChapterPageProps) {
  const { id, moduleId } = await params;
  return <CreateChapterUI courseId={id} moduleId={moduleId}/>;
}
