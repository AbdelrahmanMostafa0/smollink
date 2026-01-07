import UrlShortenForm from "@/components/url/UrlShortenForm";
import { LinkIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center bg-white px-4 pt-20 pb-10 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-50 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-blue-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-indigo-200/30 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8 text-center">
        <div className="bg-blue-50 p-4 rounded-full mb-4">
          <LinkIcon className="h-10 w-10 text-blue-600" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
            Make your links <span className="text-blue-600">smol</span>.{" "}
            <br className="hidden sm:block" />
            Expand your reach.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            The simplest way to shorten URLS and track their performance.
            Clean, fast, and reliable links for your big ideas.
          </p>
        </div>

        <div className="w-full max-w-xl mt-4">
          <UrlShortenForm />
        </div>
      </div>
    </main>
  );
}
