import { useEffect } from "react";

/**
 * Sets the document title for a page. Kept dependency-free rather than
 * pulling in a metadata library, since the site only needs a title
 * and description per route.
 */
export default function PageTitle({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} — MCNations`;

    let metaEl: HTMLMetaElement | null = null;
    let prevDescription: string | null = null;
    if (description) {
      metaEl = document.querySelector('meta[name="description"]');
      if (metaEl) {
        prevDescription = metaEl.getAttribute("content");
        metaEl.setAttribute("content", description);
      }
    }

    return () => {
      document.title = prev;
      if (metaEl && prevDescription !== null) {
        metaEl.setAttribute("content", prevDescription);
      }
    };
  }, [title, description]);

  return null;
}
