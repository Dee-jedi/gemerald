import { useEffect, useLayoutEffect, useRef } from "react";

const fitToContent = (el) => {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight + (el.offsetHeight - el.clientHeight)}px`;
};

// Textarea that grows with its content instead of scrolling or showing a
// resize handle. `minRows` sets the starting height.
const AutoTextarea = ({ value, minRows = 3, className = "", ...props }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) fitToContent(ref.current);
  }, [value]);

  // Line wrapping changes with width, so refit when the window resizes.
  useEffect(() => {
    const onResize = () => ref.current && fitToContent(ref.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <textarea
      ref={ref}
      rows={minRows}
      value={value}
      className={`resize-none overflow-hidden ${className}`}
      {...props}
    />
  );
};

export default AutoTextarea;
