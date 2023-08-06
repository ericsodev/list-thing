import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen grid grid-cols-12 gap-10 sm:gap-4 pt-28 px-12 w-screen">
      <div className="pb-16 md:pb-0 md:col-start-3 col-span-full md:col-span-10 flex flex-col justify-center relative">
        <h1 className="text-5xl sm:text-6xl text-slate-800">
          <strong className="text-green-300 font-semibold">Lists</strong> for anything, everywhere
        </h1>
        <p className="text-xl sm:text-2xl text-slate-700 mt-3">
          A better way for to create and link lists to actionable items.
        </p>
        <Link
          className="absolute bottom-0 left-0 text-lg rounded-md bg-green-200 text-teal-800 self-start px-6 py-2 drop-shadow-sm hover:bg-green-300 transition-colors"
          href="/signup"
        >
          get started
        </Link>
      </div>
      <div className="flex w-full items-center md:col-start-3 col-span-full md:col-span-10">
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(2,250px)] md:grid-cols-[repeat(2,300px)] h-fit basis-auto items-stretch justify-start gap-4">
          <FeatureCard
            feature="collaboration"
            desc="Invite users to collaborate in your list"
          ></FeatureCard>
          <FeatureCard
            feature="integration"
            desc="Integrate with Google and Outlook Calendars"
          ></FeatureCard>
          <FeatureCard
            feature="searching"
            desc="Use natural language and tag-based searching"
          ></FeatureCard>
          <FeatureCard
            feature="take action"
            desc="Link your tasks to actionable items"
          ></FeatureCard>
        </div>
        <div className="relative hidden lg:block basis-1/3 h-80">
          <Image
            src="/notebook.svg"
            alt="notebook"
            width={0}
            height={0}
            className="left-1/2 absolute top-1/2 -translate-y-1/2"
            style={{ width: "100%", height: "auto" }} // optional
          ></Image>
        </div>
      </div>
    </div>
  );
}

type FeatureProps = {
  feature: string;
  desc: string;
};
const FeatureCard = ({ feature, desc }: FeatureProps): React.ReactNode => {
  return (
    <div className="p-6 bg-slate-100 rounded-lg">
      <h1 className="text-xl text-slate-800 font-medium self-start text-center">{feature}</h1>
      <p className="text-slate-700 text-center">{desc}</p>
    </div>
  );
};
