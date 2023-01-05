import { useCallback, useRef } from "react";

export default function useInfiniteFetchObserver(
  status,
  hasNextPage,
  fetchNextPage,
) {
  const observer = useRef();

  const lastElement = useCallback(
    (node) => {
      if (status === "loading") return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          await fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [status, hasNextPage],
  );

  return lastElement;
}
