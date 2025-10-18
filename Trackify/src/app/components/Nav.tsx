"use client";

import { Menu, User, Settings } from "react-feather";
import Breadcrumbs from "./Breadcrumbs";

export default function Nav() {
  return (
    <header>
      <nav >
        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between">
            {/* Logo */}
            <a href="/" className="text-3xl font-semibold tracking-tight">
              Trackify
            </a>

            {/* Ikoner */}
            <ul className="flex items-center gap-4">
              <li>
                <a href="/#" className="rounded-md p-1 focus:outline-none">
                  <Settings size={22} />
                </a>
              </li>
              <li>
                <a href="/#" className="rounded-md p-1 focus:outline-none">
                  <User size={22} />
                </a>
              </li>
              <li className="lg">
                <a href="#" className="rounded-md p-1 focus:outline-none">
                  <Menu size={26} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Breadcrumbs/>
      </nav>

      {/* Svart stripe under nav */}
      <div className="h-[2px] w-full bg-black" />
    </header>
  );
}
