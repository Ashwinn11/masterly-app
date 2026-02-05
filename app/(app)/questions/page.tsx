"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function QuestionsRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const materialId = searchParams?.get("materialId");
    if (materialId) {
      router.replace(`/play?materialId=${materialId}`);
    } else {
      router.replace("/play");
    }
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-info">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="text-xl font-handwritten font-bold">Redirecting to Play Hub...</p>
    </div>
  );
}