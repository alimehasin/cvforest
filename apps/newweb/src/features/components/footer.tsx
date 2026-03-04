import { IconBrandGithub, IconTree } from '@tabler/icons-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const footerLinks = {
  Platform: ['Upload CV', 'Browse Talent', 'How It Works', 'Pricing'],
  Developers: ['Documentation', 'API Reference', 'Open Source', 'Contribute'],
  Company: ['About', 'Blog', 'Privacy Policy', 'Terms of Service'],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
                <IconTree className="size-5 text-primary-foreground" />
              </div>
              <span
                className="text-lg font-bold tracking-tight text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                CV Forest
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An open-source platform connecting developers with recruiters
              through privacy-first, structured profiles.
            </p>
            <div className="mt-6">
              <Button variant="outline" size="sm" className="gap-2">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandGithub className="size-4" />
                  Star on GitHub
                </Link>
              </Button>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} CV Forest. Open source under the MIT
            License.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
