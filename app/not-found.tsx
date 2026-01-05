import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Unplug, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-background p-4 py-10 text-center">
            <div className="animate-bounce">
                <Unplug className="h-24 w-24 text-muted-foreground" />
            </div>

            <h1 className="mt-8 text-9xl font-bold tracking-tighter text-primary/20">
                404
            </h1>

            <div className="relative -mt-12 space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                    Whoops! Connection Lost
                </h2>
                <p className="text-muted-foreground max-w-[500px] mx-auto">
                    It seems this link was a bit <i>too</i> smol and got lost in the void.
                    We couldn't find the page you're looking for.
                </p>
            </div>

            <div className="mt-8 flex gap-4">
                <Button asChild size="lg" className="group">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                        Return Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}