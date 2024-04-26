"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const UserButton = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(openMenu ? menuRef.current.scrollHeight : 0);
    }
  }, [openMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      openMenu &&
      menuHeight !== 0
    ) {
      handleCloseMenu();
    }
  };

  const handleCloseMenu = () => {
    setMenuHeight(0);
    setTimeout(() => {
      setOpenMenu(false);
    }, 100);
  };

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  return (
    <div className="flex h-full items-center justify-center gap-[5px]">
      <div className="flex flex-row items-center justify-between">
        <span className="mr-3 font-semibold text-lg">Hola Santiago!</span>
        <div className="relative">
          <FaUserCircle
            size={45}
            color="#011638"
            className="cursor-pointer"
            onClick={
              openMenu ? () => handleCloseMenu() : () => handleOpenMenu()
            }
          />

          <div
            ref={menuRef}
            className={`user-drop-menu ${
              openMenu ? "opacity-100" : "opacity-0"
            }`}
            style={{ height: `${menuHeight}px` }}
          >
            <div className="flex flex-col rounded-b-[8px] rounded-tl-[8px] border border-[#011638] bg-[#DFF8EB] font-semibold text-[#011638]">
              <Link
                href="/budget"
                className="cursor-pointer whitespace-nowrap  px-[10px] py-[7px] transition duration-300 hover:bg-[#bfd4c9]"
                onClick={handleCloseMenu}
              >
                <span>Cotizaciones</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserButton;
