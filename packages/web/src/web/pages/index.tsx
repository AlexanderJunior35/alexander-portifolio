import { useEffect, useState } from "react";
import { copy, links, skills, type Lang } from "../lib/content";

const sectionIds = ["sobre", "habilidades", "experiencia", "projetos", "formacao", "contato"] as const;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SectionHeader({ prompt, title }: { prompt: string; title: string }) {
  return (
    <div data-reveal className="reveal mb-12">
      <p className="mono text-sm text-[var(--accent)]">
        <span className="text-[var(--fg-muted)]">visitor@alexander:~$ </span>
        {prompt}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="mono inline-block rounded border border-[color-mix(in_oklab,var(--accent)_40%,transparent)] px-2.5 py-1 text-xs text-[var(--accent)]">
      {children}
    </span>
  );
}

function Index() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = copy[lang];
  useReveal();

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = lang === "pt"
      ? "Alexander Junior — Engenheiro de Software Júnior"
      : "Alexander Junior — Junior Software Engineer";
  }, [lang]);

  const navItems = [
    { id: "sobre", label: t.navAbout },
    { id: "habilidades", label: t.navSkills },
    { id: "experiencia", label: t.navExperience },
    { id: "projetos", label: t.navProjects },
    { id: "formacao", label: t.navEducation },
    { id: "contato", label: t.navContact },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="pointer-events-none fixed inset-0 grid-bg" aria-hidden />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_85%,transparent)] backdrop-blur">
        <nav className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="mono text-sm font-medium text-[var(--accent)]">
            ~/alexander
          </a>
          <ul className="hidden gap-6 md:flex">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="mono text-xs uppercase tracking-wider text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)]">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mono flex overflow-hidden rounded border border-[var(--border)] text-xs">
            {(["pt", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 uppercase transition-colors ${lang === l ? "bg-[var(--accent)] text-[#06120c]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-[1080px] px-5">
        {/* HERO */}
        <section className="grid min-h-[calc(100vh-72px)] items-center gap-12 py-20 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div data-reveal className="reveal" style={{ animationDelay: "0ms" }}>
              <span className="mono inline-flex items-center gap-2 text-xs text-[var(--fg-muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] pulse" />
                {t.available}
              </span>
            </div>
            <h1 data-reveal className="reveal mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl" style={{ animationDelay: "80ms" }}>
              <span className="text-[var(--fg-muted)] text-2xl font-medium md:text-3xl">{t.heroIntro}</span>
              <br />
              Alexander Junior
            </h1>
            <p data-reveal className="reveal mt-4 mono text-base text-[var(--accent)]" style={{ animationDelay: "160ms" }}>
              &gt; {t.role}
            </p>
            <p data-reveal className="reveal mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-muted)]" style={{ animationDelay: "240ms" }}>
              {t.heroText}
            </p>
            <div data-reveal className="reveal mt-10 flex flex-wrap gap-3" style={{ animationDelay: "320ms" }}>
              <a href={`mailto:${links.email}`} className="btn-primary">
                {t.ctaContact}
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" className="btn-ghost">
                {t.ctaGithub}
              </a>
            </div>
          </div>

          <div data-reveal className="reveal relative mx-auto w-full max-w-[340px]" style={{ animationDelay: "200ms" }}>
            <div className="absolute -inset-3 translate-x-3 translate-y-3 rounded-2xl border border-[var(--accent)] opacity-40" aria-hidden />
            <img
              src="/images/alexander.jpg"
              alt="Alexander Junior"
              className="relative aspect-square w-full rounded-2xl border border-[var(--border)] object-cover grayscale-[20%]"
            />
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="scroll-mt-24 py-24">
          <SectionHeader prompt={t.aboutPrompt} title={t.aboutTitle} />
          <div data-reveal className="reveal grid gap-6 md:grid-cols-3">
            <p className="leading-relaxed text-[var(--fg-muted)] md:col-span-3 md:text-lg">{t.about1}</p>
            <p className="leading-relaxed text-[var(--fg-muted)] md:col-span-3 md:text-lg">{t.about2}</p>
            <p className="leading-relaxed text-[var(--fg)] md:col-span-3 md:text-lg">{t.about3}</p>
          </div>
        </section>

        {/* HABILIDADES */}
        <section id="habilidades" className="scroll-mt-24 py-24">
          <SectionHeader prompt={t.skillsPrompt} title={t.skillsTitle} />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: t.skillGroupDev, items: skills.dev },
              { title: t.skillGroupInfra, items: skills.infra },
              { title: t.skillGroupTools, items: skills.tools },
            ].map((g, i) => (
              <div key={g.title} data-reveal className="reveal card" style={{ animationDelay: `${i * 100}ms` }}>
                <h3 className="mono mb-4 text-xs uppercase tracking-widest text-[var(--fg-muted)]">{g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div data-reveal className="reveal mt-8 card">
            <h3 className="mono mb-3 text-xs uppercase tracking-widest text-[var(--fg-muted)]">{t.langsTitle}</h3>
            <div className="flex flex-wrap gap-6 text-[var(--fg)]">
              <span>{t.langPt}</span>
              <span>{t.langEn}</span>
            </div>
          </div>
        </section>

        {/* EXPERIENCIA */}
        <section id="experiencia" className="scroll-mt-24 py-24">
          <SectionHeader prompt={t.expPrompt} title={t.expTitle} />
          <ol className="relative space-y-10 border-l border-[var(--border)] pl-8">
            {[
              { role: t.exp1Role, company: t.exp1Company, period: t.exp1Period, desc: t.exp1Desc },
              { role: t.exp2Role, company: t.exp2Company, period: t.exp2Period, desc: t.exp2Desc },
              { role: t.exp3Role, company: lang === "pt" ? "Autônomo" : "Self-employed", period: t.exp3Period, desc: t.exp3Desc },
            ].map((e, i) => (
              <li key={e.role} data-reveal className="reveal relative" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold">{e.role}</h3>
                  <span className="mono text-xs text-[var(--fg-muted)]">{e.period}</span>
                </div>
                <p className="mono mt-1 text-sm text-[var(--accent)]">{e.company}</p>
                <p className="mt-3 max-w-3xl leading-relaxed text-[var(--fg-muted)]">{e.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* PROJETOS */}
        <section id="projetos" className="scroll-mt-24 py-24">
          <SectionHeader prompt={t.projectsPrompt} title={t.projectsTitle} />
          <p data-reveal className="reveal mb-8 max-w-2xl text-[var(--fg-muted)]">{t.projectsNote}</p>
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((n) => (
              <article key={n} data-reveal className="reveal card flex flex-col">
                <div className="mono mb-4 flex aspect-video items-center justify-center rounded-lg border border-dashed border-[var(--border)] text-sm text-[var(--fg-muted)]">
                  {"// projeto_" + n}
                </div>
                <h3 className="text-lg font-semibold">{t.projectComingSoon}</h3>
                <p className="mt-2 text-sm text-[var(--fg-muted)]">
                  {lang === "pt" ? "Descrição do projeto, stack e link do repositório entram aqui." : "Project description, stack and repository link go here."}
                </p>
                <div className="mt-5 flex gap-2">
                  <Tag>React</Tag>
                  <Tag>JavaScript</Tag>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FORMACAO */}
        <section id="formacao" className="scroll-mt-24 py-24">
          <SectionHeader prompt={t.educationPrompt} title={t.educationTitle} />
          <div className="grid gap-6 md:grid-cols-2">
            <div data-reveal className="reveal card">
              <h3 className="text-lg font-semibold">{t.edu1}</h3>
              <p className="mono mt-1 text-sm text-[var(--fg-muted)]">{t.edu1Where}</p>
              <h4 className="mono mt-4 text-xs uppercase tracking-widest text-[var(--fg-muted)]">{t.eduHighlightsLabel}</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {t.eduHighlights.map((h) => (
                  <Tag key={h}>{h}</Tag>
                ))}
              </div>
              <h3 className="mt-6 text-lg font-semibold">{t.edu2}</h3>
              <p className="mono mt-1 text-sm text-[var(--fg-muted)]">{t.edu2Where}</p>
            </div>
            <div data-reveal className="reveal card">
              <h3 className="mono mb-4 text-xs uppercase tracking-widest text-[var(--fg-muted)]">{t.certsTitle}</h3>
              <ul className="space-y-2">
                {t.certs.map((c) => (
                  <li key={c} className="flex gap-3 text-[var(--fg)]">
                    <span className="mono text-[var(--accent)]">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="scroll-mt-24 py-24">
          <SectionHeader prompt={t.contactPrompt} title={t.contactTitle} />
          <div data-reveal className="reveal max-w-2xl">
            <p className="text-lg leading-relaxed text-[var(--fg-muted)]">{t.contactText}</p>
            <ul className="mt-8 space-y-3 mono text-sm">
              <li>
                <span className="text-[var(--fg-muted)]">email&nbsp;&nbsp;&nbsp;</span>
                <a className="link" href={`mailto:${links.email}`}>{links.email}</a>
              </li>
              <li>
                <span className="text-[var(--fg-muted)]">whatsapp</span>{" "}
                <a className="link" href={links.whatsapp} target="_blank" rel="noreferrer">{links.whatsappLabel}</a>
              </li>
              <li>
                <span className="text-[var(--fg-muted)]">linkedin</span>{" "}
                <a className="link" href={links.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/alexander-junior</a>
              </li>
              <li>
                <span className="text-[var(--fg-muted)]">github&nbsp;&nbsp;&nbsp;</span>{" "}
                <a className="link" href={links.github} target="_blank" rel="noreferrer">github.com/AlexanderJunior35</a>
              </li>
            </ul>
          </div>
        </section>

        <footer className="border-t border-[var(--border)] py-8 text-center mono text-xs text-[var(--fg-muted)]">
          © {new Date().getFullYear()} Alexander Junior · {t.footer}
        </footer>
      </main>
    </div>
  );
}

export default Index;
