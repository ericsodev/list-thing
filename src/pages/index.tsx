import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const features = [
  { feature: "collaboration", desc: "Invite users to collaborate in your list" },
  { feature: "integration", desc: "Integrate with Google and Outlook Calendars" },
  {
    feature: "searching",
    desc: "Use natural language and tag-based searching",
  },
  {
    feature: "take action",
    desc: "Link your tasks to actionable items",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen grid grid-cols-12 gap-10 sm:gap-4 pt-28 px-12 w-screen">
      <div className="pb-16 md:pb-0 md:col-start-3 col-span-full md:col-span-10 flex flex-col justify-center relative">
        <h1 className="text-5xl sm:text-6xl text-slate-800">
          <strong className="text-primary font-semibold">lists</strong> for everything, everywhere
        </h1>
        <p className="text-xl sm:text-2xl text-slate-700 mt-3">
          A better way for to create and link lists to actionable items.
        </p>

        <Link href="/signup">
          <Button className="absolute bottom-0 left-0 self-start">get started</Button>
        </Link>
      </div>
      <div className="flex w-full items-center md:col-start-3 col-span-full md:col-span-10">
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(2,250px)] md:grid-cols-[repeat(2,300px)] h-fit basis-auto items-stretch justify-start gap-4">
          {features.map((feature) => (
            <Card key={feature.feature}>
              <CardHeader>
                <CardTitle className="font-medium">{feature.feature}</CardTitle>
              </CardHeader>
              <CardContent>{feature.desc}</CardContent>
            </Card>
          ))}
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
