import { useAuth } from "@/components/AuthContext";
import { getAuthLayout } from "@/components/Authenticated";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";

export default function Account(): React.ReactNode {
  const { logout } = useAuth();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Head>
        <title>list-thing | account</title>
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
          <Button
            onClick={logout}
            variant={"outline"}
            className="-bottom-[calc(200%+3rem)] absolute inset-x-0 w-full"
          >
            logout
          </Button>
        </Link>
      </div>
    </div>
  );
}

Account.layout = getAuthLayout;
