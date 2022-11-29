/* eslint-disable react/jsx-props-no-spreading */
import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  Group,
  Loader,
  Select,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AUTH_ENDPOINT,
  BASE_PROXY,
  EMPLOYEES_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import removeDuplicateObjects from "../../Utils/Helpers/removeDuplicateObjects";
import ReferraIllust from "../Assets/Pictures/ReferraIllust.png";

const SelectItem = forwardRef(
  ({ image, label, description, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} radius="xl" />

        <div>
          <Text className="font-medium">{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  ),
);

function Referal() {
  const refCodesItems = [
    "BMPPutri",
    "BMPEko",
    "BMPVally",
    "BMPMarchel",
    "BMPAco",
    "BMPFaisal",
    "BMPDale",
  ];
  const [query, setQuery] = useState("");
  const [employeeItems, setEmployeeItems] = useState([]);
  const [debouncedQuery] = useDebouncedValue(query, 500);

  const form = useForm({
    initialValues: {
      referal_employee_id: null,
      referal_code: null,
    },
  });

  const employeeService = Networks(BASE_PROXY.employees);
  const authService = Networks(BASE_PROXY.auth);
  const size = 10;

  const {
    isLoading: isLoadingGetEmployee,
    isFetching: isFetchingGetEmployee,
  } = employeeService.query(
    EMPLOYEES_ENDPOINT.GET.allEmployees,
    ["employees", debouncedQuery],
    {
      onSuccess: (res) =>
        setEmployeeItems((prev) =>
          removeDuplicateObjects(
            [
              ...prev,
              ...res.employees.map((item) => ({
                image: item.profile_picture,
                label: item.name,
                value: item.social_employee_profile_id,
                role: item.position,
              })),
            ],
            "value",
          ),
        ),
    },
    {
      params: {
        page: 1,
        size,
        query: debouncedQuery,
      },
    },
  );

  const { mutate, isLoading: isLoadingRefer } = authService.mutation(
    "post",
    {
      onSuccess: () => {
        window.location.href = `${import.meta.env.VITE_KMS_URL}/home`;
      },
    },
  );

  const handleSubmit = () => {
    const reqBody = {
      referal_code: form.values.referal_code,
      referal_employee_id: form.values.referal_employee_id,
    };
    mutate({ endpoint: AUTH_ENDPOINT.POST.refer, data: reqBody });
  };

  return (
    <div className="flex justify-evenly gap-5 items-center">
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-3xl text-text1">
          Do you have any referral?
        </h1>
        <Select
          label="Name/NIPP"
          placeholder="Select Employees Referal"
          rightSection={
            isLoadingGetEmployee || isFetchingGetEmployee ? (
              <Loader size="xs" />
            ) : (
              <Icon icon="akar-icons:chevron-down" width={12} />
            )
          }
          withinPortal
          itemComponent={SelectItem}
          data={employeeItems}
          clearable
          searchable
          nothingFound="No employees found"
          onSearchChange={(value) => setQuery(value)}
          {...form.getInputProps("referal_employee_id")}
          disabled={!!form.values.referal_code}
        />

        <div className="flex items-center justify-center">
          <div className="h-[2px] bg-gray2 w-full" />
          <p className="text-gray2 text-sm p-1">Or</p>
          <div className="h-[2px] bg-gray2 w-full" />
        </div>

        <Select
          label="Referral Code"
          placeholder="Input referral code"
          rightSection={<div />}
          withinPortal
          data={refCodesItems}
          clearable
          searchable
          nothingFound="No referral code found"
          {...form.getInputProps("referal_code")}
          disabled={!!form.values.referal_employee_id}
        />

        <Button
          disabled={!form.isDirty()}
          onClick={handleSubmit}
          loading={isLoadingRefer}
        >
          Submit
        </Button>
        <Link to="/login">
          <p className="text-center text-gray2 font-medium">
            I don&apos;t have any referral code
          </p>
        </Link>
      </div>
      <img src={ReferraIllust} alt="illust" className="w-[60vw]" />
    </div>
  );
}

export default Referal;
