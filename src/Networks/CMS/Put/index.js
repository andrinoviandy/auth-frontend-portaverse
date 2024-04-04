import { useMutation } from "react-query";
import axiosMainClient from "../../../Configs/AxiosClient";
import baseURL from "../../../Utils/Helpers/baseURL";

const service = baseURL("/api/cms/v1");

export const putHeaderSection = () => {
  const mutation = useMutation((data) =>
    axiosMainClient(service).put(`/lms/home/header`, data),
  );
  return mutation;
};

export const putBannerSection = () => {
  const mutation = useMutation((data) =>
    axiosMainClient(service).put(`/lms/home/banner`, data),
  );
  return mutation;
};

export const putThirdSection = () => {
  const mutation = useMutation((data) =>
    axiosMainClient(service).put(`/lms/home/third`, data),
  );
  return mutation;
};

export const putCourseSection = () => {
  const mutation = useMutation((data) =>
    axiosMainClient(service).put(`/lms/home/course`, data),
  );
  return mutation;
};

export const putTutorSection = () => {
  const mutation = useMutation((data) =>
    axiosMainClient(service).put(`/lms/home/tutor`, data),
  );
  return mutation;
};

export const putDepartmentSection = () => {
  const mutation = useMutation((data) =>
    axiosMainClient(service).put(`/lms/home/department`, data),
  );
  return mutation;
};

export const putVoucherSection = () => {
  const mutation = useMutation((data) =>
    axiosMainClient(service).put(`/lms/home/voucher`, data),
  );
  return mutation;
};

export const putMerchandiseSection = () => {
  const mutation = useMutation((data) =>
    axiosMainClient(service).put(`/lms/home/merchandise`, data),
  );
  return mutation;
};

export const putFooterSection = () => {
  const mutation = useMutation((data) =>
    axiosMainClient(service).put(`/lms/home/footer`, data),
  );
  return mutation;
};
