'use client';

import Link from 'next/link';

const Footer = () => {
  // Chaturbate affiliate base URL - append query params ?tour=LQps&campaign=QvtQPh
  const affQueryParams = '?tour=LQps&campaign=QvtQPh&track=footer';
  const baseUrl = 'https://chaturbate.com';

  const footerSections = [
    {
      title: 'Free Cams by Age',
      links: [
        { label: 'Teen Cams (18+)', href: `${baseUrl}/teen-cams/${affQueryParams}`, external: true },
        { label: '18 to 21 Cams', href: `${baseUrl}/18to21-cams/${affQueryParams}`, external: true },
        { label: '20 to 30 Cams', href: `${baseUrl}/20to30-cams/${affQueryParams}`, external: true },
        { label: '30 to 50 Cams', href: `${baseUrl}/30to50-cams/${affQueryParams}`, external: true },
        { label: 'Mature Cams (50+)', href: `${baseUrl}/mature-cams/${affQueryParams}`, external: true },
      ],
    },
    {
      title: 'Free Cams by Region',
      links: [
        { label: 'North American Cams', href: `${baseUrl}/north-american-cams/${affQueryParams}`, external: true },
        { label: 'Other Region Cams', href: `${baseUrl}/other-region-cams/${affQueryParams}`, external: true },
        { label: 'Euro Russian Cams', href: `${baseUrl}/euro-russian-cams/${affQueryParams}`, external: true },
        { label: 'Asian Cams', href: `${baseUrl}/asian-cams/${affQueryParams}`, external: true },
        { label: 'South American Cams', href: `${baseUrl}/south-american-cams/${affQueryParams}`, external: true },
      ],
    },
    {
      title: 'Available Private Shows',
      links: [
        { label: '6 Tokens per Minute', href: `${baseUrl}/6-tokens-per-minute-private-cams/${affQueryParams}`, external: true },
        { label: '12-18 Tokens per Minute', href: `${baseUrl}/12-18-tokens-per-minute-private-cams/${affQueryParams}`, external: true },
        { label: '30-42 Tokens per Minute', href: `${baseUrl}/30-42-tokens-per-minute-private-cams/${affQueryParams}`, external: true },
        { label: '60-72 Tokens per Minute', href: `${baseUrl}/60-72-tokens-per-minute-private-cams/${affQueryParams}`, external: true },
        { label: '90+ Tokens per Minute', href: `${baseUrl}/90-tokens-per-minute-private-cams/${affQueryParams}`, external: true },
      ],
    },
    {
      title: 'Free Cams by Status',
      links: [
        { label: 'Private Shows', href: `${baseUrl}/spy-on-cams/${affQueryParams}`, external: true },
        { label: 'New Cams', href: `${baseUrl}/new-cams/${affQueryParams}`, external: true },
        { label: 'Gaming Cams', href: `${baseUrl}/gaming-cams/${affQueryParams}`, external: true },
      ],
    },
    {
      title: 'Free Cams',
      links: [
        { label: 'Featured Cams', href: `${baseUrl}/${affQueryParams}`, external: true },
        { label: 'Female Cams', href: `${baseUrl}/female-cams/${affQueryParams}`, external: true },
        { label: 'Male Cams', href: `${baseUrl}/male-cams/${affQueryParams}`, external: true },
        { label: 'Couple Cams', href: `${baseUrl}/couple-cams/${affQueryParams}`, external: true },
        { label: 'Trans Cams', href: `${baseUrl}/trans-cams/${affQueryParams}`, external: true },
      ],
    },
  ];

  const legalLinks = [
    { label: 'Swag', href: `https://chaturbate.com/swag/${affQueryParams}`, external: true },
    { label: 'Terms & Conditions', href: `https://chaturbate.com/terms/${affQueryParams}`, external: true },
    { label: 'Privacy Policy', href: `https://chaturbate.com/privacy/${affQueryParams}`, external: true },
    { label: 'Support', href: `https://chaturbate.com/support/${affQueryParams}`, external: true },
    { label: 'DMCA / Remove Content', href: `https://chaturbate.com/dmca/${affQueryParams}`, external: true },
    { label: 'Feedback', href: `https://chaturbate.com/feedback/${affQueryParams}`, external: true },
    { label: 'Security Center', href: `https://chaturbate.com/security/${affQueryParams}`, external: true },
    { label: 'Law Enforcement', href: `https://chaturbate.com/law_enforcement/${affQueryParams}`, external: true },
    { label: 'Report Nonconsensual/Abusive Content', href: `https://chaturbate.com/report/${affQueryParams}`, external: true },
    { label: 'Billing', href: `https://chaturbate.com/billing/${affQueryParams}`, external: true },
    { label: 'Disable Account', href: `https://chaturbate.com/disable_account/${affQueryParams}`, external: true },
    { label: 'Apps', href: '/apps', external: false },
    { label: 'Merch Shop', href: '/shop', external: false },
    { label: 'Contest', href: `https://chaturbate.com/contest/${affQueryParams}`, external: true },
    { label: 'Affiliates', href: `https://chaturbate.com/affiliates/${affQueryParams}`, external: true },
    { label: 'Jobs', href: `https://chaturbate.com/jobs/${affQueryParams}`, external: true },
    { label: 'Sitemap', href: `https://chaturbate.com/sitemap/${affQueryParams}`, external: true },
  ];

  const languages = [
    { code: 'de', label: 'Deutsch' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'it', label: 'Italiano' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
    { code: 'pl', label: 'Polski' },
    { code: 'pt', label: 'Português' },
    { code: 'ru', label: 'Русский' },
    { code: 'zh-cn', label: '中文' },
    { code: 'zh-tw', label: '繁體中文' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Main Footer Sections */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-white font-semibold mb-3 text-sm">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-cyan-400 hover:text-cyan-300 text-xs transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-cyan-400 hover:text-cyan-300 text-xs transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            {legalLinks.map((link, idx) => (
              link.external ? (
                <a
                  key={idx}
                  href={link.href}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
            <a href="https://chaturbate.com/accounts/register/?src=broadcast&next=/b/" target="_blank" className="text-red-500 font-bold hover:text-red-400 transition-colors uppercase">Broadcast Live</a>
          </div>
        </div>

        {/* Language Selector */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs">
            {languages.map((lang, idx) => (
              <button
                key={idx}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                onClick={() => console.log(`Switch to ${lang.code}`)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-xs mt-6">
          © {new Date().getFullYear()} NovaCam. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;