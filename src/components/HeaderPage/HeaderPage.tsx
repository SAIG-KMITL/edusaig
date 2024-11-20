import BackButton from "../Button/BackButton";

export default function HeaderPage({namePage}: {namePage: string}) {
  return (
    <div className="flex justify-start items-center space-x-6">
        <BackButton/>
        <div className="text-2xl font-medium text-black">
            {namePage}
        </div>
    </div>
  );
}