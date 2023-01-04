import { Icon } from "@iconify/react";
import { Button } from "@mantine/core";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import KPI from "../Assets/Icon/KPI";

const MODULE_ICONS = {
  Assessment: (
    <Icon icon="fluent:clipboard-task-20-filled" width={20} />
  ),
  KPI: (
    <KPI
      backgroundColor="white"
      color="rgb(1 109 178)"
      width={20}
      height={20}
    />
  ),
};

function Item({ moduleName, message, date }) {
  return (
    <div className="flex justify-between gap-2 items-center border bg-white rounded-md p-3">
      <span className="text-primary3 text-lg">&bull;</span>
      <div className="text-white bg-primary3 rounded-full p-2.5 w-10 h-10">
        {MODULE_ICONS[moduleName]}
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">{moduleName}</p>
        <p className="text-sm">{message}</p>
        <p className="text-sm text-darkGrey">
          {dayjs(date).format("MMMM D, YYYY at hh:mm A")}
        </p>
      </div>
      <Button size="sm">Lihat Detail</Button>
    </div>
  );
}

export default function NotificationPanel({
  classNames = { root: "" },
}) {
  return (
    <div
      className={`flex flex-col gap-5 bg-primary3 rounded-md p-4 ${classNames.root}`}
    >
      <div className="flex justify-between items-center text-white">
        <h3 className="font-bold">Pemberitahuan</h3>
        <div className="flex gap-2">
          <Button
            // variant="white"
            size="sm"
            leftIcon={<Icon icon="ci:check-all-big" fontSize={24} />}
            onClick={() => {}}
            // disabled={disabled}
            // loading={loading}
            className="p-0 h-fit bg-primary3"
          >
            Mark as read
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 max-h-[300px] pr-3 overflow-y-auto scroll-style-4">
        <Item
          moduleName="Assessment"
          message="Hasil Assessment Penilaian Perilaku dengan target evaluasi anda telah selesai, silahkan ulas hasilnya pada halaman berikut!"
          date={dayjs().toISOString()}
        />
        <Item
          moduleName="KPI"
          message="Hasil Assessment Penilaian Perilaku dengan target evaluasi anda telah selesai, silahkan ulas hasilnya pada halaman berikut!"
          date={dayjs().toISOString()}
        />
        <Item
          moduleName="KPI"
          message="Hasil Assessment Penilaian Perilaku dengan target evaluasi anda telah selesai, silahkan ulas hasilnya pada halaman berikut!"
          date={dayjs().toISOString()}
        />
      </div>
    </div>
  );
}

NotificationPanel.propTypes = {
  classNames: PropTypes.shape({
    root: PropTypes.string,
  }),
};

NotificationPanel.defaultProps = {
  classNames: {
    root: "",
  },
};
