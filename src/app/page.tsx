import Image from "next/image";
import { people, type Person } from "@/lib/people";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonCard({ person, index }: { person: Person; index: number }) {
  const brands = [
    ...(person.logo
      ? [{ name: person.company, label: "Empresa actual", logo: person.logo, logoDark: person.logoDark, logoFit: person.logoFit, logoPosition: person.logoPosition }]
      : []),
    ...(person.affiliations ?? []),
  ];
  const featuredBrands = person.featuredLogos
    ? brands.filter((brand) => person.featuredLogos?.includes(brand.name)).slice(0, 2)
    : brands.slice(0, 2);

  return (
    <article className={`person-card ${person.category}`}>
      <div className="person-intro">
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="portrait-link"
          aria-label={`Ver a ${person.name} en LinkedIn (abre otra pestaña)`}
        >
          <div className="portrait-frame">
            {person.photo ? (
              <Image
                src={person.photo}
                alt={person.name}
                fill
                sizes="(max-width: 420px) 88px, 104px"
                preload={person.category === "speaker" && index < 3}
                style={{
                  objectPosition: person.photoPosition ?? "center 35%",
                  objectFit: person.photoFit ?? "cover",
                }}
              />
            ) : (
              <span className="portrait-initials">
                {person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
              </span>
            )}
          </div>
        </a>
        <div className="person-heading">
          <h3>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              {person.name}
            </a>
          </h3>
          <p className="person-role">{person.role}</p>
          <p className="person-company">{person.company}</p>
        </div>
      </div>
      <p className="person-bio">{person.bio}</p>
      <div className="person-footer">
        <ul className="person-brands" aria-label={`Empresas y trayectoria de ${person.name}`}>
          {featuredBrands.map((brand) => (
            <li key={brand.name}>
              <div className={`brand-image ${brand.logoDark ? "brand-image-dark" : ""} ${brand.logoFit === "cover" ? "brand-image-cover" : ""}`}>
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="142px"
                  style={{ objectFit: brand.logoFit ?? "contain", objectPosition: brand.logoPosition ?? "left center" }}
                />
              </div>
            </li>
          ))}
        </ul>
        <a
          className="linkedin-link"
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${person.name} (abre otra pestaña)`}
        >
          <span className="linkedin-icon" aria-hidden="true">in</span>
          Conectar en LinkedIn
          <Arrow diagonal />
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  const speakers = people.filter((person) => person.category === "speaker");
  const attendees = people.filter((person) => person.category === "attendee");
  return (
    <>
      <a href="#directorio" className="skip-link">
        Ir al directorio
      </a>
      <header className="site-header">
        <a href="#" className="brand" aria-label="Torrenegra, inicio">
          <span className="brand-wordmark">
            torrenegra<span className="brand-period">.</span>
          </span>
          <span className="brand-divider" />
          <span className="brand-event">
            Becoming
            <br />
            AI Native
          </span>
        </a>
        <div className="header-meta">
          <span>Napa Valley, California</span>
          <span>5—6 octubre, 2026</span>
        </div>
        <a
          className="retreat-link"
          href="https://www.torrenegra.com/es/retreat"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sobre el retiro <Arrow diagonal />
        </a>
      </header>
      <main>
        <section className="community-hero" aria-labelledby="hero-title">
          <Image
            src="/images/napa-dither.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="hero-landscape"
          />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="hero-label">Becoming AI Native · La comunidad</p>
              <h1 id="hero-title">
                Nos vemos
                <br /> en Napa<span>.</span>
              </h1>
              <p className="hero-description">
                Las personas detrás de las conversaciones.
                <br /> Conoce a quienes compartirán estos dos días contigo.
              </p>
            </div>
          </div>
          <div className="hero-bottom">
            <span>5 y 6 de octubre de 2026</span>
            <span>Un encuentro de Torrenegra</span>
          </div>
        </section>
        <div className="directory-nav" id="directorio">
          <nav aria-label="Secciones del directorio">
            <a href="#speakers">
              Speakers <span>{String(speakers.length).padStart(2, "0")}</span>
            </a>
            <a href="#asistentes">
              Asistentes{" "}
              <span>{String(attendees.length).padStart(2, "0")}</span>
            </a>
          </nav>
          <p>Una comunidad. Distintas perspectivas.</p>
        </div>
        <div className="directory-content">
          <section
            id="speakers"
            aria-labelledby="speakers-title"
            className="people-section"
          >
            <div className="section-heading">
              <div>
                <p className="section-pretitle">Para abrir la conversación</p>
                <h2 id="speakers-title">
                  Speakers
                  <span>{String(speakers.length).padStart(2, "0")}</span>
                </h2>
              </div>
              <p>
                Experiencias de primera mano.
                <br />
                Preguntas que nos hacen ir más allá.
              </p>
            </div>
            <div className="people-grid speaker-grid">
              {speakers.map((person, index) => (
                <PersonCard key={person.slug} person={person} index={index} />
              ))}
            </div>
          </section>
          <section
            id="asistentes"
            aria-labelledby="attendees-title"
            className="people-section attendee-section"
          >
            <div className="section-heading">
              <div>
                <p className="section-pretitle">El valor de estar juntos</p>
                <h2 id="attendees-title">
                  Asistentes
                  <span>{String(attendees.length).padStart(2, "0")}</span>
                </h2>
              </div>
              <p>
                Otras industrias. Nuevas miradas.
                <br />
                Mucho por aprender entre todos.
              </p>
            </div>
            <div className="people-grid attendee-grid">
              {attendees.map((person, index) => (
                <PersonCard key={person.slug} person={person} index={index} />
              ))}
            </div>
          </section>
        </div>
        <div className="closing-note">
          <span>El siguiente paso empieza con una conversación.</span>
          <a href="#speakers">
            Volver a la comunidad <span aria-hidden="true">↑</span>
          </a>
        </div>
      </main>
      <footer>
        <span className="footer-brand">torrenegra.</span>
        <p>Becoming AI Native · Napa Valley · 2026</p>
        <span>Nos vemos pronto.</span>
      </footer>
    </>
  );
}
