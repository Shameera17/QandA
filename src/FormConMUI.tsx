import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "./Schema";
import { Button, TextField } from "@mui/material";
import { responseGetter } from "./helpers/openai/aiapi";
const FormConMUI: FC = () => {
  const [description, setDescription] = useState("");
  const onSubmit = async (data: any) => {
    const response = await responseGetter(data.question);
    setDescription(response?.choices[0]?.text ?? "");
  };

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ resolver: yupResolver(Schema) });
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        padding: 10,
        margin: 10
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="question"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            placeholder="Question"
            error={errors?.question?.message ? true : false}
            helperText={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <TextField
        disabled={true}
        variant="standard"
        value={`Ans ${description}` ?? ""}
      />
      <Button style={{ width: "50%" }} variant="contained" type="submit">
        Ask
      </Button>
    </form>
  );
};

export default FormConMUI;
