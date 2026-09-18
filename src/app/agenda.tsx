"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { agenda } from "@/data/agenda";

type AgendaSpeaker = {
  slug: string;
  name: string;
  photo: string;
  photoPosition?: string;
};

export default function Agenda({ speakers }: { speakers: AgendaSpeaker[] }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % agenda.length;
    else if (event.key === "ArrowLeft") next = (index + agenda.length - 1) % agenda.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = agenda.length - 1;
    else return;
    event.preventDefault();
    setSelectedDay(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="agenda" className="agenda-section" aria-labelledby="agenda-title">
      <div className="section-heading agenda-heading">
        <div>
          <p className="section-pretitle">5 y 6 de octubre de 2026</p>
          <h2 id="agenda-title">La agenda</h2>
        </div>
        <p>Hora local de California<br />Regreso: día 5 a las 19:30 · día 6 a las 18:30</p>
      </div>
      <div className="agenda-tabs" role="tablist" aria-label="Días del encuentro">
        {agenda.map((day, index) => (
          <button
            key={day.date}
            ref={(element) => { tabs.current[index] = element; }}
            type="button"
            role="tab"
            id={`agenda-tab-${day.number}`}
            aria-controls={`agenda-panel-${day.number}`}
            aria-selected={selectedDay === index}
            tabIndex={selectedDay === index ? 0 : -1}
            onClick={() => setSelectedDay(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className="agenda-day-tab"
          >
            <span className="agenda-tab-date">{day.number}</span>
            <span><strong>Octubre</strong><span>{day.weekday} · Día {index + 1}</span></span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        ))}
      </div>
      <p className="agenda-mobile-timezone">Todos los horarios son de California.</p>
      {agenda.map((day, index) => (
        <div
          key={day.date}
          id={`agenda-panel-${day.number}`}
          role="tabpanel"
          aria-labelledby={`agenda-tab-${day.number}`}
          hidden={selectedDay !== index}
          tabIndex={0}
          className="agenda-panel"
        >
          <aside className="agenda-day-intro">
            <p className="agenda-day-label">Día {index + 1} · Napa Valley</p>
            <h3>{day.theme}</h3>
            <p className="agenda-day-description">{day.introduction}</p>
            <div className="agenda-day-note">
              <p>{day.noteTitle}</p>
              <span>{day.note}</span>
            </div>
          </aside>
          <ol className="agenda-timeline" aria-label={`Programa del ${day.number} de octubre`}>
            {day.items.map((item, itemIndex) => (
              <li key={`${item.start}-${itemIndex}`} className={`agenda-row ${item.kind === "session" ? "agenda-session" : "agenda-moment"}`}>
                <div className="agenda-time">
                  <time dateTime={`${day.date}T${item.start}`}>{item.start}</time>
                  {item.end && <><span aria-hidden="true">—</span><time dateTime={`${day.date}T${item.end}`}>{item.end}</time></>}
                </div>
                <div className="agenda-item-content">
                  {item.format && <div className="agenda-session-meta">
                    <span>{item.format}</span>
                    {item.offRecord && <span className="agenda-off-record">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" stroke="currentColor" strokeWidth="1.5" /></svg>
                      Off the record · Sin grabación
                    </span>}
                  </div>}
                  <h4>{item.title}</h4>
                  {item.speakers && <div className="agenda-speakers">
                    {item.speakers.map((slug) => {
                      const speaker = speakers.find((person) => person.slug === slug);
                      if (!speaker) return null;
                      return <a key={slug} href={`#${slug}`} className="agenda-speaker">
                        <Image src={speaker.photo} alt="" width={32} height={32} style={{ objectPosition: speaker.photoPosition ?? "center 35%" }} />
                        <span>{speaker.name}</span>
                      </a>;
                    })}
                  </div>}
                  {item.description && <p className="agenda-item-description">{item.description}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}
