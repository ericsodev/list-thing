import { useAuth } from "@/components/AuthContext";
import Authenticated from "@/components/Authenticated";
import React from "react";

export default function DashboardPage() {
  return <Authenticated>you can see this if you are logged in</Authenticated>;
}
