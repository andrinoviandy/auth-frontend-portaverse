import NiceModal from "@ebay/nice-modal-react";
import { Button, Divider, Group, Indicator } from "@mantine/core";
import { DatePicker, DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import "dayjs/locale/id";

import { CalendarDate, CalendarSummaryResponse } from "./index.types";
import MODAL_IDS from "../../../Components/Modals/modalIds";
import MonthSlider from "../../../Components/MonthSlider";
import {
  BASE_PROXY,
  SOCIAL_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import cn from "../../../Utils/Helpers/cn";

export default function PanelCalendar() {
  const [month, setMonth] = useState<Date>(new Date());

  const getRangeFilter = useMemo(() => {
    const arrayOfDay: string[] = [];
    const s = Math.floor(dayjs(month).month());
    const year = dayjs(month).year();
    const firstDayOfTheMonth = dayjs(new Date(year, s, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    new Array(5).fill([]).forEach(() => {
      new Array(7).fill(null).forEach(() => {
        currentMonthCount += 1;
        arrayOfDay.push(
          dayjs(new Date(year, s, currentMonthCount)).format(
            "YYYY-MM-DD",
          ),
        );
        return dayjs(new Date(year, s, currentMonthCount));
      });
    });
    return [
      ...arrayOfDay,
      dayjs(arrayOfDay[arrayOfDay.length - 1])
        .add(1, "day")
        ?.format("YYYY-MM-DD"),
    ];
  }, [month]);

  const { query } = Networks(BASE_PROXY.social);
  const { data: fetchedData } = query(
    SOCIAL_ENDPOINT.GET.calendarSummary,
    ["myAgendaListCalendar", getRangeFilter],
    {
      select: (res: CalendarSummaryResponse) => res?.date,
    },
    {
      params: {
        start_date: getRangeFilter[0],
        end_date: getRangeFilter[getRangeFilter.length - 1],
      },
    },
  );

  const data: CalendarDate[] = fetchedData;

  const handleClickDate = (date: DateValue) => {
    NiceModal.show(MODAL_IDS.CALENDAR.DATE_DETAIL, {
      date: dayjs(date).toDate(),
    });
  };

  return (
    <div className="relative flex flex-col">
      <Group
        justify="space-between"
        wrap="nowrap"
        align="center"
        p={16}
      >
        <MonthSlider value={month} onChange={setMonth} />
        <Button
          onClick={() =>
            NiceModal.show(MODAL_IDS.CALENDAR.CREATE_AGENDA)
          }
        >
          Buat Agenda
        </Button>
      </Group>

      <Divider />

      <Group py={16} px={24} gap="lg">
        <Group align="center" gap="xs">
          <Indicator zIndex={1} />
          <p className="text-sm text-darkGrey">Agenda Pribadi</p>
        </Group>
        <Group align="center" gap="xs">
          <Indicator zIndex={1} color="red" />
          <p className="text-sm text-darkGrey">Agenda Komunitas</p>
        </Group>
      </Group>

      <Divider />

      <DatePicker
        onChange={handleClickDate}
        date={month}
        renderDay={(d) => {
          const todayDate = new Date().getDate();
          const day = d.getDate();
          const monthName = dayjs(d).format("MMM");
          const isCurrentMonth =
            d.getMonth() === new Date().getMonth();
          const isPastDate = day < todayDate;

          const cellClassName = (() => {
            if (isCurrentMonth) {
              if (isPastDate) return "bg-bg4 opacity-50";
              return "bg-white";
            }
            return "bg-bg2";
          })();

          const filteredData = data?.find(
            (v) =>
              dayjs(v?.date).format("YYYY/MM/DD") ===
              dayjs(d).format("YYYY/MM/DD"),
          );

          const hasNotif =
            !!filteredData?.counts.community ||
            filteredData?.counts.personal;

          return (
            <div
              className={cn(
                "flex flex-col gap-3 items-center px-2 py-3 size-full opa",
                cellClassName,
              )}
            >
              <div
                className={cn(
                  "flex rounded-full p-1 text-darkGrey size-[20px] items-center justify-center",
                  isCurrentMonth && day === todayDate
                    ? "bg-primary3 text-white"
                    : "",
                )}
              >
                <p className="text-xs">
                  {isCurrentMonth ? day : `${day} ${monthName}`}
                </p>
              </div>

              {hasNotif && (
                <Group gap="sm">
                  <Group align="center" gap={5}>
                    <Indicator zIndex={1} size={4} />
                    <p className="text-xs font-medium text-primary3">
                      {filteredData?.counts?.personal}
                    </p>
                  </Group>
                  <Group align="center" gap={5}>
                    <Indicator zIndex={1} size={4} color="red" />
                    <p className="text-xs font-medium text-danger3">
                      {filteredData?.counts?.community}
                    </p>
                  </Group>
                </Group>
              )}
            </div>
          );
        }}
        size="xl"
        classNames={{
          month: "w-full",
          day: "w-full h-[80px] data-[selected=true]:bg-transparent",
          weekdaysRow: "[&>th]:py-2",
          monthRow: "[&>td]:border",
          calendarHeader: "hidden",
          weekday: "font-bold text-xs text-black",
        }}
        locale="id"
        weekdayFormat="ddd"
        maxLevel="month"
      />
    </div>
  );
}
