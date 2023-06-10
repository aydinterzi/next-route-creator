import Form from "@/components/form";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto ">
      <div className="flex justify-between">
        <h1>Next.js 13 Route Creator</h1>
        <Link href="https://github.com/aydinterzi/next-route-creator">
          GitHub
        </Link>
      </div>
      <Form />
    </main>
  );
}
