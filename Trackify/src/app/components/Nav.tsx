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
    <header className="pb-6">
      <nav className = "h-12">
          <div className="mx-auto lg:px-8 flex h-12 items-center justify-between">
            {/* Logo */}
            <h1 className="text-3xl font-semibold tracking-tight">
              <a href="/">Trackify</a>
            </h1>

            {/* Ikoner */}
            <ul className="flex items-center gap-4">
              <li>
                <a href="/#" className="rounded-md p-1">
                  <Settings size={22} />
                </a>
              </li>
              <li>
                <a href="/#" className="rounded-md p-1">
                  <User size={22} />
                </a>
              </li>
              <li>
                <button
                  className="rounded-md p-1"
                  onClick={toggleHamburger}
                  aria-expanded={hamburgerOpened}
                  aria-controls="mobile-menu"
                >
                  <Menu size={26} aria-label="Toggle menu" />
                </button>
              </li>
            </ul>
            <menu
              id="mobile-menu"
              className={`absolute top-0 right-0 p-1 bg-white shadow-lg ${hamburgerOpened ? "block" : "hidden"}`}
            >
              {displayHamburger(hamburgerOpened)}
            </menu>
          </div>
        <Breadcrumbs/>
      </nav>
    </header>
  );
}
