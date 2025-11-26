import axiosSSOClient from "../Configs/AxiosClient/ssoAxiosClient";
import { login } from "../Utils/Helpers/firebaseAuth";

export default async function postLoginSso(
  payload,
  setIsLoading,
  setFetchError,
) {
  // setIsLoading(true);
  // setFetchError("");
  
  const uidResponse = await axiosSSOClient.post("/auth/get-uid-user-sso", {access_token: payload?.access_token});
  const targetUID = uidResponse?.data?.data?.uid;
  console.log('payload', uidResponse);
  console.log('payload2', targetUID);

  if (!targetUID) {
    console.error("TargetUID tidak ditemukan");
    return;
  }

  const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4MDI5MzRmZTBlZWM0NmE1ZWQwMDA2ZDE0YTFiYWIwMWUzNDUwODMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc21hcnRrbXN5c3RlbS0yNzA1ZiIsImF1ZCI6InNtYXJ0a21zeXN0ZW0tMjcwNWYiLCJhdXRoX3RpbWUiOjE3NjMwOTk5ODksInVzZXJfaWQiOiJJV3BwM3pOR2xiVHd6VGNZbXAwR0d2SktkQzEyIiwic3ViIjoiSVdwcDN6TkdsYlR3elRjWW1wMEdHdkpLZEMxMiIsImlhdCI6MTc2MzA5OTk4OSwiZXhwIjoxNzYzMTAzNTg5LCJlbWFpbCI6ImF1bGlhLmlraHNhbkBpbGNzLmNvLmlkIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYXVsaWEuaWtoc2FuQGlsY3MuY28uaWQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Alo5hrZiFwy0nYzD_DC1aMO2nTRE2oparb97sxAL5b7iM11h8ve1DE-PLMUfXW0AGWppPbhPK-c2JrPeskuSYXxHF-TCB3pKYtI5f_82767l8AkvjrI-2L4EANx84mTet7zuJN8d4yEtnZS7TkJrBGjEYVkDi-Sb9kIoTHW0V9N9SWmK3xhitVBtMMG7IJze-dPZhZoSoVoWJ-5_X80FJKEs2Cgrcal4mwRHNNriT9dDUPGDDjKOGb1IvX0lg7lCYPVDhm5MqoSYGEohXTBHbfs8gexarNsA7TcYg4VntTh_jvW-WNcRQK5d0AFbMTt0L5tfSFUAiIh5t6f2ZFGBRQ";
  const data = {
    isRemember: false,
    targetUID: targetUID,
  };

  axiosSSOClient
    .post("/auth/after-login", data, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
    .then((res) => {
      // if (res.data.data.user.role_code.includes("SBCN")) {
      //   window.location = `${import.meta.env.VITE_LMS_URL
      //     }/subcon-management/${res.data.data.user?.subcon?.subcon_id
      //     }`;
      //   return;
      // }
      // if (res.data.data.user.role_code.includes("VNDR")) {
      //   window.location = `${import.meta.env.VITE_LMS_URL
      //     }/vendor-management/${res.data.data.user?.vendor?.vendor_id
      //     }`;
      //   return;
      // }
      // if (res.data.data.user.role_code.includes("CADH")) {
      //   window.location = `${import.meta.env.VITE_CMS_URL
      //     }/change-catalyst-team-monitoring-system`;
      //   return;
      // }
      // if (res.data.data.user.role_code.includes("CADC")) {
      //   window.location = `${import.meta.env.VITE_CMS_URL
      //     }/change-catalyst-team-monitoring-system`;
      //   return;
      // }
      // if (res.data.data.user.is_first_time_login) {
      //   window.location.href = "/referals";
      //   return;
      // }
      window.location.href = "/landing";
    })
}
