/* eslint-disable import/prefer-default-export */
export const GMT_TIMEZONE_LIST = [
  "GMT-12:00",
  "GMT-11:00",
  "GMT-10:00",
  "GMT-09:30",
  "GMT-09:00",
  "GMT-08:00",
  "GMT-07:00",
  "GMT-06:00",
  "GMT-05:00",
  "GMT-04:30",
  "GMT-04:00",
  "GMT-03:30",
  "GMT-03:00",
  "GMT-02:00",
  "GMT+00:00",
  "GMT+01:00",
  "GMT+02:00",
  "GMT+03:00",
  "GMT+03:07",
  "GMT+03:30",
  "GMT+04:00",
  "GMT+04:30",
  "GMT+05:30",
  "GMT+05:45",
  "GMT+06:00",
  "GMT+06:30",
  "GMT+07:00",
  "GMT+08:00",
  "GMT+08:45",
  "GMT+09:00",
  "GMT+10:00",
  "GMT+10:30",
  "GMT+11:00",
  "GMT+11:30",
  "GMT+12:00",
  "GMT+12:45",
  "GMT+13:00",
  "GMT+14:00",
];

export const ROLE_CODE = {
  TRANSLATIONS: {
    SA: "Super Admin",
    MNGR: "Admin",
    USER: "Pegawai",
    SME: "SME",
  },
  VALUES: [
    { value: "SA", label: "Super Admin" },
    { value: "MNGR", label: "Admin" },
    { value: "USER", label: "Pegawai" },
    { value: "SME", label: "SME" },
  ],
};

export const KPI = {
  PERSPECTIVES: [
    {
      value: "Keuangan",
      label: "Keuangan",
    },
    {
      value: "Pelanggan",
      label: "Pelanggan",
    },
    {
      value: "Proses Bisnis Internal",
      label: "Proses Bisnis Internal",
    },
    {
      value: "Learning & Growth",
      label: "Learning & Growth",
    },
  ],
  POLARITY: [
    // {
    //   value: "Binary",
    //   label: "Binary",
    // },
    {
      value: "Negatif",
      label: "Negatif",
    },
    {
      value: "Positif",
      label: "Positif",
    },
    {
      value: "Netral",
      label: "Netral",
    },
  ],
  QUARTER: [
    {
      value: "Triwulanan",
      label: "Triwulanan",
    },
    {
      value: "Semesteran",
      label: "Semesteran",
    },
    {
      value: "Tahunan",
      label: "Tahunan",
    },
  ],
  UNIT: [
    // { value: "Day", label: "Day" },
    { value: "%", label: "%" },
    { value: "#", label: "Number" },
    { value: "RP", label: "RP" },
    // { value: "Jumlah", label: "Jumlah" },
    // { value: "Jam", label: "Jam" },
    // { value: "Currency", label: "Currency" },
    // { value: "WTP", label: "WTP" },
    // { value: "SLA", label: "SLA" },
    // { value: "Hari", label: "Hari" },
    // { value: "Likert", label: "Likert" },
    // { value: "TEUS", label: "TEUS" },
    // { value: "Ton", label: "Ton" },
  ],
};

export const COURSE_TYPES = {
  IL: "Individual Learning",
  GL: "Group Learning",
};

export const COURSE_METHODS = {
  OSL: "Hanya Online (Self Learning)",
  OLV: "Hanya Online (Live Virtual)",
  OFF: "Hanya Offline",
  HYB: "Hybrid",
};

export const MESSAGES_TEMPLATE = {
  successCopy: "Copied to clipboard",
  successDelete: "Success Delete",
};

export const VALIDATION_REGEX = {
  url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  urlWithOrWithoutProtocol:
    /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/g,
  containOneAlphabet: /[a-zA-Z]/,
};

export const VALIDATE_FIELD = {
  required: (value, customMessage) => {
    const message = customMessage || "Field cannot be empty";
    if (typeof value === "string" && !value.trim()) {
      return message;
    }
    if (!value) {
      return message;
    }
    if (value instanceof Array && value?.length === 0) {
      return message;
    }
    return null;
  },
  mustContainString: (value) =>
    !VALIDATION_REGEX.containOneAlphabet.test(value)
      ? "Must contain atleast one alphabet character"
      : null,
  email: (value) =>
    !VALIDATION_REGEX.email.test(value) ? "Invalid email" : null,
  url: (value) =>
    !VALIDATION_REGEX.url.test(value) ? "Invalid url" : null,
};

export const color = {
  primary1: "#C9F3FB",
  primary2: "#93E2F7",
  primary3: "#016DB2",
  primary4: "#005499",
  primary5: "#003F80",
  primary6: "#4EAEEC",
  secondary1: "#1192E8",
  secondaryCyan: "#37B6E2",
  bg1: "#F2F4F6",
  bg2: "#F2F4F8",
  bg3: "#F6F6F6",
  bg4: "#FBFBFB",
  green: "#4BB543",
  green1: "#4BB543",
  success1: "#F4FBF4",
  success2: "#B8E3B5",
  success3: "#4BB543",
  warning1: "#FEF9F1",
  warning2: "#F9D79F",
  warning3: "#F5BB5C",
  warning4: "#FFB507",
  danger1: "#FFF4F2",
  danger2: "#EEB4B0",
  danger3: "#CB3A31",
  grey: "#C1C7CD",
  grey2: "#C4C4C4",
  lightGrey: "#DDE1E6",
  darkGrey: "#878D96",
  text1: "#444444",
  red1: "#CB0000",
  red2: "#CB3A31",
  coffee: "#444444",
  baseGrey: "#325366",
  baseGradient: "#6CC7FE",
  topGradient: "#111111",
  iconGradient: "#FEFEFE",
};

export const LIST_OF_MONTH_INDONESIA = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const LIST_OF_MONTH_INDONESIA_2 = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agt",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
export const LAKHAR_JOB_SHARING_MAPPER = {
  MAP_STATUS: {
    active: {
      variant: "primary",
      text: "Aktif",
      key: "active",
    },
    "non-active": {
      variant: "red",
      text: "Tidak Aktif",
      key: "non-active",
    },
  },
  MAP_TYPE: {
    lakhar: {
      text: "Lakhar",
      key: "lakhar",
    },
    "job-sharing": {
      text: "Job Sharing",
      key: "job-sharing",
    },
    "lakhar-empty": {
      text: "Lakhar Posisi Kosong",
      key: "lakhar-empty",
    },
  },
};

export const DEVELOPMENT_PLAN_MAPPER = {
  EVENT_TALENT_AGREEMENT_STATUS: {
    0: {
      badge: {
        label: "Tidak Setuju Mengikuti Event Talent",
        color: "red",
      },
    },
    1: {
      badge: {
        label: "Setuju Mengikuti Event Talent",
        color: "green",
      },
    },
  },
  CMC_IDP_PICA_STATUS: {
    SPO_POV: {
      REVIEW_PREVIOUS_PICA: {
        badge: {
          color: "yellow",
          label: "Review PICA Sebelumnya",
        },
      },
      REVIEW_NEW_PICA: {
        badge: {
          color: "green",
          label: "Review PICA Baru",
        },
      },
      PICA_CHANGES_BY_SBO: {
        badge: {
          color: "purple",
          label: "Perubahan Pada Item PICA",
        },
      },
      IDP_CHANGES_BY_SBO: {
        badge: {
          color: "purple",
          label: "Perubahan Pada Item IDP",
        },
      },
      PICA_ACHIEVEMENT_UPDATE_BY_SBO: {
        badge: {
          color: "primary",
          label: "Update Capaian Oleh Bawahan",
        },
      },
      DEFAULT: {
        badge: {
          color: "red",
          label: "-",
        },
      },
    },
  },
};

export const MANTINE_TAB_STYLES = {
  pill: {
    sxChild: (theme) => ({
      background: "white",
      border: `1px solid`,
      borderColor: theme.colors.gray[5],
      color: theme.colors.gray[5],
      fontWeight: 500,
    }),
    sx: {
      "[data-active]": {
        background: `rgba(201, 243, 251, 0.7) !important`,
        color: "rgb(1, 109, 178) !important",
        borderColor: "rgb(1, 109, 178) !important",
      },
    },
  },
  default: {
    sxChild: (theme) => ({
      background: "transparent !important",
      color: theme.colors.gray[5],
      fontWeight: 600,
    }),
    sx: {
      "[data-active]": {
        color: "rgb(1, 109, 178) !important",
        borderColor: "rgb(1, 109, 178) !important",
      },
    },
  },
};

export const MANTINE_PAGINATION_STYLES = {
  default: {
    classNames: {
      item: "border-white",
    },
    sx: (theme) => ({
      "[data-active]": {
        background: "white",
        border: `1px solid !important`,
        borderColor: theme.colors.primary[5],
        color: theme.colors.primary[5],
      },
    }),
  },
};

export const MANTINE_INPUT_STYLES = {
  primary: {
    classNames: { label: "text-primary3 mb-1" },
    styles: {
      input: {
        fontSize: "0.875rem",
      },
      label: {
        fontSize: "0.875rem",
      },
      error: {
        fontSize: "0.875rem",
      },
    },
  },
};

export const MANTINE_SWITCH_STYLES = {
  primary: {
    styles: {
      label: {
        fontSize: "0.875rem",
      },
    },
  },
};

export const MANTINE_SELECT_STYLES = {
  primary: {
    classNames: { label: "text-primary3 mb-1" },
    styles: {
      item: {
        fontSize: "0.875rem",
      },
    },
  },
};

export const MANTINE_BUTTON_STYLES = {
  sizeStyles: {
    xs: {
      fontSize: "0.75 !important",
    },
    sm: {
      fontSize: "0.875rem !important",
    },
    md: {
      fontSize: "1rem !important",
    },
    lg: {
      fontSize: "1rem !important",
    },
    xl: {
      fontSize: "1rem !important",
    },
  },
};
