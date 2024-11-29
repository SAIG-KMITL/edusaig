import { LoaderCircle } from "lucide-react";

interface LoadingProps {
  status: boolean;
}

export default function LoadingModal({ status }: LoadingProps) {
  return (
    <>
      {status ? (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-70 z-50">
          <div className="flex justify-center items-center mt-[50vh] font-bold">
            <LoaderCircle className="animate-spin-slow h-12 w-12 text-darkMagenta/75"></LoaderCircle>
            <div className="text-2xl ml-3 text-darkMagenta/80">
              Loading . . .
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
