import { InferType, object, string } from "yup";

export const userSchema = object({
  username: string().required("이름을 입력해주세요"),
  password: string().required("20자 이내의 비밀번호를 입력해주세요."),
  name: string().required("이름을 입력해주세요"),
  //   age: number().required().positive().integer(),
  //   email: string().email(),
  //   website: string().url().nullable(),
  //   createdOn: date().default(() => new Date()),
});

// // parse and assert validity
// const user = await userSchema.validate(await fetchUser());

export type User = InferType<typeof userSchema>;
// /* {
//   name: string;
//   age: number;
//   email?: string | undefined
//   website?: string | null | undefined
//   createdOn: Date
// }*/
