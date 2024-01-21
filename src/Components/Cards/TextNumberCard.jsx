import { clsx } from "@mantine/core";

export default function TextNumberCard({
  title,
  value,
  classNames = { root: "", value: "" },
}) {
  return (
    <div
      className={clsx(
        "border rounded-md p-3 flex flex-col min-h-[150px]",
        classNames.root,
      )}
    >
      <p className="text font-semibold text-darkGrey">{title}</p>
      <p
        className={clsx(
          "text-3xl font-bold m-auto",
          classNames.value,
        )}
      >
        {value}
      </p>
    </div>
  );
}
