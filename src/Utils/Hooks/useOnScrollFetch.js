import { useEffect } from "react";

export default function useOnScrollFetch(
  hasNextPage,
  fetchNextPage,
  containerRef = null,
  direction = "vertical",
) {
  useEffect(() => {
    let fetching = false;
    const element = containerRef ? containerRef.current : document;

    const onScroll = async (e) => {
      const {
        scrollHeight,
        scrollWidth,
        scrollTop,
        scrollLeft,
        clientHeight,
        clientWidth,
      } = containerRef
        ? containerRef.current
        : e.target.scrollingElement;

      const triggerCond = (() => {
        switch (direction) {
          case "horizontal":
            return scrollWidth - scrollLeft <= clientWidth * 1.25;
          case "vertical":
          default:
            return scrollHeight - scrollTop <= clientHeight * 1.25;
        }
      })();

      if (!fetching && triggerCond) {
        fetching = true;

        if (hasNextPage) await fetchNextPage();

        fetching = false;
      }
    };

    element?.addEventListener("scroll", onScroll);

    return () => {
      element?.removeEventListener("scroll", onScroll);
    };
  }, [hasNextPage]);
}
