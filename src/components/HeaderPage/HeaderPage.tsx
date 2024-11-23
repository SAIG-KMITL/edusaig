import BackButton from "../Button/BackButton";

export default function HeaderPage({namePage}: {namePage: string}) {
  return (
    <div className="flex justify-start items-center w-full space-x-6">
        <BackButton/>
        <div className="text-2xl font-medium text-slate-100">
            {namePage}
        </div>
    </div>
  );
}