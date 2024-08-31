import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { adminLinks, links } from "../utils/globals";
import { UserButton } from "./UserButton";
import { SignoutButton } from "./SignoutButton";
import { ChevronLeftCircle, ChevronRightCircle, User2Icon } from "lucide-react";
import { useUser } from "../providers/UserProvider";

export function SideBar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      {open && <div className="fixed h-screen z-30 w-screen bg-black/80"></div>}
      <nav
        className={`w-[300px] z-40 bg-red-950 text-white flex flex-col pb-10 fixed h-screen md:static transition-all duration-300 ${
          open ? "left-0" : "-left-[20rem]"
        }`}
      >
        <div
          className={` ${
            open
              ? "absolute left-[280px] hover:p-2"
              : "hover:left-[320px] absolute left-[305px]"
          } top-[400px] p-1 rounded-full bg-red-950 transition-all md:hidden cursor-pointer`}
          onClick={() => setOpen(!open)}
        >
          {!open ? (
            <ChevronRightCircle className="h-8 w-8" />
          ) : (
            <ChevronLeftCircle className="h-8 w-8" />
          )}
        </div>
        <div className="p-10 flex gap-4">
          <img src="/logo.png" alt="image" className="w-10" />
          <h1 className="text-2xl font-bold">SCMIS</h1>
        </div>
        <div className="flex flex-col">
          {links.map((link, i) => (
            <div className="p-5" key={i}>
              <Link
                to={link.href}
                className={`hover:bg-white hover:text-red-950 transition-all flex gap-3 p-2 rounded-full ${
                  location.pathname == link.href ? "font-bold" : "text-white/80"
                }`}
              >
                <link.icon />
                <p>{link.tag}</p>
              </Link>
            </div>
          ))}
          <div className="p-5">
            <Link
              to={`/dashboard/profile?id=${user.id}`}
              className={`hover:bg-white hover:text-red-950 transition-all flex gap-3 p-2 rounded-full ${
                location.pathname == "/dashboard/profile"
                  ? "font-bold"
                  : "text-white/80"
              }`}
            >
              <User2Icon />
              <p>Profile</p>
            </Link>
          </div>
        </div>
        {user.data.role == "WORKER" && (
          <div className="flex flex-col">
            {adminLinks.map((link, i) => (
              <div className="p-5" key={i}>
                <Link
                  to={link.href}
                  className={`hover:bg-white hover:text-red-950 transition-all flex gap-3 p-2 rounded-full ${
                    location.pathname == link.href
                      ? "font-bold"
                      : "text-white/80"
                  }`}
                >
                  <link.icon />
                  <p>{link.tag}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="mt-auto p-5 flex flex-col gap-4">
          <UserButton />
          <SignoutButton />
        </div>
      </nav>
    </>
  );
}
