import NotAuthorized from "@/components/backoffice/NotAuthorized";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const role = session?.user?.role;
  if (!(role === "ADMIN" || role === "VENDOR")) {
    return <NotAuthorized />;
  }
  return (
    <div>
      <h2>Welcome to the products</h2>
      <div className="py-6 space-y-3 ">
        {role === "ADMIN" && <button>Delete Product</button>}
        {(role === "ADMIN" || role === "VENDOR") && (
          <button>Edit Product</button>
        )}
      </div>
    </div>
  );
}
