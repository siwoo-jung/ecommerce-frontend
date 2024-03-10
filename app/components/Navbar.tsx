import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import Button from "./Button";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="border-2 border-red-500 flexBetween max-container padding-container relative z-30 py-5 flex">
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-black flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>
      <Image
        src="assets/icons/person_bright.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
      ></Image>
      <div className="lg:flexCenter hidden">
        <Button type="button" title="login" variant="btn_dark_green"></Button>
      </div>
    </nav>
  );
};

export default Navbar;
