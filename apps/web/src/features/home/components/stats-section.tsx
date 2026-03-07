const stats = [
  { value: '2,500+', label: 'Developer Profiles' },
  { value: '180+', label: 'Companies Hiring' },
  { value: '45+', label: 'Countries Represented' },
  { value: '98%', label: 'Data Privacy Score' },
];

export function StatsSection() {
  return (
    <section className="border-y border-border bg-card py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
