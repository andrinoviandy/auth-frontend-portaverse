import { Loader } from "@mantine/core";
import clsx from "clsx"
import {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import NoItems from "../Errors/NoItems";
import TableTemplate from "./TableTemplates";

const ScrollableTableTemplate = forwardRef(
  (
    {
      tHeads,
      tRows,
      isLoading,
      isLoadingNextScroll,
      isNoItem,
      noItemLabel,
      variant = "default",
      infiniteScroll = false,
      maxHeight = "325px",
      width = 2000,
      classNames = { table: "", thead: "", tbody: "" },
      styles = { table: "", thead: "", tbody: "" },
    },
    ref,
  ) => {
    const containerRef = ref || useRef(null);
    const hScrollbarRef = useRef(null);
    const [xScrollMargin, setXScrollMargin] = useState(0);
    const [tableWidth, setTableWidth] = useState(0);
    const [isMaxAncestorWidth, setIsMaxAncestorWidth] =
      useState(false);

    const [rootWidth, setRootWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const rootRef = useCallback((node) => {
      const ancestor = node?.parentElement;

      if (!ancestor) setIsMaxAncestorWidth(false);
      const table = node?.querySelector("table");
      const tableW = width === "fit" ? table?.scrollWidth : width;

      setTableWidth(tableW);
      setIsMaxAncestorWidth(ancestor?.offsetWidth >= tableW);
      setRootWidth(node?.offsetWidth);
      setContainerWidth(node?.children?.[0]?.offsetWidth);
    }, []);

    const tableRef = useCallback((node) => {
      const stickyThs = node?.querySelectorAll("th.sticky");
      const stickyThsWidth = Array.from(stickyThs || []).reduce(
        (acc, curr) => acc + curr.offsetWidth,
        0,
      );
      setXScrollMargin(stickyThsWidth);
    }, []);

    const handleScrollX = (e) => {
      hScrollbarRef.current.scrollLeft = e.target.scrollLeft;
      containerRef.current.scrollLeft = e.target.scrollLeft;
    };

    const getClassNames = useMemo(() => {
      return {
        table: clsx(classNames.table),
        thead: clsx(
          classNames.thead,
          infiniteScroll && "sticky top-0 z-[2]",
        ),
        tbody: clsx(classNames.tbody),
      };
    }, [classNames]);

    const getStyles = useMemo(() => {
      return {
        table: {
          ...styles.table,
          ...(infiniteScroll ? { maxHeight, zIndex: 1 } : {}),
        },
        thead: { ...styles.thead },
        tbody: { ...styles.tbody },
      };
    }, [styles]);

    const [mouseCoords, setMouseCoords] = useState({
      isScrolling: false,
      clientX: 0,
      scrollX: 0,
    });

    const handleDragStart = (e) => {
      setMouseCoords((prev) => ({
        ...prev,
        isScrolling: true,
        clientX:
          e?.clientX || e?.targetTouches?.[0]
            ? -1 * e?.targetTouches?.[0]?.pageX
            : -1 *
              e?.changedTouches?.[e.changedTouches.length - 1]?.pageX,
      }));
    };
    const handleDragEnd = () => {
      setMouseCoords((prev) => ({
        ...prev,
        isScrolling: false,
      }));
    };
    const handleDrag = (e) => {
      const { clientX, scrollX } = mouseCoords;

      const eventClientX =
        e?.clientX ||
        (e?.targetTouches?.[0]
          ? -1 * e?.targetTouches?.[0]?.pageX
          : -1 *
            e?.changedTouches?.[e.changedTouches.length - 1]?.pageX);

      if (mouseCoords.isScrolling) {
        const newScrollLeft = (() => {
          const tmpScroll = scrollX + eventClientX - clientX;
          if (tmpScroll < 0) return 0;
          if (
            tmpScroll >
            containerRef.current.scrollWidth -
              containerRef.current.offsetWidth
          )
            return (
              containerRef.current.scrollWidth -
              containerRef.current.offsetWidth
            );
          return tmpScroll;
        })();

        containerRef.current.scrollLeft = newScrollLeft;
        hScrollbarRef.current.scrollLeft = newScrollLeft;
        setMouseCoords((prev) => ({
          ...prev,
          scrollX: newScrollLeft,
          clientX: eventClientX,
        }));
      }
    };

    if (isLoading) {
      return (
        <div className="flex items-center justify-center w-full my-44">
          <Loader />
        </div>
      );
    }

    return (
      <div ref={rootRef} className="relative pr-2">
        <div
          ref={containerRef}
          className="block overflow-y-scroll overflow-x-scroll scroll-style-3 hide-scrollbar-x"
          onScroll={handleScrollX}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onTouchMove={handleDrag}
          style={{
            maxHeight: infiniteScroll
              ? `calc(${maxHeight} - 25px)`
              : "auto",
          }}
        >
          <div
            style={{
              width: isMaxAncestorWidth
                ? rootWidth
                : width === "fit"
                ? tableWidth
                : width,
            }}
          >
            <TableTemplate
              ref={tableRef}
              variant={variant}
              classNames={getClassNames}
              styles={getStyles}
              tHeads={tHeads}
              tRows={tRows}
            />
          </div>
        </div>

        {/* Scrollbar Horizontal */}
        {!isMaxAncestorWidth && (
          <div
            ref={hScrollbarRef}
            onScroll={handleScrollX}
            className="overflow-x-scroll scroll-style-3"
            style={{
              marginLeft: xScrollMargin,
              maxWidth: containerRef?.target?.offsetWidth,
            }}
          >
            <div
              style={{
                width:
                  (width === "fit" ? tableWidth : width) -
                  xScrollMargin,
                height: 2,
              }}
            />
          </div>
        )}

        {isLoadingNextScroll && (
          <div className="flex items-center justify-center w-full my-5">
            <Loader />
          </div>
        )}

        {(() => {
          if (!isLoading && isNoItem) {
            return (
              <div className="flex items-center justify-center w-full my-5">
                <NoItems
                  label={noItemLabel}
                  classNames={{
                    icon: "w-[80px] h-[80px]",
                    label: "text-lg",
                  }}
                />
              </div>
            );
          }
          return null;
        })()}
      </div>
    );
  },
);

export default ScrollableTableTemplate;
