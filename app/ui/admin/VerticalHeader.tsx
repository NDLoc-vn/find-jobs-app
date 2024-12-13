'use client';

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";

const VerticalHeader = () => {
  const pathname = usePathname();

  const activeClass = "text-black bg-white";
  const inactiveClass = "text-gray-700 hover:bg-white text-white hover:text-black";
  const buttonClass = "w-full px-4 py-2 font-semibold pl-10";
  const headerClass = "text-lg font-bold text-white px-4 py-2 border-t-1 border-white";
  const containerClass = "w-64 h-screen bg-xanhduong-500 shadow-md flex flex-col justify-between";
  const withIconClass = "flex flex-row justify-start space-x-2";

  const activeIconColor = "#000000";
  const inactiveIconColor = "#FFFFFF";

  return (
    <div className={containerClass}>
      <div>
        <div className={headerClass}>Home</div>
        <div className="py-4 space-y-4">
          <Link href="/admin/dashboard">
            <button
              className={clsx(
                withIconClass,
                buttonClass,
                pathname.endsWith("/admin/dashboard") ? activeClass : inactiveClass
              )}
            >
              <Image
                src="/icon/chart.svg"
                alt="chart"
                width={24}
                height={24}
                style={{
                  filter: pathname.includes("/admin/dashboard") ? `invert(0%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)` : `invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)`
                }}
                className="mr-2"
              />
              Dashboard
            </button>
          </Link>
          <div className={headerClass}>Company</div>
          <Link href="/admin/company-manager">
            <button
              className={clsx(
                withIconClass,
                buttonClass,
                pathname.startsWith("/admin/company-manager") ? activeClass : inactiveClass
              )}
            >
              <Image
                src="/icon/office.svg"
                alt="company manager"
                width={24}
                height={24}
                style={{
                  filter: pathname.includes("/admin/company-manager") ? `invert(0%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)` : `invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)`
                }}
                className="mr-2"
              />
              Company Manager
            </button>
          </Link>
          <Link href="/admin/grant-accounts">
            <button
              className={clsx(
                withIconClass,
                buttonClass,
                pathname.startsWith("/admin/grant-accounts") ? activeClass : inactiveClass
              )}
            >
              <Image
                src="/icon/person.svg"
                alt="grant account"
                width={24}
                height={24}
                style={{
                  filter: pathname.includes("/admin/grant-accounts") ? `invert(0%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)` : `invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)`
                }}
                className="mr-2"
              />
              Grant Accounts
            </button>
          </Link>
          <Link href="/admin/post-manager">
            <button
              className={clsx(
                withIconClass,
                buttonClass,
                pathname.startsWith("/admin/post-manager") ? activeClass : inactiveClass
              )}
            >
              <Image
                src="/icon/post.svg"
                alt="post manager"
                width={24}
                height={24}
                style={{
                  filter: pathname.includes("/admin/post-manager") ? `invert(0%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)` : `invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)`
                }}
                className="mr-2"
              />
              Post Manager
            </button>
          </Link>
          <div className={headerClass}>Candidate</div>

          <Link href="/admin/candidate-manager">
            <button
              className={clsx(
                withIconClass,
                buttonClass,
                pathname.startsWith("/admin/candidate-manager") ? activeClass : inactiveClass
              )}
            >
              <Image
                src="/icon/person.svg"
                alt="grant account"
                width={24}
                height={24}
                style={{
                  filter: pathname.includes("/admin/candidate-manager") ? `invert(0%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)` : `invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)`
                }}
                className="mr-2"
              />
              Candidate Manager
            </button>
          </Link>
        </div>
      </div>
      <div className="px-4 py-2 text-white">
        © 2024 PBL6
      </div>
    </div>
  );
};

export default VerticalHeader;