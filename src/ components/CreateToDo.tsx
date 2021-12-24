import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const Form = styled.form`
  display: flex;
  height: 35px;
  margin: 10px 0px;
`;

const FormInput = styled.input`
  display: "flex";
  width: "400px";
  background-color: transparent;
  padding: 5px;
  border-right: none;
  margin-right: 10px;
  color: white;
  font-size: 18px;
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  border-radius: 10px;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <>
      <Form onSubmit={handleSubmit(handleValid)}>
        <FormInput
          style={{ display: "flex", width: "400px" }}
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <Button>Add</Button>
      </Form>
    </>
  );
}

export default CreateToDo;
