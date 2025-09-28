import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ShadowRootContainer = ({ children }) => {
  const hostRef = useRef(null);
  const [shadowRoot, setShadowRoot] = useState(null);

  useEffect(() => {
    if (hostRef.current && !shadowRoot) {
      // Attach shadow DOM in open mode
      const root = hostRef.current.attachShadow({ mode: "open" });
      setShadowRoot(root);
    }
  }, [shadowRoot]);

  return (
    <div ref={hostRef}>
      {shadowRoot ? createPortal(children, shadowRoot) : null}
    </div>
  );
};
export default ShadowRootContainer;
