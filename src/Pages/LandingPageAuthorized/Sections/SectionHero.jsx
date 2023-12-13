import SMEIcon from "../../../Components/Assets/Icon/SME";
import SplashArt from "../../../Components/Assets/Pictures/Kapal_Pelindo.gif";
import Wave from "../../../Components/Assets/Svg/wave-half.svg";
import NewNotificationPanel from "../../../Components/NotificationPanel/NewNotificationPanel";
import ProfilePictureWithBadge from "../../../Components/ProfilePictureWithBadge/ProfilePictureWithBadge";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";
import hasRole from "../../../Utils/Helpers/hasRole";
import uppercaseFirstLetterEveryWord from "../../../Utils/Helpers/uppercaseFirstLetterEveryWord";

export default function SectionHero() {
  const user = getUserCookie();
  const { email } = user;
  const {
    name,
    profile_picture: avatar,
    employee_number: employeNumber,
    position_name: position,
    group,
  } = user.employee;

  return (
    <section className="relative mt-10 pb-10">
      <div className="grid grid-cols-2 gap-8 py-10 px-[5rem]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-3xl">
              Selamat Datang Kembali,{" "}
              <span className="text-primary3">
                {uppercaseFirstLetterEveryWord(
                  (name || "Unknown").trim(),
                )}
              </span>
              !
            </h2>
            <p className="text-darkGrey text-lg">
              Menghubungkan BUMN 1 Pelabuhan Bersama Portaverse
            </p>
          </div>
          <img
            src={SplashArt}
            alt="splash-art"
            className="w-[75%] my-auto"
          />
          {/* <div className="grid grid-cols-5 items-start gap-4" /> */}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-8 items-start border p-6 rounded-md">
            <ProfilePictureWithBadge
              img={avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full border shrink-0"
              badgeIcon={hasRole(["SME"]) ? <SMEIcon /> : null}
            />
            <div className="flex flex-col gap-1 text-lg">
              <p className="font-semibold">
                {uppercaseFirstLetterEveryWord(name)}
              </p>
              <p className="font-semibold text-primary3">
                {employeNumber}
              </p>
              <p className="font-semibold">{position || "-"}</p>
              <p className="font-semibold">{group?.name}</p>
              <p className="font-medium text-darkGrey">
                {email?.toLowerCase()}
              </p>
            </div>
          </div>
          <NewNotificationPanel />
        </div>
      </div>
      <img src={Wave} alt="wave" className="absolute -bottom-1" />
    </section>
  );
}
