// import DashedPlayButton from "../../../Components/Assets/Svg/dashed-play-button.svg";
import { Icon } from "@iconify/react";
import { Loader } from "@mantine/core";
import CourseCardNew from "../../../Components/Cards/CourseCardNew";
import NoItems from "../../../Components/Errors/NoItems";
import {
  BASE_PROXY,
  COURSE_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";

export default function SectionCourse() {
  const employeeId = getUserCookie()?.employee?.employee_id;
  const courseService = Networks(BASE_PROXY.course);
  const { data, isLoading } = courseService.query(
    COURSE_ENDPOINT.GET.myCourseProgress(employeeId),
    ["courses", employeeId],
    {
      select: (res) =>
        res?.progress_course?.map((item) => ({
          id: item?.course_id,
          name: item?.course_name,
          description: item?.course_desc,
          coverImg: item?.cover_img,
          startDate: item?.date_start,
          endDate: item?.date_end,
          learningHour: item?.duration,
          progress: item?.progress,
          vendor: {
            name: item?.name_vendor,
            avatar: item?.avatar_vendor,
          },
          subcon: {
            name: item?.name_subcon,
            avatar: item?.avatar_subcon,
          },
        })),
    },
    {
      params: {
        size: 2,
        type: "ongoing",
      },
    },
  );

  return (
    <section className="bg-bg2">
      <div className="flex justify-between items-center gap-8 py-10 px-[5rem]">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-3xl">Proses Kursus</h2>
          <p className="text-darkGrey text-lg">
            Lanjutkan pembelajaran kursus anda
          </p>
          <a
            href={`${import.meta.env.VITE_LMS_URL}/dashboard`}
            className="flex items-center font-semibold gap-2 text-primary3 mt-5"
          >
            Lihat My Learning Dashboard{" "}
            <Icon icon="ic:round-arrow-forward" width={25} />
          </a>
        </div>
        <div className="flex items-start gap-3">
          {(() => {
            if (isLoading) {
              return <Loader className="mx-auto" />;
            }
            if (data?.length) {
              return data.map((course) => (
                <CourseCardNew
                  href={`${import.meta.env.VITE_LMS_URL}/dashboard/${
                    course?.id
                  }`}
                  courseData={course}
                  withPrice={false}
                  withRating={false}
                  withProgress
                  classNames={{ root: "w-[250px]" }}
                  key={course?.course_id}
                />
              ));
            }
            return <NoItems label="Anda belum mengikuti kursus" />;
          })()}
        </div>
      </div>
    </section>
  );
}
