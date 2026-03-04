import {
  IconCpu,
  IconHandClick,
  IconUpload,
  IconUsers,
} from '@tabler/icons-react';

const steps = [
  {
    icon: IconUpload,
    step: '01',
    title: 'Upload Your CV',
    description:
      'Drop your PDF or fill in your profile. Our parser extracts skills, experience, and preferences automatically.',
  },
  {
    icon: IconCpu,
    step: '02',
    title: 'AI Structures It',
    description:
      'Machine learning identifies technologies, seniority level, and project highlights from your resume data.',
  },
  {
    icon: IconUsers,
    step: '03',
    title: 'Get Discovered',
    description:
      'Recruiters search structured profiles by skill, location, and experience. You control visibility settings.',
  },
  {
    icon: IconHandClick,
    step: '04',
    title: 'Connect Directly',
    description:
      'No middlemen. Recruiters reach out through the platform, and you choose which conversations to engage in.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-muted/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">
            How It Works
          </p>
          <h2
            className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            From CV to connection{' '}
            <span className="text-primary">in four steps</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex flex-col items-start"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-border lg:block" />
              )}

              <div className="relative mb-5">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-card border border-border shadow-sm">
                  <step.icon className="size-6 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>

              <h3
                className="mb-2 text-lg font-semibold text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
