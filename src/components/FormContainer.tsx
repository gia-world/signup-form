"use client";

import { User, userSchema, usernameSchema } from "@/model/user";
import { generateDaysOption } from "@/util/days";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputBox from "./InputBox";

type CheckResultType = {
  status: "success" | "failure";
  msg: string;
};

type FieldName = keyof User;

const existingUsers = [
  { id: "abcdefg", name: "user1" },
  { id: "123456", name: "user2" },
  { id: "dddddd", name: "user3" },
];

const initialFieldState = {
  username: false,
  password: false,
  passwordCheck: false,
  phone: false,
  name: false,
  emailName: false,
  emailDomain: false,
  birthYear: false,
  birthMonth: false,
  birthDay: false,
};

export default function FormContainer() {
  const [checkUsernameResult, setCheckUsernameResult] =
    useState<CheckResultType | null>();
  const [areFocused, setAreFocused] = useState(initialFieldState);
  const [areValid, setAreValid] = useState(initialFieldState);

  const { years, months, days } = generateDaysOption();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(userSchema) });

  const onSubmit = (data: User) => {
    if (!checkUsernameResult || checkUsernameResult?.status !== "success") {
      return;
    }
    console.log(data, "data");
  };

  const checkUsername = () => {
    const username = watch("username");

    try {
      usernameSchema.validateSync(username);

      if (existingUsers.some((user) => user.id === username)) {
        setCheckUsernameResult({
          status: "failure",
          msg: "이미 사용 중인 아이디입니다.",
        });
      } else {
        setCheckUsernameResult({
          status: "success",
          msg: "사용 가능한 아이디입니다.",
        });
      }
    } catch (error) {
      //   if (error instanceof ValidationError) {
      //     // ValidationError은 yup에서 제공하는 특별한 에러 객체로, 검사에 실패한 필드와 관련된 정보
      //     // setCheckUsernameResult({ status: "failure", msg: error.message });
      //   } else {
      console.log(error);
      //   }
    }
  };

  const checkIsFieldValid = async (fieldName: FieldName) => {
    if (watch(fieldName)) {
      const isValid = await trigger(fieldName);
      if (isValid) {
        setAreValid((prev) => ({ ...prev, [fieldName]: true }));
      } else {
        setAreValid((prev) => ({ ...prev, [fieldName]: false }));
      }
    }
  };

  const useRegisterCheck = (fieldName: FieldName) => {
    return register(fieldName, {
      onBlur: () => {
        checkIsFieldValid(fieldName);
        setAreFocused((prev) => ({ ...prev, [fieldName]: false }));
        if (fieldName === "username") {
          setCheckUsernameResult((prev) => prev && { ...prev, msg: "" });
        }
      },
      onChange: () => {
        checkIsFieldValid(fieldName);
        setAreFocused((prev) => ({ ...prev, [fieldName]: true }));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <InputBox
        fieldName="username"
        label="아이디"
        guide="(6~20자)"
        isValid={checkUsernameResult?.status === "success"}
        error={
          !areFocused.username && errors.username && errors.username.message
        }
      >
        <div className="multi">
          <input id="username" {...useRegisterCheck("username")} />
          <button
            type="button"
            //MEMO: 없으면 submit 으로 작동
            onClick={() => checkUsername()}
            className="btn check-username"
          >
            중복 확인
          </button>
        </div>
        {checkUsernameResult && (
          <span className={checkUsernameResult.status}>
            {checkUsernameResult.msg}
          </span>
        )}
      </InputBox>
      <InputBox
        fieldName="password"
        label="비밀번호"
        guide="(문자, 숫자, 특수문자 포함 8~20자)"
        isValid={areValid.password}
        error={
          !areFocused.password && errors.password && errors.password.message
        }
      >
        <input
          type="password"
          id="password"
          {...useRegisterCheck("password")}
        />
      </InputBox>
      <InputBox
        fieldName="passwordCheck"
        label="비밀번호 확인"
        isValid={areValid.passwordCheck}
        error={
          !areFocused.passwordCheck &&
          errors.passwordCheck &&
          errors.passwordCheck.message
        }
      >
        <input
          type="password"
          id="passwordCheck"
          {...useRegisterCheck("passwordCheck")}
        />
      </InputBox>
      <InputBox
        fieldName="phone"
        label="전화번호"
        guide="('-' 제외 11자리 입력)"
        isValid={areValid.phone}
        error={!areFocused.phone && errors.phone && errors.phone.message}
      >
        <input type="text" id="phone" {...useRegisterCheck("phone")} />
      </InputBox>
      <InputBox
        fieldName="email"
        label="이메일"
        error={
          (!areFocused.emailName && errors.emailName?.message) ||
          (!areFocused.emailDomain && errors.emailDomain?.message)
        }
        isValid={areValid.emailName && areValid.emailDomain}
      >
        <div className="multi">
          <input type="text" id="mailName" {...useRegisterCheck("emailName")} />
          <span>@</span>
          <input type="text" id="domain" {...useRegisterCheck("emailDomain")} />
          <label htmlFor="domain" className="hidden">
            이메일 주소(도메인)
          </label>
        </div>
      </InputBox>
      <InputBox
        fieldName="birthday"
        label="생년월일"
        error={
          errors.birthYear?.message ||
          errors.birthMonth?.message ||
          errors.birthDay?.message
        }
        isValid={areValid.birthYear && areValid.birthMonth && areValid.birthDay}
      >
        <div className="multi">
          <select
            id="year"
            defaultValue="연도"
            {...useRegisterCheck("birthYear")}
          >
            <option disabled>연도</option>
            {years.map((year) => (
              <option key={year.value} value={Number(year.value)}>
                {year.label}
              </option>
            ))}
          </select>
          <select
            id="month"
            defaultValue="월"
            {...useRegisterCheck("birthMonth")}
          >
            <option disabled>월</option>
            {months.map((month) => (
              <option key={month.value} value={Number(month.value)}>
                {month.label}
              </option>
            ))}
          </select>
          <select id="day" defaultValue="일" {...useRegisterCheck("birthDay")}>
            <option disabled>일</option>
            {days.map((day) => (
              <option key={day.value} value={Number(day.value)}>
                {day.label}
              </option>
            ))}
          </select>
        </div>
      </InputBox>
      <button type="submit" className="btn">
        등록
      </button>
    </form>
  );
}
