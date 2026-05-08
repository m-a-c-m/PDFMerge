import PDFMerge from "@/components/PDFMerge";
import { MdPictureAsPdf } from "react-icons/md";

const EMBED_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/pdf-merge";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <MdPictureAsPdf className="text-base" />
            Herramienta gratuita · Free tool
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            <span className="gradient-text">Unir PDFs</span>
            <br />
            <span className="text-2xl font-medium text-text-muted sm:text-3xl">Fusionar múltiples PDFs en uno</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-text-muted">
            Combina varios archivos PDF en un único documento con drag & drop.
            Reordena los PDFs antes de fusionarlos.
            100% en el navegador — tus documentos nunca salen de tu dispositivo.
          </p>
        </div>

        <div className="glass rounded-2xl border border-border/20 p-5 sm:p-8">
          <PDFMerge />
        </div>

        <div className="mt-12 glass rounded-2xl border border-border/20 p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            ¿Cómo unir PDFs? / How to merge PDFs?
          </h2>
          <ol className="space-y-5">
            {[
              {
                n: "1",
                t: "Añade los PDFs / Add the PDFs",
                d: "Arrastra los archivos PDF sobre la zona de carga o haz clic para seleccionarlos. Puedes añadir tantos PDFs como necesites. Solo se aceptan archivos PDF. / Drag PDF files onto the drop zone or click to select them. Only PDF files are accepted.",
              },
              {
                n: "2",
                t: "Ordena los PDFs / Reorder the PDFs",
                d: "Arrastra las tarjetas para cambiar el orden en que aparecerán en el PDF final. El número de posición se muestra en cada tarjeta. También puedes usar las flechas arriba/abajo. / Drag cards to change the order they will appear in the final PDF.",
              },
              {
                n: "3",
                t: "Fusiona y descarga / Merge and download",
                d: "Cuando tengas al menos 2 PDFs, haz clic en 'Fusionar y descargar'. El PDF resultante se descargará automáticamente como 'merged.pdf'. / When you have at least 2 PDFs, click Merge & download. The result downloads automatically.",
              },
              {
                n: "4",
                t: "Repite si es necesario / Repeat if needed",
                d: "Puedes limpiar la lista con el botón 'Limpiar' y empezar de nuevo con una nueva combinación de PDFs. No hay límite de uso. / Clear the list and start again with a new combination. No usage limits.",
              },
            ].map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {s.n}
                </span>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 glass rounded-2xl border border-border/20 p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Preguntas frecuentes / FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "¿Cuántos PDFs puedo fusionar? / How many PDFs can I merge?",
                a: "No hay un límite fijo. La herramienta fusiona todos los PDFs que añadas en el orden que elijas. El límite práctico depende de la memoria disponible en tu navegador. / No hard limit. The tool merges all PDFs you add in the order you choose.",
              },
              {
                q: "¿Los PDFs protegidos con contraseña funcionan? / Do password-protected PDFs work?",
                a: "No. Los PDFs cifrados o protegidos con contraseña no pueden ser leídos por la librería pdf-lib en el navegador. Deberás desprotegerlos primero con otra herramienta. / No. Password-protected or encrypted PDFs cannot be processed. Remove the protection first.",
              },
              {
                q: "¿Se conservan los marcadores, formularios y capas del PDF? / Are bookmarks, forms and layers preserved?",
                a: "La fusión copia las páginas de cada PDF pero no garantiza la preservación de marcadores, campos de formulario interactivos o capas complejas. El contenido visual de las páginas se mantiene completamente. / Page merging preserves visual content. Complex interactive elements like bookmarks and forms may not be preserved.",
              },
              {
                q: "¿El orden en el PDF final es el que veo en pantalla? / Is the final order what I see on screen?",
                a: "Sí. Las páginas del PDF final aparecerán exactamente en el orden en que ves las tarjetas. Puedes reordenarlas arrastrando o usando las flechas antes de fusionar. / Yes. The final PDF pages appear exactly in the order shown on screen.",
              },
              {
                q: "¿Mis PDFs se suben a algún servidor? / Are my PDFs uploaded to any server?",
                a: "No. Todo el procesamiento ocurre en tu navegador usando la librería pdf-lib. Tus documentos nunca abandonan tu dispositivo y no se envía nada a ningún servidor externo. / No. Everything runs locally in the browser. Your files never leave your device.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="mb-2 font-semibold text-white">{item.q}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 glass rounded-2xl border border-border/20 p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-white">
            Incrusta en tu web / Embed on your website
          </h2>
          <p className="mb-4 text-sm text-text-muted">
            Integra este fusionador de PDFs en cualquier página web con un simple iframe:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-surface/80 p-4 text-xs text-text-muted">
            <code>{`<iframe
  src="${EMBED_URL}"
  width="100%"
  height="700"
  frameborder="0"
  loading="lazy"
  style="border-radius:12px"
  title="PDF Merge — MACM"
></iframe>`}</code>
          </pre>
          <p className="mt-3 text-xs text-text-muted/60">
            Herramienta embebible gracias a <code className="text-primary/80">frame-ancestors *</code>.
            Sin cookies, sin tracking, 100% gratuita.
          </p>
        </div>

      </div>
    </main>
  );
}
