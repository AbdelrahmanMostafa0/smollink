import { Link2, Link2Icon, LinkIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-dvh flex bg-white gap-7 items-center justify-center text-center flex-col container mx-auto px-4 py-10">
      <LinkIcon className="h-24 w-24" />
      <h1 className="text-4xl font-bold">Smollink</h1>
      <p className="text-lg">Smollink is a URL shortener service that allows you to shorten long URLs and track the number of clicks on your links.</p>
    </div>
  );
}
