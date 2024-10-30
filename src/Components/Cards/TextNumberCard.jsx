import clsx from "clsx"

export default function TextNumberCard({
  title,
  value,
  styles = { root: {}, value: {} },
  classNames = { root: "", value: "" },
}) {
  return (
    <div
      style={styles.root}
      className={clsx(
        "border rounded-md p-3 flex flex-col min-h-[150px]",
        classNames.root,
      )}
    >
      <p className="text font-semibold text-darkGrey">{title}</p>
      <p
        style={styles.value}
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
