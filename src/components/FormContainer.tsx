"use client";

import { User, userSchema, usernameSchema } from "@/model/user";
import { generateDaysOption } from "@/util/days";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

type CheckResultType = {
  status: "success" | "failure";
  msg: string;
};

const existingUsers = [
  { id: "abcdefg", name: "user1" },
  { id: "123456", name: "user2" },
  { id: "dddddd", name: "user3" },
];

export default function FormContainer() {
  const [checkUsernameResult, setCheckUsernameResult] =
    useState<CheckResultType | null>();

  const { years, months, days } = generateDaysOption();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(userSchema), mode: "onChange" });

  const onSubmit = (data: User) => {
    console.log("on submit handled");
    if (!checkUsernameResult) {
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
    } catch (e) {
      //   if (error instanceof ValidationError) {
      //     // ValidationError은 yup에서 제공하는 특별한 에러 객체로, 검사에 실패한 필드와 관련된 정보
      //     // setCheckUsernameResult({ status: "failure", msg: error.message });
      //   } else {
      //     console.log(error);
      //   }
      console.log(e, "error check name");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="input-box">
        <label htmlFor="username">아이디</label>
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
        {checkUsernameResult && (
          <span className={checkUsernameResult.status}>
            {checkUsernameResult.msg}
          </span>
        )}
        <div className="multi">
          <input
            id="username"
            placeholder="아이디 입력 (6~20자)"
            {...register("username")}
          />
          <button
            type="button"
            //MEMO: 없으면 submit 으로 작동
            onClick={() => checkUsername()}
            className="btn check-username"
          >
            중복 확인
          </button>
        </div>
      </div>
      <div className="input-box">
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
          {...register("password")}
        />
      </div>
      <div className="input-box">
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        {errors.passwordCheck && (
          <span className="error">{errors.passwordCheck.message}</span>
        )}
        <input
          type="password"
          id="passwordCheck"
          placeholder="비밀번호 재입력"
          {...register("passwordCheck")}
        />
      </div>
      <div className="input-box">
        <label htmlFor="name">이름</label>
        {errors.name && <span className="error">{errors.name.message}</span>}
        <input
          type="text"
          id="name"
          placeholder="이름을 입력해주세요"
          {...register("name")}
        />
      </div>
      <div className="input-box">
        <label htmlFor="phone">전화번호</label>
        {errors.phone && <span className="error">{errors.phone.message}</span>}
        <input
          type="text"
          id="phone"
          placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력)"
          {...register("phone")}
        />
      </div>
      <div className="input-box">
        <label htmlFor="email">이메일 주소</label>
        {errors.email && (
          <span className="error">
            {errors.email.mailName?.message ||
              errors.email.domain?.message ||
              null}
          </span>
        )}
        <div className="multi">
          <input
            type="text"
            id="mailName"
            placeholder="이메일 주소"
            {...register("email.mailName")}
          />
          <span>@</span>
          <input
            type="text"
            id="domain"
            placeholder="naver.com"
            {...register("email.domain")}
          />
          <label htmlFor="domain" className="hidden">
            이메일 주소(도메인)
          </label>
        </div>
      </div>
      <div className="input-box">
        <label htmlFor="year">생년월일</label>
        {errors.birthday && (
          <span className="error">
            {errors.birthday.year?.message ||
              errors.birthday.month?.message ||
              errors.birthday.day?.message ||
              null}
          </span>
        )}
        <div className="multi">
          <select id="year" defaultValue="연도" {...register("birthday.year")}>
            <option disabled>연도</option>
            {years.map((year) => (
              <option key={year.value} value={Number(year.value)}>
                {year.label}
              </option>
            ))}
          </select>
          <select id="month" {...register("birthday.month")} defaultValue="월">
            <option disabled>월</option>
            {months.map((month) => (
              <option key={month.value} value={Number(month.value)}>
                {month.label}
              </option>
            ))}
          </select>
          <select id="day" {...register("birthday.day")} defaultValue="일">
            <option disabled>일</option>
            {days.map((day) => (
              <option key={day.value} value={Number(day.value)}>
                {day.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn">
        등록
      </button>
    </form>
  );
}
