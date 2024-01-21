import { Loader, clsx } from "@mantine/core";
import PropTypes from "prop-types";
import { forwardRef, useMemo } from "react";
import NoItems from "../Errors/NoItems";

/**
 *@param tHeads Table header html elements.
 *@param tRows Table row html elements.
 *@param isLoadingData Boolean value to check if data is loading.
 *@param isNoItem Boolean value to check if data is empty.
 *@param noItemLabel String value to display if data is empty.
 *@param variant String value to customize the component.
 *@param classNames Object of classNames to customize the component.
 * */
const TableTemplate = forwardRef(
  (
    {
      tHeads,
      tRows,
      isLoading,
      isNoItem,
      noItemLabel,
      variant = "default",
      classNames = { table: "", thead: "", tbody: "" },
    },
    ref,
  ) => {
    const variantClassNames = useMemo(() => {
      switch (variant) {
        case "outline":
          return {
            table: "border-0",
            thead:
              "[&>tr>th]:pb-5 [&>tr>th]:px-3 [&>tr>th]:text-start [&>tr>th]:font-medium border-b text-darkGrey uppercase text-start text-sm font-normal [&>tr>th]:bg-white",
            tbody:
              "[&>tr>*]:border-0 [&>tr>*]:border-b [&>tr>*]:px-3 [&>tr>*]:py-4",
          };
        case "default":
          return {
            table: "table-auto border-collapse",
            thead: "",
            tbody: "text-sm",
          };
        default:
          return {
            table: "",
            thead: "",
            tbody: "",
          };
      }
    }, [variant]);

    return (
      <>
        <table
          ref={ref}
          style={{ width: "100%" }}
          className={clsx(variantClassNames.table, classNames.table)}
        >
          <thead
            className={clsx(
              variantClassNames.thead,
              classNames.thead,
            )}
          >
            {tHeads}
          </thead>
          <tbody
            className={clsx(
              variantClassNames.tbody,
              classNames.tbody,
            )}
          >
            {!isLoading && !isNoItem && tRows}
          </tbody>
        </table>
        {(() => {
          if (isLoading) {
            return (
              <div className="flex items-center justify-center w-full my-5">
                <Loader />
              </div>
            );
          }
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
      </>
    );
  },
);

export default TableTemplate;

TableTemplate.propTypes = {
  tHeads: PropTypes.element.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tRows: PropTypes.any,
  isLoading: PropTypes.bool,
  isNoItem: PropTypes.bool,
  noItemLabel: PropTypes.string,
  variant: PropTypes.string,
  classNames: PropTypes.oneOfType([PropTypes.object]),
};

TableTemplate.defaultProps = {
  isLoading: false,
  isNoItem: false,
  noItemLabel: "No items yet",
  variant: "default",
  classNames: { table: "", thead: "", tbody: "" },
  tRows: null,
};
