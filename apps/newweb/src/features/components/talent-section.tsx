import { IconArrowRight, IconBriefcase, IconMapPin } from '@tabler/icons-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const talents = [
  {
    initials: 'SK',
    name: 'Sarah K.',
    role: 'Senior Frontend Engineer',
    location: 'Berlin, Germany',
    experience: '8 years',
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    color: 'bg-primary/10 text-primary',
  },
  {
    initials: 'JM',
    name: 'James M.',
    role: 'Full Stack Developer',
    location: 'Toronto, Canada',
    experience: '5 years',
    skills: ['Node.js', 'Python', 'AWS', 'PostgreSQL'],
    color: 'bg-chart-2/15 text-chart-2',
  },
  {
    initials: 'LP',
    name: 'Lisa P.',
    role: 'DevOps Engineer',
    location: 'Amsterdam, Netherlands',
    experience: '6 years',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Docker'],
    color: 'bg-chart-4/15 text-chart-4',
  },
  {
    initials: 'RD',
    name: 'Raj D.',
    role: 'Backend Engineer',
    location: 'Bangalore, India',
    experience: '7 years',
    skills: ['Go', 'Rust', 'gRPC', 'Redis'],
    color: 'bg-chart-5/15 text-chart-5',
  },
  {
    initials: 'AN',
    name: 'Anna N.',
    role: 'Mobile Developer',
    location: 'Stockholm, Sweden',
    experience: '4 years',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
    color: 'bg-primary/10 text-primary',
  },
  {
    initials: 'CT',
    name: 'Carlos T.',
    role: 'ML Engineer',
    location: 'Lisbon, Portugal',
    experience: '6 years',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
    color: 'bg-chart-2/15 text-chart-2',
  },
];

export function TalentSection() {
  return (
    <section id="talent" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">
              Latest CVs
            </p>
            <h2
              className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Discover top talent
            </h2>
            <p className="mt-3 text-muted-foreground">
              Professionals ready for new opportunities
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            Browse All Talent
            <IconArrowRight className="size-4" />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {talents.map((talent) => (
            <Link
              key={talent.name}
              href="/cvs/8487ee2f-ccff-4f3f-b66b-e9d6ef3c0efe"
              className="block"
            >
              <Card className="group cursor-pointer border-border/60 transition-all hover:border-primary/30 hover:shadow-md h-full">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex size-11 items-center justify-center rounded-full text-sm font-bold ${talent.color}`}
                    >
                      {talent.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {talent.name}
                      </h3>
                      <p className="truncate text-xs text-muted-foreground">
                        {talent.role}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <IconMapPin className="size-3.5 shrink-0" />
                      <span className="truncate">{talent.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <IconBriefcase className="size-3.5 shrink-0" />
                      <span>{talent.experience} experience</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {talent.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[11px] font-normal px-2 py-0.5"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
