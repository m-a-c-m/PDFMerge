"use client";

import { useState, useRef, useCallback } from "react";
import { FiUpload, FiDownload, FiTrash2, FiChevronUp, FiChevronDown, FiX } from "react-icons/fi";
import { MdPictureAsPdf } from "react-icons/md";

interface Props {
  locale?: string;
}

interface PDFItem {
  id: string;
  file: File;
  name: string;
  size: number;
}

export default function PDFMerge({ locale = "es" }: Props) {
  const isEs = locale === "es";

  const [pdfs, setPdfs] = useState<PDFItem[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    setError(null);
    const accepted = Array.from(files).filter((f) => f.type === "application/pdf");
    if (!accepted.length) return;
    const newItems: PDFItem[] = accepted.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      name: f.name,
      size: f.size,
    }));
    setPdfs((prev) => [...prev, ...newItems]);
  }, []);

  const remove = (id: string) => setPdfs((prev) => prev.filter((p) => p.id !== id));

  const move = (idx: number, dir: -1 | 1) => {
    setPdfs((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const handleDragStart = (idx: number) => setDragIndex(idx);
  const handleDragOver = (idx: number, e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(idx);
  };
  const handleDrop = (idx: number) => {
    if (dragIndex === null || dragIndex === idx) return;
    setPdfs((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    setDragIndex(null);
    setDragOverIndex(null);
  };
  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const merge = useCallback(async () => {
    if (pdfs.length < 2) return;
    setMerging(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();

      for (const item of pdfs) {
        const bytes = await item.file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }

      const outBytes = await merged.save();
      const blob = new Blob([outBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(isEs ? "Error al fusionar los PDFs. Comprueba que no estén protegidos." : "Error merging PDFs. Make sure they are not password-protected.");
    } finally {
      setMerging(false);
    }
  }, [pdfs, isEs]);

  const totalSize = pdfs.reduce((acc, p) => acc + p.size, 0);

  return (
    <div className="flex flex-col gap-4">
      <div
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border/40 bg-surface/20 p-8 transition-colors hover:border-primary/40 hover:bg-primary/5"
      >
        <FiUpload className="text-3xl text-text-muted/60" />
        <div className="text-center">
          <p className="text-sm font-medium text-text-muted">
            {isEs ? "Arrastra los PDFs aquí o haz clic para seleccionarlos" : "Drag PDFs here or click to select them"}
          </p>
          <p className="mt-1 text-xs text-text-muted/50">{isEs ? "Solo archivos PDF" : "PDF files only"}</p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {pdfs.length > 0 && (
        <>
          <div className="space-y-2">
            {pdfs.map((pdf, idx) => (
              <div
                key={pdf.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(idx, e)}
                onDrop={() => handleDrop(idx)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 rounded-xl border bg-surface/40 px-4 py-3 transition-all cursor-grab active:cursor-grabbing ${
                  dragOverIndex === idx && dragIndex !== idx ? "border-primary scale-[1.01]" : "border-border/30"
                }`}
              >
                <MdPictureAsPdf className="shrink-0 text-2xl text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text">{pdf.name}</p>
                  <p className="text-xs text-text-muted/60">{(pdf.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  {idx + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(idx, -1)} disabled={idx === 0} className="rounded p-1 text-text-muted hover:text-text disabled:opacity-30">
                    <FiChevronUp className="text-sm" />
                  </button>
                  <button onClick={() => move(idx, 1)} disabled={idx === pdfs.length - 1} className="rounded p-1 text-text-muted hover:text-text disabled:opacity-30">
                    <FiChevronDown className="text-sm" />
                  </button>
                  <button onClick={() => remove(pdf.id)} className="rounded p-1 text-text-muted hover:text-red-400">
                    <FiX className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted/70">
              <span>
                <span className="text-primary font-medium">{pdfs.length}</span>{" "}
                {isEs ? "archivos" : "files"}
              </span>
              <span>
                <span className="text-primary font-medium">{(totalSize / 1024 / 1024).toFixed(2)}</span> MB {isEs ? "en total" : "total"}
              </span>
              <span className="text-text-muted/40">
                {isEs ? "Arrastra para reordenar" : "Drag to reorder"}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPdfs([])}
                className="flex items-center gap-1 rounded-xl border border-border/40 bg-surface/60 px-3 py-2 text-xs text-text-muted transition-colors hover:border-red-500/40 hover:text-red-400"
              >
                <FiTrash2 className="text-xs" />
                {isEs ? "Limpiar" : "Clear"}
              </button>
              <button
                onClick={merge}
                disabled={merging || pdfs.length < 2}
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <FiDownload />
                {merging ? (isEs ? "Fusionando…" : "Merging…") : (isEs ? "Fusionar y descargar" : "Merge & download")}
              </button>
            </div>
          </div>

          {pdfs.length < 2 && (
            <p className="text-center text-xs text-amber-400/80">
              {isEs ? "Añade al menos 2 PDFs para poder fusionarlos." : "Add at least 2 PDFs to merge them."}
            </p>
          )}
        </>
      )}

      {pdfs.length === 0 && (
        <p className="text-center text-sm text-text-muted/40">
          {isEs
            ? "Sube dos o más PDFs y ordénalos. El PDF resultante mantendrá el orden que elijas."
            : "Upload two or more PDFs and order them. The resulting PDF will keep the order you choose."}
        </p>
      )}
    </div>
  );
}
