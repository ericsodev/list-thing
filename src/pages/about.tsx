import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";

export default function About(): React.ReactNode {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Head>
        <title>list-thing | about</title>
      </Head>
      <div className="relative">
        <h3 className="text-xl absolute -top-3/4">you&apos;re early</h3>
        <h1 className="text-4xl font-medium">coming soon</h1>
        <Link href="/">
          <Button
            variant={"outline"}
            className="-bottom-[calc(100%+2rem)] absolute inset-x-0 w-full"
          >
            head back home
          </Button>
        </Link>
      </div>
    </div>
  );
}
