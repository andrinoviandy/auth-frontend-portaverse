/* eslint-disable react/prop-types */
import { Popover } from "@mantine/core";
import { Icon } from "@iconify/react";
import MonthlyView from "./MonthlyView";

export default function Monthly({ data, setData }) {
  return (
    <Popover width={280} shadow="md" position="right">
      <Popover.Target>
        <div className="p-1 w-full flex justify-between">
          <div>Monthly</div>
          <div>
            <Icon
              fontSize={13}
              icon="material-symbols:arrow-forward-ios-rounded"
              style={{ marginTop: "3px" }}
            />
          </div>
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <div>
          <MonthlyView data={data} setData={setData} />
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
