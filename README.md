# Becoming AI Native · La comunidad

Agenda y directorio del retiro de Torrenegra en Napa Valley. Proyecto independiente en Next.js 16, React 19 y TypeScript, con dos días de programación, 6 speakers y 15 asistentes.

## Desarrollo

```sh
npm install
npm run dev
```

Abre http://localhost:3007. La vista se actualiza al editar los archivos.

```sh
npm run lint
npm run typecheck
npm run build
```

`npm run build` genera una exportación estática en `out/`. Puede alojarse con Sites o cualquier servicio que sirva archivos estáticos. Para incorporar funciones de servidor en una próxima etapa, retira `output: "export"` de `next.config.ts` y adapta el despliegue.

## Editar el directorio

- `src/data/people.json`: nombres, cargos, empresas, minibios, temas, enlaces y rutas de imágenes. El orden del archivo determina el orden de presentación dentro de cada grupo.
- `src/lib/people.ts`: contrato de datos. `category` admite `speaker` o `attendee`; los conteos se calculan a partir de esos registros.
- `src/app/page.tsx`: composición del directorio, fichas y navegación.
- `src/app/globals.css`: tokens de color, Switzer, tipografía, espaciado, grillas y adaptación móvil.
- `public/images/people/` y `public/images/logos/`: activos locales, sin depender de URLs temporales de LinkedIn.
- `SOURCES.md`: fuentes por persona, procedencia y límites de verificación.

Para agregar una persona, duplica un registro, asigna un `slug` único y guarda sus activos en `public/images/`. `photoPosition` permite ajustar el encuadre; `photoFit: "contain"` conserva una imagen completa. `logoDark` hace legibles los logos blancos sobre el fondo claro; `logoIcon` acompaña un símbolo con el nombre de la empresa.

`affiliations` conserva el catálogo de trayectoria con `name`, `label` (relación documentada, sin texto visible bajo el logo), `logo` y `logoDark` opcional. Cada tarjeta muestra como máximo dos marcas: por defecto la empresa actual y la primera afiliación. `featuredLogos` permite seleccionar otras dos por nombre, como Shark Tank y World Economic Forum para Alexander. `logoFit` y `logoPosition` permiten encuadrar marcas dentro de archivos con margen, como el icono original de Doctor SV. Cada vínculo y activo se documenta en `SOURCES.md`; los archivos se guardan en `public/images/affiliations/`.

Las 21 bios tienen entre 175 y 194 caracteres y se muestran completas. Las tarjetas usan flujo normal, con retrato e identidad juntos, bio a todo el ancho y una sola franja de logos. Los speakers muestran tres columnas desde 1180 px, dos desde 740 px y una debajo. Los asistentes usan dos columnas desde 740 px, con una sección centrada de máximo 1040 px para limitar cada tarjeta a 508 px; en móvil pasan a una columna. La última tarjeta queda centrada cuando la fila está incompleta. Cada ficha conserva su composición sin compartir alturas internas con las demás. Los temas se conservan como datos editoriales, sin chips en la interfaz.

## Diseño y alcance

Los retratos de speakers y asistentes usan un efecto ASCII en canvas, calculado a partir de la luminancia de cada foto y con el mismo encuadre que el original. El cursor sobre cualquier parte de la tarjeta revela la foto; un toque o clic en el retrato, Enter o espacio permite alternar las dos vistas. Los enlaces a LinkedIn siguen en el nombre y el pie de la tarjeta. Se dibuja al acercarse al viewport y al cambiar de tamaño, sin animación continua; se conserva la foto original si canvas no está disponible y se respeta la preferencia de movimiento reducido. Los avatares pequeños de la agenda conservan la fotografía.

El diseño reutiliza Switzer, verde bosque, marfil y el paisaje tramado de `/retreat` del proyecto `consulting_website`. Incluye navegación por sección, retratos, biografías visibles y enlaces a LinkedIn, con foco de teclado, tarjetas amplias en móvil y respeto de la preferencia de movimiento reducido.

Incluye agenda, amenidades, servicios incluidos y directorio. La sección de amenidades reúne alberca, mini-gym y estacionamiento para 20 autos; los incluidos son snacks, bebidas y comidas del programa, según lo indicado por el organizador. Los datos se mantienen en archivos locales; no hay base de datos ni formulario de edición. La publicación en Sites se mantiene privada. La etiqueta `noindex` solicita no indexar la página y no sustituye los controles de acceso del alojamiento.

## Vista previa al compartir

`public/og.png` conserva la portada original de Becoming AI Native. `public/og-social.jpg` es la misma imagen exportada a 1200 × 630 y 192 KB para compartir. `src/app/layout.tsx` configura Open Graph y X con esta versión ligera, título, descripción y texto alternativo. `metadataBase` utiliza el dominio actual de Sites; actualízalo si el sitio cambia de dominio. La portada y la página necesitan ser accesibles al servicio que genera la vista previa: los controles de acceso privados del alojamiento pueden impedir que servicios externos la obtengan. Las preferencias de vista previa de quien comparte y la caché de cada plataforma también pueden afectar su aparición.

## Editar la agenda

- `src/data/agenda.ts`: dos días con 11 entradas cada uno. Horarios de 24 horas, en hora local de California; `18:30` es la salida de regreso, no la llegada a San Francisco.
- `src/app/agenda.tsx`: selector de días con navegación de teclado (flechas, Inicio y Fin), programa cronológico y enlaces internos a las fichas de los speakers.
- `offRecord` marca únicamente las sesiones de Tania y Santy como off the record y sin grabación. No se infiere que las demás se graben.
- Los horarios, temas, sesiones y participación son instrucciones del organizador. Tomás continúa en el directorio de speakers; no se le asignó una sesión que no figurara en la programación recibida.
- La llegada a las 10:30 y el inicio del brunch a esa misma hora se conservan como entradas separadas. No se añadieron direcciones exactas ni una hora de llegada del traslado de regreso.

## Detalles editoriales a revisar

- Bryan conserva la imagen grupal que usa en su perfil de LinkedIn, sin recortar ni atribuir una cara individual. Conviene sustituirla cuando comparta un retrato.
- Andrés utiliza una foto institucional original publicada por la UIS en 2020; Romel utiliza la imagen original de LinkedIn disponible a 200 × 200. Pueden sustituirse por originales recientes de mayor resolución.
- Las bios y cargos se investigaron el 13 de septiembre de 2026. Los temas describen experiencia profesional; no anuncian una charla o agenda individual.

Los retratos provienen de fuentes públicas identificadas o de activos originales anteriores del organizador. No se generaron rostros ni se atribuyeron afiliaciones por la participación en el evento.
