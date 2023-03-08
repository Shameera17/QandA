import * as yup from "yup";

export const Schema = yup.object().shape({
  question: yup.string().required("Please write a question")
});
