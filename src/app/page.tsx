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
  return (
    <article className={`person-card ${person.category}`}>
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
              sizes="(max-width: 360px) 96px, (max-width: 600px) 112px, (max-width: 700px) 45vw, (max-width: 1200px) 30vw, 18vw"
              priority={person.category === "speaker" && index < 3}
              style={{
                objectPosition: person.photoPosition ?? "center 35%",
                objectFit: person.photoFit ?? "cover",
              }}
            />
          ) : (
            <span
              className="portrait-initials"
              aria-label={`Perfil de ${person.name}`}
            >
              {person.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </span>
          )}
          <span className="portrait-arrow">
            <Arrow diagonal />
          </span>
        </div>
      </a>
      <div className="person-info">
        <h3>
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
            {person.name}
          </a>
        </h3>
        <p className="person-role">{person.role}</p>
        <div
          className={`company-line ${person.logoDark ? "logo-dark" : ""} ${person.logoIcon ? "logo-icon" : ""}`}
        >
          {person.logo && (
            <Image
              src={person.logo}
              alt={person.company}
              width={person.logoIcon ? 28 : 110}
              height={28}
              className="company-logo"
            />
          )}
          {(!person.logo || person.logoIcon) && <span>{person.company}</span>}
        </div>
        <p className="person-bio">{person.bio}</p>
        <div className="career-marks">
          {!!person.affiliations?.length && (
            <ul aria-label={`Trayectoria de ${person.name}`}>
              {person.affiliations.map((affiliation) => (
                <li key={affiliation.name}>
                  <div className={`career-logo ${affiliation.logoDark ? "career-logo-dark" : ""}`}>
                    <Image
                      src={affiliation.logo}
                      alt={affiliation.name}
                      fill
                      sizes="110px"
                    />
                  </div>
                  <span>{affiliation.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="topics">
          {person.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
        <a
          className="linkedin-link"
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${person.name} (abre otra pestaña)`}
        >
          <span className="linkedin-icon" aria-hidden="true">
            in
          </span>
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
            priority
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
