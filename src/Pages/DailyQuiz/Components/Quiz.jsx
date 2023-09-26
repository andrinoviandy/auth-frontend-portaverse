/* eslint-disable react/prop-types */
import { Divider, Radio, Text, Tooltip, clsx } from "@mantine/core";
import dayjs from "dayjs";
import { color } from "../../../Utils/Constants";
import trimString from "../../../Utils/Helpers/trimString";

function QuizOption({
  optionId,
  label,
  selected = false,
  onChange = () => null,
}) {
  return (
    <div
      role="button"
      tabIndex="-1"
      onMouseDown={() => onChange(optionId)}
      key={optionId}
      className={clsx(
        "p-3 rounded border cursor-pointer",
        selected ? "border-primary3" : "border-lightGrey",
      )}
    >
      <Radio label={label} checked={selected} />
    </div>
  );
}

function Quiz({
  targetEmployee,
  targetEmployeeString,
  question = "",
  options = [],
  answerId,
  onChangeAnswer = () => null,
}) {
  return (
    <div>
      <div className="flex justify-between">
        <Text className="text-sm font-bold text-coffee">
          DAILY QUIZ
        </Text>
        <Text className="text-sm text-coffee">
          {dayjs(new Date()).format("DD MMMM YYYY")}
        </Text>
      </div>
      <Text className="flex items-center mt-4 text-sm font-medium text-darkGrey">
        Target peserta:{" "}
        <Tooltip
          label={targetEmployee}
          color={color.primary3}
          withArrow
        >
          <span className="font-semibold text-primary3 truncate max-w-[240px] block ml-1">
            {targetEmployeeString
              ? trimString(targetEmployeeString, 240)
              : "-"}
          </span>
        </Tooltip>
      </Text>
      <Divider my="sm" className="my-3" color={color.lightGrey} />
      <Text className="mb-4 text-base font-medium text-black">
        {question}
      </Text>
      <div className="grid grid-cols-1 gap-4">
        {options?.map((opt) => (
          <QuizOption
            optionId={opt?.option_id}
            label={opt?.text}
            onChange={(id) => onChangeAnswer(id)}
            selected={answerId === opt?.option_id}
          />
        ))}
      </div>
    </div>
  );
}

export default Quiz;
