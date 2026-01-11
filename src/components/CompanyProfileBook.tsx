import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MAX_PAGE_WIDTH = 360;
const MIN_PAGE_WIDTH = 200;
const FLIP_DURATION = 1.1;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function safePage(n: number, max: number) {
  return n >= 1 && n <= max ? n : null;
}

const CompanyProfileBook = () => {
  const { language } = useLanguage();

  const [numPages, setNumPages] = useState<number>(0);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  // Fit book height to actual PDF aspect ratio (removes empty space)
  const [pdfPageHeight, setPdfPageHeight] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState(MAX_PAGE_WIDTH);

  // Staging to avoid white flash / dropped frame after flip
  const [fromSpread, setFromSpread] = useState<number | null>(null);
  const [toSpread, setToSpread] = useState<number | null>(null);
  const [settling, setSettling] = useState(false);
  const [toRendered, setToRendered] = useState({ left: false, right: false });

  const outerRef = useRef<HTMLDivElement | null>(null);
  const flip = useMotionValue(0);

  const pdfSource = language === "ar" ? "/company-profile-ar.pdf" : "/company-profile-en.pdf";

  const dpr = useMemo(() => {
    if (typeof window === "undefined") return 1;
    // cap for smoothness on mid devices
    return Math.min(window.devicePixelRatio || 1, 1.5);
  }, []);

  useEffect(() => {
    setLoading(true);
    setCurrentSpread(0);
    setPdfPageHeight(null);
    setFromSpread(null);
    setToSpread(null);
    setSettling(false);
    setToRendered({ left: false, right: false });
    setIsFlipping(false);
    flip.set(0);
  }, [pdfSource, flip]);

  useEffect(() => {
    if (!outerRef.current) return;
    const el = outerRef.current;
    const ro = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width;
      const target = Math.floor((available - 100) / 2);
      setPageWidth(clamp(target, MIN_PAGE_WIDTH, MAX_PAGE_WIDTH));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const totalSpreads = Math.ceil(numPages / 2);

  const bookWidth = pageWidth * 2;
  const bookHeight = pdfPageHeight || Math.round(pageWidth * 1.414);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentSpread(0);
    setFromSpread(null);
    setToSpread(null);
    setSettling(false);
    setToRendered({ left: false, right: false });
    setLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("Error loading PDF:", error);
    setLoading(false);
  }, []);

  const onAnyPageLoadSuccess = useCallback(
    (page: { originalHeight: number; originalWidth: number }) => {
      const aspect = page.originalWidth / page.originalHeight;
      const h = Math.round(pageWidth / aspect);
      setPdfPageHeight((prev) => (prev == null || Math.abs(prev - h) > 2 ? h : prev));
    },
    [pageWidth]
  );

  const startFlip = useCallback(
    (dir: "next" | "prev") => {
      if (loading || isFlipping) return;
      if (dir === "next" && currentSpread >= totalSpreads - 1) return;
      if (dir === "prev" && currentSpread <= 0) return;

      const target = dir === "next" ? currentSpread + 1 : currentSpread - 1;

      setFlipDirection(dir);
      setFromSpread(currentSpread);
      setToSpread(target);
      setToRendered({ left: false, right: false });
      setSettling(false);
      setIsFlipping(true);
      flip.set(0);

      animate(flip, 1, {
        duration: FLIP_DURATION,
        ease: [0.33, 0, 0.2, 1],
        onComplete: () => {
          // Switch to target spread but keep flipping sheet on top until target pages render.
          requestAnimationFrame(() => {
            setCurrentSpread(target);
            setSettling(true);
            flip.set(1);
          });
        },
      });
    },
    [loading, isFlipping, currentSpread, totalSpreads, flip]
  );

  const markToRendered = useCallback(
    (side: "left" | "right", pageNumber: number | null) => {
      if (toSpread == null) return;
      if (pageNumber == null) {
        // Null page means it doesn't exist; mark it as rendered automatically
        setToRendered((prev) => (prev[side] ? prev : { ...prev, [side]: true }));
        return;
      }
      const expected = side === "left" ? toSpread * 2 + 1 : toSpread * 2 + 2;
      if (pageNumber !== expected) return;
      setToRendered((prev) => (prev[side] ? prev : { ...prev, [side]: true }));
    },
    [toSpread]
  );

  // When settling, mark non-existent pages as rendered immediately
  useEffect(() => {
    if (!settling || toSpread == null) return;
    const expectedLeft = toSpread * 2 + 1;
    const expectedRight = toSpread * 2 + 2;
    if (expectedLeft > numPages) {
      setToRendered((prev) => ({ ...prev, left: true }));
    }
    if (expectedRight > numPages) {
      setToRendered((prev) => ({ ...prev, right: true }));
    }
  }, [settling, toSpread, numPages]);

  useEffect(() => {
    if (!settling) return;

    const finalize = () => {
      setIsFlipping(false);
      setSettling(false);
      setFromSpread(null);
      setToSpread(null);
      setToRendered({ left: false, right: false });
      flip.set(0);
    };

    // If react-pdf never fires onRenderSuccess (some browsers/caching), don't get stuck.
    const fallback = window.setTimeout(() => {
      requestAnimationFrame(finalize);
    }, 900);

    if (toRendered.left && toRendered.right) {
      window.clearTimeout(fallback);
      requestAnimationFrame(finalize);
    }

    return () => window.clearTimeout(fallback);
  }, [settling, toRendered.left, toRendered.right, flip]);

  const effectiveFrom = fromSpread ?? currentSpread;
  const effectiveTo = toSpread ?? currentSpread;

  const fromLeft = safePage(effectiveFrom * 2 + 1, numPages);
  const fromRight = safePage(effectiveFrom * 2 + 2, numPages);
  const toLeft = safePage(effectiveTo * 2 + 1, numPages);
  const toRight = safePage(effectiveTo * 2 + 2, numPages);

  // What the static (under) pages show during flip
  const displayLeft = !isFlipping
    ? fromLeft
    : flipDirection === "next"
      ? (settling ? toLeft : fromLeft)
      : toLeft;

  const displayRight = !isFlipping
    ? fromRight
    : flipDirection === "next"
      ? toRight
      : (settling ? toRight : fromRight);

  // Flipping sheet content (front/back)
  const flipFront = flipDirection === "next" ? fromRight : fromLeft;
  const flipBack = flipDirection === "next" ? toLeft : toRight;

  // Motion values (perf friendly)
  const rotateY = useTransform(flip, (v) => (flipDirection === "next" ? -180 * v : 180 * v));
  const liftZ = useTransform(flip, [0, 0.5, 1], [0, 14, 0]);
  const shadowAlpha = useTransform(flip, [0, 0.5, 1], [0, 0.14, 0]);

  return (
    <section className="py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-3">
            <BookOpen className="w-4 h-4" />
            {language === "ar" ? "ملف الشركة" : "Company Profile"}
          </div>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-1">{language === "ar" ? "تعرف علينا أكثر" : "Get to Know Us"}</h2>
          <p className="text-muted-foreground text-sm">{language === "ar" ? "استعرض ملفنا التعريفي الكامل" : "Browse through our complete company profile"}</p>
        </motion.div>

        <div ref={outerRef} className="relative flex items-center justify-center" dir="ltr">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => startFlip("prev")}
            disabled={currentSpread === 0 || isFlipping || loading}
            className="absolute left-1 md:left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-background/90 backdrop-blur hover:bg-accent hover:text-accent-foreground shadow-lg disabled:opacity-20 border border-border/50"
            aria-label={language === "ar" ? "السابق" : "Previous"}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => startFlip("next")}
            disabled={currentSpread >= totalSpreads - 1 || isFlipping || loading}
            className="absolute right-1 md:right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-background/90 backdrop-blur hover:bg-accent hover:text-accent-foreground shadow-lg disabled:opacity-20 border border-border/50"
            aria-label={language === "ar" ? "التالي" : "Next"}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          <motion.div initial={{ opacity: 0, scale: 0.985 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative mx-14 md:mx-20" style={{ perspective: 1800 }}>
            {/* Surface shadow */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2"
              style={{
                width: bookWidth * 0.85,
                height: 16,
                background: "radial-gradient(ellipse, hsl(var(--foreground) / 0.25) 0%, transparent 70%)",
                filter: "blur(10px)",
              }}
            />

            <div style={{ transformStyle: "preserve-3d", transform: "rotateX(5deg)" }}>
              {/* Page edges */}
              <div className="absolute top-1 bottom-1 w-1.5" style={{ right: -6, transform: "translateZ(-6px)", background: "linear-gradient(to right, hsl(var(--muted) / 0.7), hsl(var(--muted) / 0.35))" }} />

              <div
                className="relative overflow-hidden rounded-sm bg-background"
                style={{
                  width: bookWidth,
                  height: bookHeight,
                  boxShadow: "0 20px 40px -15px hsl(var(--foreground) / 0.28), 0 8px 16px -8px hsl(var(--foreground) / 0.16)",
                }}
              >
                <div className="absolute inset-0 border border-border/40 rounded-sm pointer-events-none z-40" />

                {/* Studio lighting + subtle reflections */}
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 18% 10%, hsl(var(--foreground) / 0.08) 0%, transparent 55%), linear-gradient(135deg, hsl(var(--foreground) / 0.06) 0%, transparent 38%)",
                  }}
                />

                {/* Center fold */}
                <div className="absolute left-1/2 top-0 bottom-0 w-6 -translate-x-1/2 z-30 pointer-events-none">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, hsl(var(--foreground) / 0.08) 45%, hsl(var(--foreground) / 0.12) 50%, hsl(var(--foreground) / 0.08) 55%, transparent)",
                    }}
                  />
                </div>

                <Document
                  file={pdfSource}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex items-center justify-center bg-muted/10" style={{ width: bookWidth, height: bookHeight }}>
                      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                  error={
                    <div className="flex items-center justify-center bg-muted/10" style={{ width: bookWidth, height: bookHeight }}>
                      <p className="text-muted-foreground text-sm">{language === "ar" ? "خطأ في التحميل" : "Error loading PDF"}</p>
                    </div>
                  }
                >
                  <div className="relative flex" style={{ width: bookWidth, height: bookHeight, transformStyle: "preserve-3d" }}>
                    {/* Pre-render target spread pages (prevents white flash and stuck settling) */}
                    {toSpread != null && (
                      <div className="absolute inset-0 opacity-0 pointer-events-none" aria-hidden="true">
                        {toLeft && (
                          <Page
                            key={`pre-left-${toLeft}-${pageWidth}`}
                            pageNumber={toLeft}
                            width={pageWidth}
                            devicePixelRatio={dpr}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            onRenderSuccess={() => markToRendered("left", toLeft)}
                          />
                        )}
                        {toRight && (
                          <Page
                            key={`pre-right-${toRight}-${pageWidth}`}
                            pageNumber={toRight}
                            width={pageWidth}
                            devicePixelRatio={dpr}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            onRenderSuccess={() => markToRendered("right", toRight)}
                          />
                        )}
                      </div>
                    )}

                    {/* Left page */}
                    <div className="relative overflow-hidden" style={{ width: pageWidth, height: bookHeight }}>
                      {displayLeft ? (
                        <Page
                          key={`left-${displayLeft}-${pageWidth}`}
                          pageNumber={displayLeft}
                          width={pageWidth}
                          devicePixelRatio={dpr}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          onLoadSuccess={onAnyPageLoadSuccess}
                          onRenderSuccess={() => markToRendered("left", displayLeft)}
                        />
                      ) : (
                        <div className="w-full h-full bg-background" />
                      )}
                      <div className="absolute top-0 right-0 bottom-0 w-10 pointer-events-none" style={{ background: "linear-gradient(to left, hsl(var(--foreground) / 0.06), transparent)" }} />
                    </div>

                    {/* Right page */}
                    <div className="relative overflow-hidden" style={{ width: pageWidth, height: bookHeight }}>
                      {displayRight ? (
                        <Page
                          key={`right-${displayRight}-${pageWidth}`}
                          pageNumber={displayRight}
                          width={pageWidth}
                          devicePixelRatio={dpr}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          onLoadSuccess={onAnyPageLoadSuccess}
                          onRenderSuccess={() => markToRendered("right", displayRight)}
                        />
                      ) : (
                        <div className="w-full h-full bg-background" />
                      )}
                      <div className="absolute top-0 left-0 bottom-0 w-10 pointer-events-none" style={{ background: "linear-gradient(to right, hsl(var(--foreground) / 0.06), transparent)" }} />
                    </div>

                    {/* Flipping sheet */}
                    {isFlipping && (
                      <>
                        {/* Cast shadow */}
                        <motion.div
                          className="absolute top-0 bottom-0 pointer-events-none"
                          style={{
                            width: pageWidth * 0.55,
                            left: flipDirection === "next" ? pageWidth * 0.78 : pageWidth * 0.18,
                            opacity: shadowAlpha,
                            background: "hsl(var(--foreground) / 0.45)",
                            filter: "blur(12px)",
                          }}
                        />

                        <motion.div
                          className="absolute top-0 h-full z-20"
                          style={{
                            width: pageWidth,
                            left: flipDirection === "next" ? pageWidth : 0,
                            transformStyle: "preserve-3d",
                            transformOrigin: flipDirection === "next" ? "left center" : "right center",
                            rotateY,
                            z: liftZ,
                            willChange: "transform",
                          }}
                        >
                          {/* Front */}
                          <div className="absolute inset-0 overflow-hidden bg-background" style={{ backfaceVisibility: "hidden" }}>
                            {flipFront ? (
                              <Page key={`flip-front-${flipFront}-${pageWidth}`} pageNumber={flipFront} width={pageWidth} devicePixelRatio={dpr} renderTextLayer={false} renderAnnotationLayer={false} />
                            ) : (
                              <div className="w-full h-full bg-background" />
                            )}
                            <motion.div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background:
                                  flipDirection === "next"
                                    ? "linear-gradient(to left, transparent, hsl(var(--foreground) / 0.10))"
                                    : "linear-gradient(to right, transparent, hsl(var(--foreground) / 0.10))",
                                opacity: shadowAlpha,
                              }}
                            />
                            {/* Specular */}
                            <div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background: "linear-gradient(135deg, transparent 0%, hsl(var(--foreground) / 0.06) 42%, transparent 75%)",
                              }}
                            />
                          </div>

                          {/* Back */}
                          <div className="absolute inset-0 overflow-hidden bg-background" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                            {flipBack ? (
                              <Page key={`flip-back-${flipBack}-${pageWidth}`} pageNumber={flipBack} width={pageWidth} devicePixelRatio={dpr} renderTextLayer={false} renderAnnotationLayer={false} />
                            ) : (
                              <div className="w-full h-full bg-background" />
                            )}
                            <motion.div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background:
                                  flipDirection === "next"
                                    ? "linear-gradient(to right, transparent, hsl(var(--foreground) / 0.08))"
                                    : "linear-gradient(to left, transparent, hsl(var(--foreground) / 0.08))",
                                opacity: shadowAlpha,
                              }}
                            />
                          </div>
                        </motion.div>
                      </>
                    )}
                  </div>
                </Document>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mt-4">
          <span className="text-xs text-muted-foreground">{currentSpread + 1} / {totalSpreads || 1}</span>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfileBook;
