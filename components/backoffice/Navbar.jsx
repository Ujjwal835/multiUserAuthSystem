"use client";
import { Avatar, Dropdown } from "flowbite-react";
import { History } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const router = useRouter();
  async function handleLogout() {
    console.log("Signout clicked");

    await signOut();
    router.push("/");
  }
  return (
    <div className="flex border-b justify-between border-gray-300 py-2 px-16 bg-white items-center">
      <Link href="#">
        <History />
      </Link>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">Bonnie Green</span>
          <span className="block truncate text-sm font-medium">
            name@flowbite.com
          </span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>
          <Link href="/dashboard/profile">Profile</Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => signOut()}>Sign Out</Dropdown.Item>
      </Dropdown>
    </div>
  );
}
