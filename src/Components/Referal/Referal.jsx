/* eslint-disable react/jsx-props-no-spreading */
import {
  Avatar,
  Group,
  Loader,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { forwardRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { Icon } from "@iconify/react";
import { useForm } from "@mantine/form";
import {
  BASE_PROXY,
  EMPLOYEES_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import KeyIcon from "../Assets/Icon/KeyIcon";
import LoadingButton from "../Assets/Icon/LoadingButton";
import RoundKeyboardBackspace from "../Assets/Icon/RoundKeyboardBackspace";
import removeDuplicateObjects from "../../Utils/Helpers/removeDuplicateObjects";

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
  const [employeeItems, setEmployeeItems] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useDebouncedValue(
    query,
    500,
  );

  const form = useForm({
    initialValues: {
      referal_employee_id: null,
      referal_code: null,
    },
  });

  const handleBlurSelect = () => {
    setQuery("");
    // setQueryCoreMember("");
    setDebouncedQuery("");
    // setDebouncedQueryCoreMember("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const employeeService = Networks(BASE_PROXY.employees);
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

  return (
    <div className="grid justify-items-center">
      <KeyIcon />

      <div className="text-center">
        <h1 className="font-semibold text-3xl text-text1 my-5">
          Referal Code
        </h1>
        <p className="font-secondary font-medium text-gray">
          u can use your friend referal before open the system
        </p>
      </div>

      <div className="w-[22rem] mt-7">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Select
              label="Employees"
              placeholder="Select Employees Referal"
              classNames={{
                root: "w-[20vw]",
              }}
              rightSection={
                // isLoadingGetCoreMember ||
                // isFetchingGetCoreMember
                isLoadingGetEmployee || isFetchingGetEmployee ? (
                  <Loader size="xs" />
                ) : (
                  <Icon
                    icon="bx:plus"
                    width={20}
                    className="text-darkGrey"
                  />
                )
              }
              withinPortal
              itemComponent={SelectItem}
              data={employeeItems}
              searchable
              onSearchChange={(value) => setQuery(value)}
              required
              {...form.getInputProps("referal_employee_id")}
              onBlur={handleBlurSelect}
            />
          </div>

          {/* <button
            disabled={isLoading}
            type="submit"
            className={`font-secondary w-full bg-primary1 font-medium ${
              !isLoading && "hover:bg-primary2"
            } text-white py-2 px-4 rounded my-1.5`}
          >
            {isLoading ? (
              <>
                <LoadingButton />
                <span>Loading...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default Referal;
