"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Sidebar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-[72px] w-full flex-row items-center bg-dark-blue lg:h-full lg:w-[103px] lg:flex-col lg:rounded-r-[20px]">
      <div className="relative h-[72px] w-[72px] lg:h-[103px] lg:w-full">
        <Image src="/Logo.png" alt="" fill className="object-contain" />
      </div>

      <div className="ml-auto flex h-full flex-row items-center lg:mt-auto lg:ml-0 lg:w-full lg:flex-col">
        <button
          onClick={toggleTheme}
          className="flex h-full items-center justify-center px-6 transition-colors hover:text-white text-muted-blue lg:h-auto lg:px-0 lg:pb-8"
        >
          {theme === "light" ? (
            <div className="relative h-5 w-5">
              <Image src="/darkmode.svg" alt="" fill className="cursor-pointer"/>
            </div>
          ) : (
            <div className="relative h-5 w-5">
              <Image src="/lightmode.svg" alt="" fill className="cursor-pointer"/>
            </div>
          )}
        </button>
        <div className="h-full w-[1px] bg-[#494E6E] lg:h-[1px] lg:w-full" />
        <div className="flex h-full items-center justify-center px-6 lg:h-auto lg:py-6 lg:px-0">
          <div className="relative h-8 w-8 overflow-hidden rounded-full lg:h-10 lg:w-10">
            <Image src="/profile.png" alt="Avatar" fill />
          </div>
        </div>
      </div>
    </aside>
  );
}
