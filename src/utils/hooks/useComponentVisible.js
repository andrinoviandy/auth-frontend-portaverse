import { useState, useEffect, useRef } from "react";

export default function useComponentVisible() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef(null);

  const HandleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", HandleClickOutside, true);

    return () => {
      document.removeEventListener("click", HandleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
