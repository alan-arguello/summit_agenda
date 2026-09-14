export type AgendaItem = {
  start: string;
  end?: string;
  title: string;
  description?: string;
  format?: string;
  speakers?: string[];
  offRecord?: boolean;
  kind?: "session";
};

export type AgendaDay = {
  date: string;
  number: string;
  weekday: string;
  theme: string;
  introduction: string;
  noteTitle: string;
  note: string;
  items: AgendaItem[];
};

export const agenda: AgendaDay[] = [
  {
    date: "2026-10-05",
    number: "05",
    weekday: "Lunes",
    theme: "La experiencia sobre la mesa.",
    introduction:
      "Un día para conocer a la comunidad y conversar de cerca sobre las decisiones, los cambios y los aprendizajes que trae la IA.",
    noteTitle: "Conversaciones con apertura",
    note: "Las sesiones de Tania y Santy serán off the record y no se grabarán.",
    items: [
      { start: "09:30", title: "Salida de Union Square a Napa", description: "Traslado del grupo desde San Francisco." },
      { start: "10:30", title: "Llegada a Napa" },
      { start: "10:30", end: "11:00", title: "Brunch" },
      {
        start: "11:00", end: "11:30", title: "Conozcámonos",
        description: "Presentaciones de cada participante: quién eres, en qué estás trabajando y qué te gustaría explorar durante estos dos días.",
      },
      {
        start: "11:30", end: "13:30", kind: "session", format: "Fireside chat",
        title: "Lo que estamos aprendiendo al llevar IA a las organizaciones",
        speakers: ["alexander-torrenegra", "alan-arguello"],
        description: "Aprendizajes de trabajar con pymes, corporativos e instituciones de gobierno. Alexander y Alan conversarán sobre las decisiones radicales en Torre y los cambios que Alexander observa en las empresas de su portafolio: cómo están operando sus founders, qué están replanteando y qué está funcionando.",
      },
      { start: "13:30", end: "14:30", title: "Almuerzo" },
      {
        start: "14:30", end: "15:30", kind: "session", format: "Fireside chat",
        title: "Cuando la IA transforma tu mercado",
        speakers: ["tania-zapata"], offRecord: true,
        description: "Tania cofundó Bunny Studio y lo hizo crecer sin inversión externa. Hablaremos de la otra cara del auge de la IA: qué pasa cuando la voz sintética cambia tu mercado, cómo navegar una caída de ingresos y qué decisiones exige reinventar una empresa desde cero.",
      },
      {
        start: "15:30", end: "16:30", kind: "session", format: "Fireside chat",
        title: "Construir tecnología a escala país",
        speakers: ["santy-bevilacqua"], offRecord: true,
        description: "Desde su trabajo en proyectos especiales del Gobierno de El Salvador, Santy compartirá aprendizajes de llevar tecnología a servicios públicos como Doctor SV. Conversaremos sobre ejecución a escala nacional, el trabajo con el gobierno de Nayib Bukele y las oportunidades que ve hacia adelante.",
      },
      {
        start: "16:30", end: "17:30", kind: "session", format: "Fireside chat",
        title: "Cómo construyen los equipos que llevan la IA a producción",
        speakers: ["duvan-salcedo"],
        description: "Desde sus inicios en Imagine Apps y el equipo fundador de Dapta hasta liderar IA en Domu, compañía de Y Combinator S24. Duvan compartirá cómo organiza equipos de ingeniería para construir productos con agentes, pasar del prototipo a producción y sostener la calidad mientras crecen.",
      },
      { start: "17:30", end: "18:30", title: "Happy hour", description: "Tiempo para seguir las conversaciones y conectar con la comunidad." },
      { start: "18:30", title: "Regreso a Union Square", description: "Salida de Napa hacia San Francisco." },
    ],
  },
  {
    date: "2026-10-06",
    number: "06",
    weekday: "Martes",
    theme: "Tu reto, nuevas perspectivas.",
    introduction:
      "Un día para trabajar sobre tus propias preguntas, aprender de la experiencia del grupo y recibir feedback que te ayude a decidir.",
    noteTitle: "Trae algo que quieras resolver",
    note: "Puede ser un reto de tu empresa, una idea por explorar o una decisión que tengas pendiente.",
    items: [
      { start: "09:30", title: "Salida de Union Square a Napa", description: "Traslado del grupo desde San Francisco." },
      { start: "10:30", title: "Llegada a Napa" },
      { start: "10:30", end: "11:00", title: "Brunch" },
      {
        start: "11:00", end: "13:00", kind: "session", format: "Trabajo entre pares",
        title: "Peer-to-peer forums · Primera parte",
        description: "Cada participante pone sobre la mesa un reto, una idea o una decisión. El grupo funciona como un consejo asesor: hace preguntas y comparte experiencias útiles para abrir nuevas perspectivas. Un facilitador guía la conversación y cuida el tiempo para que el intercambio sea concreto y provechoso.",
      },
      { start: "13:00", end: "13:30", title: "Almuerzo" },
      {
        start: "13:30", end: "15:00", kind: "session", format: "Trabajo entre pares",
        title: "Peer-to-peer forums · Segunda parte",
        description: "Continuamos con los retos de los participantes. Una oportunidad para contrastar alternativas, profundizar en lo que aprendiste del grupo y darle más claridad a tus próximos pasos.",
      },
      { start: "15:00", end: "15:30", title: "Pausa" },
      {
        start: "15:30", end: "17:00", kind: "session", format: "Feedback personalizado",
        title: "Una mirada directa a lo que tienes en mente",
        speakers: ["alexander-torrenegra", "tania-zapata"],
        description: "Cada participante recibirá feedback de Alexander y Tania. Puedes retomar el reto que trabajaste en los forums o traer otra pregunta: una decisión estratégica, una idea de negocio o un desafío que quieras analizar con ellos.",
      },
      { start: "17:00", end: "17:30", title: "Cierre", description: "Compartimos los aprendizajes que nos llevamos y los próximos pasos que queremos dar." },
      { start: "17:30", end: "18:30", title: "Happy hour", description: "Una última conversación para cerrar el encuentro y seguir conectados." },
      { start: "18:30", title: "Regreso a Union Square", description: "Salida de Napa hacia San Francisco." },
    ],
  },
];
