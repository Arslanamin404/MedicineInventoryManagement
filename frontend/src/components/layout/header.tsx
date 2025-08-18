"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className=" flex items-center justify-between h-14 md:h-18 px-4 md:px-6 border-b-2 border-gray-400 bg-gray-50">
      {/* Left - Logo / App Name */}
      <Link href={"/"} className="flex items-center justify-center gap-2">
        <img
          src="https://img.icons8.com/?size=100&id=fer4t8Yu366v&format=png&color=007a55"
          alt="Darul Sihha"
          className="w-7 h-7 md:h-10 md:w-10 border border-emerald-700 rounded-full"
        />
        <span className="font-bold uppercase text-sm md:text-lg  text-emerald-700">
          Darul Sihha Pharmacy
        </span>
      </Link>

      {/* Right - Actions */}
      <div className="hidden md:block text-right sm:text-right  text-sm leading-tight max-w-xs break-words">
        <p className="font-medium text-foreground">
          📞 +91 77808 80146, +91 60053 36894
        </p>
        <p className="text-muted-foreground">
          Near New Sectreaite Road, opposite to CRPF camp, Shaheed Gunj,
          Srinagar, 190001
        </p>
      </div>
    </header>
  );
}
