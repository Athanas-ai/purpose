import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] p-4">
      <Card className="w-full max-w-md mx-auto bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 text-red-400 items-center">
            <AlertCircle className="h-8 w-8 text-white/60" />
            <h1 className="text-2xl font-bold text-white">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-white/60 font-light">
            The page you are looking for does not exist.
          </p>

          <div className="mt-8">
            <Link href="/" className="text-white hover:text-white/80 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all text-sm uppercase tracking-widest">
              Return to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
