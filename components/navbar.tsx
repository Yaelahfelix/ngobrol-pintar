"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { cn } from "tailwind-variants";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, useAuth, useClerk } from "@clerk/clerk-react";
import { CircleUserIcon } from "lucide-react";
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const path = usePathname();
  const isHome = path === "/";
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const Router = useRouter();

  console.log("navigasi is login: ", isSignedIn);
  console.log(isHome);

  useEffect(() => {
    if (isHome) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isHome]);
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        // inputWrapper: "bg-white",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      color="primary"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar
      maxWidth="xl"
      isBlurred={(isHome && isScrolled) || !isHome}
      className={clsx(
        "transition-all",
        isHome && !isScrolled ? "absolute bg-transparent" : "",
        isHome && isScrolled ? "fixed top-0" : ""
      )}
    >
      <NavbarContent
        className={clsx(
          isHome && !isScrolled && "!text-white",
          "basis-1/5 sm:basis-full "
        )}
        justify="start"
      >
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p
              className={clsx(
                "font-bold",
                isHome && !isScrolled ? "text-white" : "text-blue-700"
              )}
            >
              Ngobrol Pintar
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start pl-2 border-l border-slate-300">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  // @ts-ignore
                  linkStyles({ color: isScrolled ? "foreground" : "" }),
                  "data-[active=true]:text-primary  data-[active=true]:font-medium text-xs"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
          {!isSignedIn ? (
            <Button
              as={Link}
              color={isHome && !isScrolled ? "default" : "primary"}
              href={"/auth/login"}
            >
              Login
            </Button>
          ) : (
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <CircleUserIcon
                    className={clsx(
                      "w-9",
                      isHome && !isScrolled ? "text-default" : "text-primary"
                    )}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Action event example">
                  <DropdownItem
                    key="acara"
                    onPress={() => Router.push("/tiket")}
                  >
                    Tiket Saya
                  </DropdownItem>

                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    onPress={async () => {
                      await signOut({ redirectUrl: "/auth/login" });
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle
          className={clsx(
            isHome && !isScrolled ? "text-white" : "text-blue-700"
          )}
        />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col ">
          <div className="flex flex-col gap-5">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link color={"foreground"} href={item.href} size="lg">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
          <NavbarMenuItem className="">
            <Divider className="my-5" />
            {!isSignedIn ? (
              <>
                <Button
                  as={Link}
                  color="primary"
                  href={"/auth/login"}
                  className="w-full"
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  color="primary"
                  href={"/auth/register"}
                  className="w-full"
                  variant="light"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Link href="/tiket" color="primary" className="w-full">
                  <Button color="primary" className="w-full">
                    Tiket Saya
                  </Button>
                </Link>
                <Button
                  onPress={async () => {
                    await signOut({ redirectUrl: "/auth/login" });
                  }}
                  color="danger"
                  className="w-full"
                  variant="light"
                >
                  Logout
                </Button>
              </>
            )}
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
