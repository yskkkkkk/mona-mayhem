<!-- l10n-sync: source-file="README.md" -->
🌐 [English](README.md) | Español | [Português (Brasil)](README.pt_BR.md) | [한국어](README.ko.md)

# Mona Mayhem — Arena de Batalla de Contribuciones de GitHub

Compara a dos usuarios de GitHub en una batalla de arcade retro. La aplicación de servidor de Astro obtiene los datos de contribuciones mediante un proxy de API en el servidor y muestra los gráficos de contribuciones, las rachas y el ganador de la batalla.

## Ejecución en local

Requiere Node.js y npm. Desde la raíz del repositorio:

```bash
npm ci
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321), introduce dos nombres de usuario de GitHub e inicia una batalla.

Para comprobar una compilación de producción:

```bash
npm run build
npm run preview
```

Si la vista previa de esta aplicación ya se está ejecutando, detenla antes de `npm run build` y reiníciala con `npm run preview` cuando termine la compilación. Un proceso de vista previa antiguo puede hacer referencia a URL de CSS/JS con hash obsoletas, lo que provoca errores 404 y estilos o scripts rotos.

## Características

- Gráficos de contribuciones en paralelo con tooltips diarios y leyendas de niveles de color
- Totales de contribuciones, rangos de fechas, rachas más largas y un banner de ganador
- Tema neón alternativo, historial de batallas recientes, sonido sintetizado opcional y resultados que se pueden compartir

## API de contribuciones

`GET /api/contributions/{username}` actúa como proxy, desde el servidor, del endpoint `https://github.com/{username}.contribs` de GitHub, lo que evita las restricciones CORS del navegador. Los nombres de usuario válidos reciben el JSON original, que incluye `from`, `to`, `total_contributions`, `colors_full`, `weeks` y `months`. Los nombres de usuario no válidos devuelven `400`, los usuarios de GitHub inexistentes devuelven `404` y los fallos del servicio de origen devuelven `502`. Las respuestas correctas se almacenan en caché en memoria durante 10 minutos; `X-Cache` indica `MISS` o `HIT`.

## Lista de verificación en el navegador

Estas comprobaciones manuales están pendientes. Usa las DevTools del navegador para simular el tamaño de la ventana, el movimiento reducido, el almacenamiento y las respuestas de la API cuando sea necesario.

- [ ] Haz que `octocat` se enfrente a `torvalds`; deben aparecer ambos gráficos, los totales, las rachas y el ganador. Repite la prueba pulsando Intro en cualquiera de los campos de nombre de usuario.
- [ ] Envía nombres de usuario vacíos y con formato incorrecto (por ejemplo, `bad/name`) en cualquiera de los campos; deben aparecer errores de validación claros y, al corregir los datos, debe poder iniciarse una batalla.
- [ ] Prueba, por separado en cada posición de jugador, un nombre de usuario de GitHub con formato válido pero inexistente; el error de la API identifica a ese jugador, la carga termina y un reintento corregido funciona.
- [ ] Comprueba las celdas de 12 px del gráfico y los cinco indicadores de color de la leyenda por gráfico. Pasa el ratón por encima de los días y enfócalos con el teclado para ver tooltips visibles con la fecha y el número de contribuciones correctos.
- [ ] Tab entra en cada gráfico por un solo día; las teclas de flecha mueven el foco dentro de ese gráfico, y Tab/Shift+Tab salen de él en lugar de recorrer todas las celdas. Los tooltips con foco siguen visibles, incluso cerca de los bordes del gráfico.
- [ ] Con 1024 px, 768 px y anchos de móvil (por ejemplo, 375 px), los controles y los resultados siguen siendo utilizables. Los gráficos anchos se desplazan horizontalmente dentro de sus propios contenedores, sin desplazamiento horizontal de la página.
- [ ] Cambia de tema y recarga; el tema seleccionado persiste.
- [ ] Ejecuta varias batallas y recarga; se conservan hasta 10 batallas recientes. Borra el historial y recarga; sigue vacío sin borrar el tema guardado.
- [ ] Comparte un resultado con ganador y un empate (usa el mismo nombre de usuario para ambos jugadores); el estado de ganador o empate compartido/copiado, ambos nombres y ambos recuentos de contribuciones coinciden con los resultados mostrados.
- [ ] Comprueba la cuenta atrás y la entrada deslizante de los resultados. Activa el movimiento reducido y repite; las animaciones se suprimen y la batalla sigue llegando a sus resultados.
- [ ] Simula fallos de lectura, escritura y eliminación en `localStorage`, incluidos errores de cuota; durante las batallas permanece visible una advertencia, mientras que compartir y cambiar de tema siguen funcionando, sin errores no capturados.
- [ ] Simula datos de tema o historial guardados y corruptos. Un JSON no válido, un historial que no sea una matriz o entradas de historial no válidas mezcladas no deben bloquear las batallas: el historial almacenado permanece intacto, se muestran los registros válidos y los nuevos guardados se pausan hasta que Borrar historial se complete correctamente.
- [ ] Simula un JSON no válido o una forma inesperada de la respuesta de la API de contribuciones; el jugador afectado recibe un error legible mientras el gráfico de cualquier jugador válido sigue visible. No se ofrece ningún resultado de ganador ni para compartir, la carga termina y un reintento válido funciona.

# 🎮 Mona Mayhem

**Taller de VS Code y GitHub Copilot CLI** — Construye una Arena de Batalla de Contribuciones de GitHub

Una plantilla de taller para crear con Astro un sitio web de temática arcade retro que compara los gráficos de contribuciones de GitHub de dos usuarios. Este es el **punto de partida**: construirás la aplicación paso a paso con GitHub Copilot.

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*Lo que habrás construido al final del taller*

## 📚 Taller

El taller ofrece dos pistas; sigue la que se ajuste a tu flujo de trabajo preferido:

- **Pista de VS Code** — Chat, Plan Mode, Agent Mode, background agents y ciclos de revisión integrados en el editor
- **Pista de CLI** — `copilot`, contexto con `@file`, `/plan`, ediciones autónomas, `/fleet`, `/delegate` y `/review`

| Parte | Título | Enfoque de Copilot |
|-------|--------|--------------------|
| [00](workshop/es/00-overview.md) | Visión General | Elección de pista y objetivos de aprendizaje |
| [01](workshop/es/01-setup.md) | Configuración e Ingeniería de Contexto | Instrucciones, permisos y configuración del entorno |
| [02](workshop/es/02-plan-and-scaffold.md) | Planificar y Estructurar | Planificación de la API y de la arquitectura de la página |
| [03](workshop/es/03-agent-mode.md) | Construir el Juego | Implementación y iteración con agentes |
| [04](workshop/es/04-design-vibes.md) | Temas Design-First | Planificación e implementación del diseño visual |
| [05](workshop/es/05-polish.md) | Pulido y Trabajo en Paralelo | Paralelismo, revisiones y pasadas de calidad |
| [06](workshop/es/06-bonus.md) | Bonus y Extensiones | Ideas de funcionalidades abiertas y experimentos adicionales con Copilot |

## 🚀 Inicio Rápido

1. **Crea primero tu propio repositorio** de una de estas formas:
   - haciendo clic en **Use this template** para crear un repositorio nuevo, o
   - bifurcando (fork) este repositorio.
2. Elige tu pista del taller:
   - **VS Code:** clona tu repositorio y ábrelo en VS Code.
   - **GitHub Copilot CLI:** clona tu repositorio en local, instala `copilot` y trabaja desde la terminal.
3. Sigue la [guía del taller](workshop/es/00-overview.md)

## Requisitos Previos

### Comunes

- GitHub Copilot (Pro, Business o Enterprise)
- Git
- Node.js

### Pista de VS Code

- VS Code v1.107+
- Extensión de GitHub Copilot con la sesión iniciada

### Pista de CLI

- GitHub Copilot CLI (`copilot`)
- Node.js 22+ si piensas instalar la CLI con `npm install -g @github/copilot`
- O Homebrew / WinGet si prefieres instalarla con un gestor de paquetes nativo

## Stack Tecnológico

- **Framework**: [Astro](https://astro.build/) v6
- **Runtime**: Node.js con adaptador [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/)
- **Fuente**: Press Start 2P (fuente de juegos retro)
- **API**: API de gráfico de contribuciones de GitHub

## Notas de Despliegue

### Configuración actual de GitHub Pages

El flujo de trabajo de `.github/workflows/deploy.yml` despliega actualmente en GitHub Pages el contenido estático del taller y de la documentación de `docs/` y `workshop/`. No compila ni despliega la aplicación de Astro de `src/`.

### Si quieres desplegar la aplicación de Astro en GitHub Pages

GitHub Pages es un alojamiento estático, por lo que la aplicación de Astro debe usar salida estática.

1. Cambia `output` en `astro.config.mjs` de `server` a `static`.
2. Elimina el adaptador de Node (`@astrojs/node`) de `astro.config.mjs` y de `package.json`.
3. Actualiza el flujo de trabajo de GitHub Actions para que ejecute `npm ci` y `npm run build`, y luego sube `dist/` como artefacto de Pages.
4. Si despliegas en una página de proyecto (`https://<user>.github.io/<repo>/`), define `site` y `base` en `astro.config.mjs`.

Si piensas mantener rutas de API en ejecución en producción, usa una plataforma de servidor en lugar de GitHub Pages (por ejemplo, Vercel, Netlify o un host de Node).

## Licencia

MIT
