import { IconArrowRight, IconSearch, IconUpload } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Developer CTA */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/5 blur-2xl" />
            <div className="relative">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <IconUpload className="size-5 text-primary" />
              </div>
              <h3
                className="mb-3 text-2xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                For Developers
              </h3>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Take control of your career narrative. Upload your CV, let AI
                structure your profile, and get discovered by top companies
                worldwide.
              </p>
              <ul className="mb-8 flex flex-col gap-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" />
                  Own and control your data
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" />
                  AI-powered profile structuring
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" />
                  Privacy-first by default
                </li>
              </ul>
              <Button size="lg" className="gap-2">
                <IconUpload className="size-4" />
                Upload Your CV
                <IconArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Recruiter CTA */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary p-8 md:p-10">
            <div className="pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full bg-primary-foreground/10 blur-2xl" />
            <div className="relative">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary-foreground/15">
                <IconSearch className="size-5 text-primary-foreground" />
              </div>
              <h3
                className="mb-3 text-2xl font-bold text-primary-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                For Recruiters
              </h3>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-primary-foreground/80">
                Stop sifting through unstructured resumes. Search standardized
                profiles by skill, experience, and location to find your perfect
                candidate.
              </p>
              <ul className="mb-8 flex flex-col gap-2.5 text-sm text-primary-foreground/80">
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary-foreground" />
                  Structured, searchable profiles
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary-foreground" />
                  Advanced skill-based filters
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary-foreground" />
                  Direct candidate communication
                </li>
              </ul>
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <IconSearch className="size-4" />
                Browse Talent
                <IconArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
