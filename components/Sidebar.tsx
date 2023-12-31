"use client"
/* eslint-disable @next/next/no-img-element */
import { useContext, createContext, useState } from "react";
import { ChevronFirst, ChevronLast, ChevronsLeft, ChevronsRight, MoreVertical } from "lucide-react";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar?: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default function Sidebar({ children }: any) {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded((current) => !current);
  };

  return (
    <aside className="absolute left-0 top-0 z-[2] h-full rounded-r-3xl bg-primary">
      <nav className="flex h-full flex-col ">
        <div className="flex justify-end p-3">
          {/* <img
            src="https://www.spud.edu.ph/assets/logo/spud_logo.png"
            className={`contain h-[50px] w-[50px] overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />SAMS  */}
          <button
            onClick={toggleSidebar}
            className="m-1 rounded-xl bg-gray-50 p-2 text-black hover:bg-gray-100"
          >
            {expanded ? <ChevronsLeft /> : <ChevronsRight />}
          </button>
        </div>

        <SidebarContext.Provider value={{ isOpen: expanded }}>
          <ul className="mt-10 flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex border-t p-3">
          {/* Below is the img source for the avatar of user */}
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="h-10 w-10 rounded-md"
          />
          <div
            className={`
              flex items-center justify-between
              overflow-hidden transition-all ${expanded ? "ml-3 w-52" : "w-0"}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-black">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} className='text-black'/>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }: any) {
  const { isOpen }: any = useContext(SidebarContext);

  return (
    <li
      className={`
        group relative my-1 flex cursor-pointer items-center
        rounded-md px-3 py-2
        font-medium transition-colors
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "text-gray-600 hover:bg-indigo-50"
        }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          isOpen ? "ml-3 w-52" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 h-2 w-2 rounded bg-indigo-400 ${
            isOpen ? "" : "top-2"
          }`}
        />
      )}

      {!isOpen && (
        <div
          className={`
            invisible absolute left-full ml-6 -translate-x-3 rounded-md
            bg-indigo-100 px-2 py-1
            text-sm text-indigo-800 opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
