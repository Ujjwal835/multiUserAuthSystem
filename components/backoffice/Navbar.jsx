"use client";
import { Avatar, Dropdown } from "flowbite-react";
import { History } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  // getting session in client side
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>loading ...</p>;
  }
  if (status === "authenticated") {
    console.log(session.user);
  }

  const router = useRouter();
  async function handleLogout() {
    console.log("Signout clicked");

    await signOut();
    router.push("/");
  }

  const user = session?.user;
  return (
    <div className="flex border-b justify-between border-gray-300 py-2 px-16 bg-white items-center">
      <Link href="#">
        <History />
      </Link>
      {status === "authenticated" && (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={
                user
                  ? user.image
                  : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              }
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.name}</span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
        </Dropdown>
      )}
    </div>
  );
}
