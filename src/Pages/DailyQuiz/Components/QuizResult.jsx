/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { Button, Divider, Text } from "@mantine/core";
import dayjs from "dayjs";
import { color } from "../../../Utils/Constants";

function Quiz({
  isCorrect = false,
  point,
  correctAnswerText,
  onClickButton = () => null,
}) {
  return (
    <div>
      <div className="flex justify-between">
        <Text className="text-sm font-bold text-coffee">
          DAILY QUIZ
        </Text>
        <Text className="text-sm text-coffee">
          {dayjs(new Date()).format("DD MMMM YYYY")}
        </Text>
      </div>
      <Divider my="sm" className="my-3" color={color.lightGrey} />
      <div className="flex flex-col justify-center text-center">
        <div className="flex justify-center">
          <Icon
            icon={
              isCorrect
                ? "icon-park-solid:check-one"
                : "ph:x-circle-fill"
            }
            color={isCorrect ? color.success3 : color.danger3}
            width={120}
          />
        </div>
        <Text className="font-bold text-2xl text-black mt-3 mb-2">
          {isCorrect ? "Jawaban Anda Benar!" : "Jawaban Anda Salah!"}
        </Text>
        {/* NOTE: THIS IS TEMPORARY, REMOVE THE CONDITION WHEN GAMIFICATION POINT IS READY */}
        {!isCorrect && (
          <Text className="text-sm text-black mb-8">
            {isCorrect ? (
              <>
                Selamat Anda mendapatkan gamification points sebesar
                <br />
                <span className="text-success3 text-sm font-bold">
                  +{point} Points!
                </span>
              </>
            ) : (
              <>
                Jawaban Benar : <br />
                <span className="text-primary3 text-sm font-medium">
                  {correctAnswerText}
                </span>
              </>
            )}
          </Text>
        )}
        <div>
          <Button onClick={() => onClickButton()}>Tutup</Button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
