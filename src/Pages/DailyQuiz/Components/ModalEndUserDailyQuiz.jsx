/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Icon } from "@iconify/react";
import { Button, Image, Text } from "@mantine/core";
import dayjs from "dayjs";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import QuizBackground from "../../../Components/Assets/Pictures/QuizBackground.png";
import QuizQuestion from "../../../Components/Assets/Pictures/QuizQuestion.png";
import BaseModalTemplate from "../../../Components/Modals/Templates/BaseModal";
import MODAL_IDS from "../../../Components/Modals/modalIds";
import { setDailyQuizStatus } from "../../../Configs/Redux/slice";
import {
  BASE_PROXY,
  DAILY_QUIZ_ENDPOINT,
} from "../../../Networks/endpoint";
import { Networks } from "../../../Networks/factory";
import closeNiceModal from "../../../Utils/Helpers/closeNiceModal";
import getUserCookie from "../../../Utils/Helpers/getUserCookie";
import Quiz from "./Quiz";
import QuizResult from "./QuizResult";

dayjs.locale("id");

export const getTarget = (
  group = [],
  jobfam = [],
  jobFunction = [],
  options = {},
) => {
  const merged = [
    ...jobfam.map((e) => ({
      type: "JOBFAM",
      label: "Rumpun Jabatan",
      display: e,
    })),
    ...jobFunction.map((e) => ({
      type: "JOBFUNCTION",
      label: "Fungsi Jabatan",
      display: e,
    })),
    ...group.map((e) => ({
      type: "GROUP",
      label: "Unit Kerja",
      display: e,
    })),
  ].filter((e) => e);
  if (options.returnString) {
    if (!merged.length) return "Semua";
    return merged.map((e) => e.display).join(", ");
  }

  if (!merged.length) return <>Semua</>;
  return merged.map((e) => (
    <>
      {e.display}
      <br />
    </>
  ));
};

const ModalEndUserDailyQuiz = NiceModal.create(() => {
  const modalId = MODAL_IDS.DAILY_QUIZ.END_USER_DO_QUIZ;
  const modal = useModal(modalId);
  const quizService = Networks(BASE_PROXY.dailyQuiz);
  const user = getUserCookie();
  const employeeNumber = user.employee.employee_number;
  const dispatch = useDispatch();

  const [isEmailOtpRequired] = useState(
    localStorage.getItem("isEmailOtpRequired"),
  );

  useEffect(() => {
    if (isEmailOtpRequired === "1") {
      closeNiceModal(MODAL_IDS.DAILY_QUIZ.END_USER_DO_QUIZ);
    }
  }, [isEmailOtpRequired]);

  const { mutate: postMutate } = quizService.mutation("post");

  const { data: quizData } = quizService.query(
    DAILY_QUIZ_ENDPOINT.GET.dailyQuizData,
    [DAILY_QUIZ_ENDPOINT.GET.dailyQuizData],
    {},
    {
      params: {},
    },
  );
  // step 1: prompt user to do quiz
  // step 2: user doing quiz
  // step 3: checking whether todays answer is correct or not
  const [step, setStep] = useState(1);
  const [userAnswer, setUserAnswer] = useState(null);

  const targetName = useMemo(() => {
    return {
      target: getTarget(
        quizData?.target_group || [],
        quizData?.target_jobfam || [],
        quizData?.target_job_function || [],
      ),
      target_string: getTarget(
        quizData?.target_group || [],
        quizData?.target_jobfam || [],
        quizData?.target_job_function || [],
        { returnString: true },
      ),
    };
  }, [
    quizData?.target_group,
    quizData?.target_jobfam,
    quizData?.target_job_function,
  ]);

  const handleExitQuiz = () => {
    NiceModal.show(MODAL_IDS.GENERAL.CONFIRMATION, {
      message: "Tutup Daily Quiz",
      subMessage:
        "Apakah Anda yakin ingin menutup daily quiz? Anda akan kehilangan point jika menutup daily quiz",
      handleConfirm: () => {
        closeNiceModal(MODAL_IDS.GENERAL.CONFIRMATION);

        // then update daily quiz is finished status to backend
        postMutate(
          {
            endpoint: DAILY_QUIZ_ENDPOINT.POST.actionQuiz,
            data: {
              action: "skip",
            },
          },
          {
            onSuccess: () => {
              closeNiceModal(MODAL_IDS.DAILY_QUIZ.END_USER_DO_QUIZ);
              dispatch(
                setDailyQuizStatus({
                  isCompleted: true,
                  date: new Date(),
                  employeeNumber,
                }),
              );
            },
          },
        );
      },
    });
  };

  const [correctData, setCorrectData] = useState({
    isCorrect: false,
    correctAnswerText: "",
  });

  const handleSubmitQuiz = useCallback(async () => {
    // submit quiz endpoint
    postMutate(
      {
        endpoint: DAILY_QUIZ_ENDPOINT.POST.actionQuiz,
        data: {
          action: "answer",
          option_id: userAnswer,
        },
      },
      {
        onSuccess: (res) => {
          dispatch(
            setDailyQuizStatus({
              isCompleted: true,
              date: new Date(),
              employeeNumber,
            }),
          );
          setCorrectData({
            isCorrect: res?.data?.data?.is_correct,
            correctAnswerText: res?.data?.data?.correct_answer,
          });
          setStep(3);
        },
      },
    );
  }, [userAnswer]);

  const handleOnEndQuiz = useCallback(() => {
    closeNiceModal(MODAL_IDS.DAILY_QUIZ.END_USER_DO_QUIZ);
  }, [correctData?.isCorrect]);

  return (
    <BaseModalTemplate
      isOpen={modal.visible}
      handleClose={() => null}
    >
      {step === 1 && (
        <div className="relative flex flex-col justify-center w-full text-center">
          <img
            alt="quiz popup background"
            src={QuizBackground}
            className="absolute z-[-1] object-cover w-auto h-full"
          />
          <div className="p-12">
            <div className="flex justify-center mb-6">
              <Image src={QuizQuestion} height={80} width="auto" />
            </div>
            <Text className="text-2xl font-bold text-black">
              Daily Quiz
            </Text>
            <Text className="mt-2 text-sm text-coffee">
              Topik hari ini: {quizData?.topic}
            </Text>
            {/* HIDDEN TEMPORARILY */}
            {/* <Text className="mt-2 text-sm font-semibold text-success3">
              Hadiah: {quizData?.point}XP
            </Text> */}
            <div>
              <Button
                className="mt-6"
                rightIcon={
                  <Icon icon="ic:round-arrow-forward" width={20} />
                }
                onClick={() => {
                  setStep(2);
                  // send status is going to do quiz to backend if needed
                }}
              >
                Mulai Quiz
              </Button>
              {!quizData?.is_mandatory && (
                <Button
                  className="mt-6 ml-6"
                  variant="outline"
                  onClick={() => handleExitQuiz()}
                >
                  Tutup
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="p-12">
            <Quiz
              targetEmployee={targetName.target}
              targetEmployeeString={targetName.target_string}
              question={quizData?.question}
              options={quizData?.options}
              onChangeAnswer={(id) => setUserAnswer(id)}
              answerId={userAnswer}
            />
          </div>
          <div className="flex justify-end w-full gap-6 p-5 border-t bg-bg4 rounded-b-md">
            {!quizData?.is_mandatory && (
              <Button
                variant="outline"
                color="red"
                onClick={handleExitQuiz}
              >
                Keluar
              </Button>
            )}
            <Button onClick={handleSubmitQuiz} disabled={!userAnswer}>
              Simpan Jawaban
            </Button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="p-12">
          <QuizResult
            isCorrect={correctData?.isCorrect}
            correctAnswerText={correctData?.correctAnswerText}
            point={quizData?.point}
            onClickButton={handleOnEndQuiz}
          />
        </div>
      )}
    </BaseModalTemplate>
  );
});

export default ModalEndUserDailyQuiz;
