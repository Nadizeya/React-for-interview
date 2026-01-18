import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * CopyDom
 * - Clones an existing DOM node (by selector)
 * - Renders the clone inside a React Portal
 * - Keeps it in sync using MutationObserver
 *
 * Limitations:
 * - Event listeners from the original DOM are NOT copied
 * - IDs are stripped to avoid duplicates
 */
export default function CopyDom({
  sourceSelector,
  portalRootId = "portal-root",
}) {
  const [clone, setClone] = useState(null);
  const observerRef = useRef(null);

  // Ensure portal root exists
  const portalRoot = useMemo(() => {
    let el = document.getElementById(portalRootId);
    if (!el) {
      el = document.createElement("div");
      el.id = portalRootId;
      document.body.appendChild(el);
    }
    return el;
  }, [portalRootId]);

  useEffect(() => {
    const source = document.querySelector(sourceSelector);
    if (!source) {
      setClone(null);
      return;
    }

    const updateClone = () => {
      const next = source.cloneNode(true);

      // Remove duplicate IDs
      if (next.removeAttribute) next.removeAttribute("id");
      next.querySelectorAll?.("[id]").forEach((n) => n.removeAttribute("id"));

      setClone(next);
    };

    updateClone();

    observerRef.current?.disconnect();
    observerRef.current = new MutationObserver(updateClone);
    observerRef.current.observe(source, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observerRef.current?.disconnect();
  }, [sourceSelector]);

  if (!clone) return null;

  return createPortal(<DomNodeMount node={clone} />, portalRoot);
}

/**
 * Imperatively mounts a real DOM node inside React
 */
function DomNodeMount({ node }) {
  const ref = useRef(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    host.innerHTML = "";
    host.appendChild(node);

    return () => {
      if (host.contains(node)) host.removeChild(node);
    };
  }, [node]);

  return <div ref={ref} />;
}
