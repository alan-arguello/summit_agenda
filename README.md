# Becoming AI Native · La comunidad

Directorio del retiro de Torrenegra en Napa Valley. Proyecto independiente en Next.js 16, React 19 y TypeScript, con 5 speakers y 10 asistentes.

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

## Diseño y alcance

El diseño reutiliza Switzer, verde bosque, marfil y el paisaje tramado de `/retreat` del proyecto `consulting_website`. Incluye navegación por sección, retratos, biografías visibles y enlaces a LinkedIn, con foco de teclado, adaptación móvil y respeto de la preferencia de movimiento reducido.

Esta primera entrega es un directorio. Agenda, logística, recursos y administración de datos pueden incorporarse sobre esta base. Los datos se mantienen en el archivo JSON; no hay base de datos ni formulario de edición. La publicación en Sites se mantiene privada. La etiqueta `noindex` solicita no indexar la página y no sustituye los controles de acceso del alojamiento.

## Detalles editoriales a revisar

- Bryan conserva la imagen grupal que usa en su perfil de LinkedIn, sin recortar ni atribuir una cara individual. Conviene sustituirla cuando comparta un retrato.
- Andrés utiliza una foto institucional original publicada por la UIS en 2020; Romel utiliza la imagen original de LinkedIn disponible a 200 × 200. Pueden sustituirse por originales recientes de mayor resolución.
- Las bios y cargos se investigaron el 13 de septiembre de 2026. Los temas describen experiencia profesional; no anuncian una charla o agenda individual.

Los retratos provienen de fuentes públicas identificadas o de activos originales anteriores del organizador. No se generaron rostros ni se atribuyeron afiliaciones por la participación en el evento.
