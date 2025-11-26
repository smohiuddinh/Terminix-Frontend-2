import logo from '../assets/ICCD-01.png';
import { Link } from 'react-router-dom';
import { LinkedIn, Facebook, Instagram } from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Platform Overview',
      links: [
        { label: 'About ICCD Talent Gate', href: '/aboutus' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Contact Us', href: '/contactus' },
      ],
    },
    {
      title: 'Quick Access',
      links: [
        { label: 'Login / Register', href: '/login' },
        { label: 'Post a Project', href: '/client/post-project' },
        { label: 'Find Freelancers', href: '/find-talent' },
        { label: 'Become a Freelancer', href: '/freelancer-profile' },
      ],
    },
    {
      title: 'Legal & Policy',
      links: [
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Cookies Policy', href: '/cookies' },
      ],
    },
    {
      title: 'Support & Help',
      links: [
        { label: 'Community Guidelines', href: '/CommunityGuidelines' },
        { label: 'Report an Issue', href: '/report' },
        { label: 'Feedback', href: '/feedback' },
      ],
    },
    {
      title: 'Resources',
      links: [{ label: 'Blog / Insights', href: '/blog' }],
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#1C4C50] via-[#2E7A81] to-[#1C4C50] text-slate-100 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-8">
          {/* Brand / Mission */}
          <div className="md:w-1/3 flex-shrink-0">
            <a href="/" className="inline-flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="ICCD Talent Gate Logo"
                className="h-10 w-10 rounded-md object-cover"
              />
              <span className="text-lg sm:text-xl font-semibold">
                ICCD Talent Gate
              </span>
            </a>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Empowering professionals across the OIC region with global
              freelancing opportunities, connecting talent, institutions, and
              projects through a trusted digital marketplace.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-sm sm:text-base">Follow us</p>
              <div className="flex items-center gap-3">
                <Link
                  to="https://www.facebook.com/Iccden"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Facebook style={{ fontSize: 28 }} />
                </Link>
                <Link
                  to="https://www.linkedin.com/company/islamic-chamber-of-commece-and-development"
                  className="hover:text-blue-600 transition-colors"
                >
                  <LinkedIn style={{ fontSize: 28 }} />
                </Link>
                <Link
                  to="https://x.com/iccia_iccd"
                  className="hover:text-blue-500 transition-colors"
                >
                  <XIcon style={{ fontSize: 28 }} />
                </Link>
                <Link
                  to="https://www.instagram.com/iccd_online"
                  className="hover:text-pink-400 transition-colors"
                >
                  <Instagram style={{ fontSize: 28 }} />
                </Link>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 md:w-2/3">
            {sections.map((sec) => (
              <div key={sec.title}>
                <h4 className="text-sm sm:text-base font-semibold text-slate-200 mb-3">
                  {sec.title}
                </h4>
                <ul className="space-y-2 text-slate-300 text-xs sm:text-sm">
                  {sec.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="inline-block hover:underline"
                        aria-label={link.label}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10">
          <p className="text-xs sm:text-sm text-center text-white/80">
            © {currentYear} ICCD Talent Gate — All rights reserved. A Product
            of Islamic Chamber Of Commerce Powered by{" "}
            <a
              href="https://matzsolutions.com/"
              className="hover:underline underline-offset-2 text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              MATZ Solutions (Pvt.) Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
