"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DonationModal from "@/components/DonationModal";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <nav className="navbar bg-base-100 bg-opacity-70 backdrop-blur shadow-none sticky top-0 z-50">
        <div className="navbar-start gap-4">
          <div className="flex-none">
            <label
              htmlFor="drawer-navigation"
              className="btn btn-circle btn-ghost md:ml-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <Image
            src="https://androidide.com/assets/fav-72666172.svg"
            className="w-10 h-full bg-neutral rounded-full"
            width="50"
            height="50"
            alt="logo"
          />
          <span className="text-2xl hidden md:inline">AndroidIDE</span>
        </div>
        <div className="navbar-end gap-4">
          <ThemeToggler />
          {pathname !== "/documentation/getting-started" && (
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/documentation/getting-started`}
              className="btn btn-primary"
            >
              get started
            </Link>
          )}
        </div>
      </nav>
      <DonationModal />
    </>
  );
}

export function DrawerMenu() {
  const drawerManualToggle = () => {
    document.querySelector(".drawer-overlay").click();
  };

  return (
    <div className="drawer-side">
      <label htmlFor="drawer-navigation" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 md:w-64 bg-base-300">
        <li>
          <Link
            href="/"
            onClick={drawerManualToggle}
            className="flex flex-row items-center"
          >
            <i className="material-symbols-rounded notranslate">home</i>Homepage
          </Link>
        </li>
        <li>
          <a
            href="https://learn.androidide.com"
            onClick={drawerManualToggle}
            className="flex flex-row items-center"
          >
            <i className="material-symbols-rounded notranslate">feed</i>Blogs
          </a>
        </li>
        <li>
          <label
            htmlFor="modal-donation"
            onClick={drawerManualToggle}
            className="flex flex-row items-center"
          >
            <i className="material-symbols-rounded notranslate">recommend</i>
            Donate
          </label>
        </li>
        <div className="divider h-[1px]"></div>
        <DocumentationCollapsible drawerManualToggle={drawerManualToggle} />
      </ul>
    </div>
  );
}

function ThemeToggler() {
  const themes = {
    light: "winter",
    dark: "dark",
  };
  const [theme, setTheme] = useState();
  const toggleTheme = () => {
    setTheme((currentTheme) => {
      if (currentTheme === themes.dark) {
        localStorage.setItem("theme", themes.light);
        return themes.light;
      }
      localStorage.setItem("theme", themes.dark);
      return themes.dark;
    });
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, []);
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <label
      onClick={toggleTheme}
      className={`swap swap-rotate btn btn-ghost btn-circle ${
        theme === themes.dark ? "swap-active" : ""
      }`}
    >
      {/* light */}
      <svg
        className="swap-on fill-current w-10 h-10 p-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>

      {/* dark */}
      <svg
        className="swap-off fill-current w-10 h-10 p-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </label>
  );
}

function DocumentationCollapsible({ drawerManualToggle }) {
  const [documentations, setDocumentations] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/documentations`;
        const response = await fetch(url, { next: { revalidate: 0 } });
        const data = await response.json();
        setDocumentations(data);
      } catch {
        console.log("pre-rendering catch");
      }
    };
    getData();
  }, []);
  return (
    <div className="w-full rounded-md flex flex-col items-stretch gap-[1px] overflow-hidden">
      {documentations &&
        documentations.length > 0 &&
        documentations.map(({ title, directPage, to, subItems }, pos) => (
          <DocumentationCollapsibleItem
            key={pos}
            id={pos}
            title={title}
            directPage={directPage}
            to={to}
            subItems={subItems}
            drawerManualToggle={drawerManualToggle}
          />
        ))}
    </div>
  );
}

function DocumentationCollapsibleItem({
  id,
  title,
  directPage,
  to,
  subItems,
  drawerManualToggle,
}) {
  return (
    <div
      className="collapse bg-base-100 active:bg-base-200 md:hover:bg-base-200 transition duration-300"
      tabIndex={id}
    >
      {directPage ? (
        <Link
          href={`/documentation${to}`}
          className="collapse-title"
          onClick={drawerManualToggle}
        >
          {title}
        </Link>
      ) : (
        <>
          <input type="checkbox" />
          <div className="collapse-title">{title}</div>
          <ul className="collapse-content">
            {subItems.map((item, pos) => (
              <DocumentationCollapsibleSubItem
                key={pos}
                parent={title}
                title={item.title}
                to={item.to}
                drawerManualToggle={drawerManualToggle}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function DocumentationCollapsibleSubItem({
  parent,
  title,
  to,
  drawerManualToggle,
}) {
  return (
    <li className="text-xs">
      <Link
        href={`/documentation/${parent
          .toLowerCase()
          .replaceAll(" ", "-")}${to}`}
        onClick={drawerManualToggle}
      >
        {title}
      </Link>
    </li>
  );
}
