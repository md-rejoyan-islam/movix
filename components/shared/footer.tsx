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
    },
    {
      icon: <FaInstagram />,
      id: 2,
      name: "Instagram",
    },
    {
      icon: <FaTwitter />,
      id: 3,
      name: "Twitter",
    },
    {
      icon: <FaLinkedin />,
      id: 4,
      name: "Linkedin",
    },
  ];

  return (
    <footer className="py-12 bg-secondary text-white px-4">
      <div className="max-w-[1000px] mx-auto">
        <ul className="flex gap-x-6 gap-y-2 text-[15px] sm:text-base items-center justify-center flex-wrap sm:flex-nowrap">
          <li>Terms Of Use</li>
          <li>Privacy-Policy</li>
          <li>About</li>
          <li>Blog</li>
          <li>FAQ</li>
        </ul>
        <div className="pt-5">
          <p className="opacity-50 text-center text-sm sm:text-base">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus modi
            sed ipsam, fuga voluptas nam cupiditate accusamus placeat atque
            aliquid sunt exercitationem, provident, ipsum dicta consectetur
            enim. Nobis, cum nemo?
          </p>
        </div>
        <div className="socialIcons">
          <ul className="flex gap-x-3 justify-center items-center pt-4">
            {socialIcons.map((icon) => (
              <li className=" " key={icon.id}>
                <Link
                  href="#"
                  title={icon.name}
                  aria-label={icon.name}
                  className="p-2 rounded-full block hover:text-[#4eef86] hover:border-[#4eef86]  border "
                >
                  <span className="icon">{icon.icon}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
