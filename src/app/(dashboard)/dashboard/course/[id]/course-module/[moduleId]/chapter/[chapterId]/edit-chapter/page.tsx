import { fetchChapterAction } from "@/actions/chapterAction";
import EditChapterUI from "@/app/shared/(ui)/EditChapterUI";

interface EditChapterPageProps {
  params: Promise<{ id: string, chapterId: string }>;
}

export default async function EditChapterPage({ params }: EditChapterPageProps) {
  const { id, chapterId } = await params;

  const chapter = await fetchChapterAction(chapterId);

  if(!chapter.data) {
    return null;
  }
  return <EditChapterUI courseId={id} chapter={chapter.data}/>;
}
