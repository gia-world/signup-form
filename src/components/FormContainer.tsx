"use client";

import { User, userSchema } from "@/model/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export default function FormContainer() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(userSchema) });
  const onSubmit: SubmitHandler<User> = (data) => console.log(data);

  console.log(watch("name"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>필수 항목</legend>
        <label htmlFor="username">아이디</label>
        <input
          id="username"
          placeholder="아이디 입력 (6~20자)"
          {...register("username")}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="text"
          name=""
          id="password"
          placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
        />
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input
          type="text"
          name=""
          id="passwordCheck"
          placeholder="비밀번호 재입력"
        />
        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="이름을 입력해주세요"
        />
        <label htmlFor="phone">전화번호</label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력)"
        />
      </fieldset>

      {/* <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>} */}

      <button type="submit">등록</button>
    </form>
  );
}
