"use client";

import { Menu, User, Settings } from "react-feather";
import Breadcrumbs from "./Breadcrumbs";
import HamburgerMenu from "./HamburgerMenu";
import { useState } from "react";

export default function Nav() {
  const [hamburgerOpened, setHamburgerOpened] = useState(false)

  const toggleHamburger = () => {
    setHamburgerOpened(!hamburgerOpened)
  }

  const displayHamburger = (state: boolean) => {
    return state ? <HamburgerMenu/> : null
  } 

  return (
    <header className="pb-8">
      <nav className = "shadow-lg h-12 bg-white">
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
              <li className="lg rounded-md p-1 focus:outline-none z-2" onClick={toggleHamburger}>
                <Menu size={26} />
              </li>
              <li className="lg rounded-md p-1 focus:outline-none">
                  {displayHamburger(hamburgerOpened)}
              </li>
            </ul>
          </div>
        </div>
        <Breadcrumbs/>
      </nav>
    </header>
  );
}
