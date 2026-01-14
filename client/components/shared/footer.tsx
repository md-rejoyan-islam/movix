import { Heart } from "lucide-react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const socialIcons = [
    {
      icon: <FaFacebookF />,
      id: 1,
      name: "Facebook",
      href: "#",
      color:
        "hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]",
    },
    {
      icon: <FaInstagram />,
      id: 2,
      name: "Instagram",
      href: "#",
      color:
        "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:border-[#E1306C] hover:shadow-[0_0_20px_rgba(225,48,108,0.4)]",
    },
    {
      icon: <FaTwitter />,
      id: 3,
      name: "Twitter",
      href: "#",
      color:
        "hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:shadow-[0_0_20px_rgba(29,161,242,0.4)]",
    },
    {
      icon: <FaLinkedin />,
      id: 4,
      name: "LinkedIn",
      href: "#",
      color:
        "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]",
    },
  ];

  const footerLinks = [
    { name: "Terms Of Use", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "FAQ", href: "#" },
  ];

  return (
    <footer className="py-12 bg-gradient-to-b from-secondary to-[#020c1b] text-white px-4">
      <div className="max-w-[1000px] mx-auto">
        {/* Footer Links */}
        <ul className="flex gap-x-6 gap-y-2 text-[15px] sm:text-base items-center justify-center flex-wrap sm:flex-nowrap">
          {footerLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-white/70 hover:text-pink transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(218,55,145,0.5)]"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Description */}
        <div className="pt-6">
          <p className="text-white/50 text-center text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Your ultimate destination for discovering movies and TV shows.
            Explore millions of titles, create your personal watchlist, and
            never miss a great story again. Stream, compare, and enjoy the best
            entertainment at your fingertips.
          </p>
        </div>

        {/* Social Icons */}
        <div className="pt-6">
          <ul className="flex gap-x-4 justify-center items-center">
            {socialIcons.map((icon) => (
              <li key={icon.id}>
                <Link
                  href={icon.href}
                  title={icon.name}
                  aria-label={icon.name}
                  className={`w-11 h-11 rounded-full flex items-center justify-center border border-white/20 text-white/70 transition-all duration-300 hover:text-white hover:scale-110 hover:-translate-y-1 ${icon.color}`}
                >
                  <span className="text-lg">{icon.icon}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright & Credit */}
        <div className="pt-8 mt-6 border-t border-white/10">
          <p className="text-white/40 text-sm text-center flex items-center justify-center gap-1 flex-wrap">
            © {new Date().getFullYear()} Movix. Made with
            <Heart className="w-4 h-4 text-pink fill-pink mx-1" />
            by
            <Link
              href="https://github.com/md-rejoyan-islam"
              target="_blank"
              className="text-pink hover:text-orange transition-colors font-medium ml-1"
            >
              Rejoyan Islam
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
