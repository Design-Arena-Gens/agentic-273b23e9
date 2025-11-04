import { Hero } from "@/components/Hero";
import { AIReceptionist } from "@/components/AIReceptionist";
import { SeatShowcase } from "@/components/SeatShowcase";
import { OperationsDashboard } from "@/components/OperationsDashboard";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 pb-16 pt-12 md:px-8 lg:gap-16">
      <Hero />
      <AIReceptionist />
      <SeatShowcase />
      <OperationsDashboard />
      <FAQ />
      <Footer />
    </main>
  );
}
