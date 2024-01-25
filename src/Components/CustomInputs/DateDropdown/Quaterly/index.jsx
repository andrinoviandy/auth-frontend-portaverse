/* eslint-disable react/prop-types */
import { Popover } from "@mantine/core";
import { Icon } from "@iconify/react";
import QuaterlyView from "./QuaterlyView";

export default function Quaterly({ data, setData }) {
  return (
    <Popover width={280} shadow="md" position="right">
      <Popover.Target>
        <div className="p-1 w-full flex justify-between">
          <div>Quaterly</div>
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
          <QuaterlyView data={data} setData={setData} />
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
