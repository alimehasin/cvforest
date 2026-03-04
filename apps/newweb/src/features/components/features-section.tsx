import {
  IconChartBar,
  IconFileText,
  IconGitBranch,
  IconGlobe,
  IconLock,
  IconShield,
} from '@tabler/icons-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: IconShield,
    title: 'Privacy by Design',
    description:
      'Your data stays yours. Choose what to share, control who sees it, and delete anytime. No hidden tracking.',
  },
  {
    icon: IconFileText,
    title: 'Structured Profiles',
    description:
      'Move beyond PDF chaos. Standardized, searchable profiles make it easy for recruiters to find the right match.',
  },
  {
    icon: IconGitBranch,
    title: 'Open Source',
    description:
      'Fully transparent codebase. Audit the code, contribute features, and help shape the future of talent discovery.',
  },
  {
    icon: IconLock,
    title: 'Data Ownership',
    description:
      'Export your profile anytime in multiple formats. No vendor lock-in, no walled gardens.',
  },
  {
    icon: IconChartBar,
    title: 'Smart Matching',
    description:
      'AI-powered skill extraction creates structured data from your CV, enabling precise recruiter searches.',
  },
  {
    icon: IconGlobe,
    title: 'Global Reach',
    description:
      'Connect with talent and opportunities worldwide. No borders, no boundaries, just skills and potential.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">
            Why CV Forest
          </p>
          <h2
            className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Built for developers,{' '}
            <span className="text-primary">loved by recruiters</span>
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            A platform that respects your privacy while making talent discovery
            efficient and transparent.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/60 bg-card transition-all hover:border-primary/30 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
