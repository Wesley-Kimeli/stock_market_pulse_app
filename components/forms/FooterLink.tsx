import Link from "next/link";
import React from "react";

type FooterLinkProps = {
  text: string;
  linkText: string;
  href: string;
};

const FooterLink: React.FC<FooterLinkProps> = ({ text, linkText, href }) => {
  return (
    <div className="text-center pt-4">
      <p className="text-sm text-gray-500">
        {text}{" "}
        <Link href={href} className="footer-link">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default FooterLink;
