import * as yup from "yup";
import { InferType, number, object, string } from "yup";

export const usernameSchema = string()
  .required("ID를 입력해주세요")
  .matches(/^[a-zA-Z]+$/, "영어만 입력 가능합니다")
  .max(20, "최대 20자까지 가능합니다.")
  .min(6, "최소 6자 이상이어야 합니다.");

export const userSchema = object({
  username: usernameSchema,
  password: string()
    .required("비밀번호를 입력해주세요.")
    .max(20, "최대 20자까지 가능합니다.")
    .min(8, "최소 8자 이상이어야 합니다."),
  passwordCheck: string()
    .required("비밀번호를 다시 한 번 입력해주세요.")
    .max(20, "최대 20자까지 가능합니다.")
    .min(8, "최소 8자 이상이어야 합니다.")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"), // 이전 비밀번호와 일치하는지 확인

  name: string().required("이름을 입력해주세요"),
  phone: string()
    .required("전화번호를 입력해주세요")
    .matches(/^[0-9]+$/, "숫자만 입력 가능합니다")
    .test(
      "isElevenDigits", // 테스트 이름 지정
      "11자리 숫자를 입력해주세요", // 에러메세지 지정
      (value) => value !== undefined && String(value).length === 11 // 테스트 함수(유효성 확인)
    ),
  email: object().shape({
    mailName: string()
      .required("이메일을 입력해주세요")
      .matches(/^[a-zA-Z]+$/, "영어만 입력 가능합니다"),
    domain: string()
      .required("도메인을 입력해주세요")
      .matches(/^(?:\w+\.)+\w+$/g, "정확한 도메인을 입력해주세요"),
  }),
  birthday: object().shape({
    year: number()
      .typeError("연도를 선택해주세요")
      .required("연도를 선택해주세요"),
    month: number()
      .typeError("월을 선택해주세요")
      .required("월을 선택해주세요"),
    day: number().typeError("일을 선택해주세요").required("일을 선택해주세요"),
  }),
});

export type User = InferType<typeof userSchema>;
