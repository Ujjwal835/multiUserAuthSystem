import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

// Protecting Pages on Server Side

export default async function page() {
  const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/login");
    }

  const role = session?.user?.role;
  return (
    <div>
      <h2>
        Welcome {session?.user?.name} with role {role}
      </h2>
      <div className="py-6 space-y-3 ">
        {role === "ADMIN" && <p>To be viewed by admin only</p>}
        {(role === "ADMIN" || role === "VENDOR") && (
          <p>To be viewed by vendor and admin </p>
        )}
        <p>can be viewed by all users</p>
      </div>
    </div>
  );
}
