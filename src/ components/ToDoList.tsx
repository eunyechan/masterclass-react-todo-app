import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  background-color: #222424;
  height: 100vh;
`;

const HeaderTitle = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 60px;
  font-weight: bolder;
`;

const SelectContainer = styled.select`
  width: 100%;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 5px;
  background-color: transparent;
  color: white;
  font-size: 20px;
`;

const Option = styled.option`
  color: black;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <>
      <body>
        <Container>
          <HeaderTitle>To Dos</HeaderTitle>
          <hr style={{ opacity: "0.4" }} />
          <SelectContainer value={category} onInput={onInput}>
            <Option value={Categories.TO_DO}>To Do</Option>
            <Option value={Categories.DOING}>Doing</Option>
            <Option value={Categories.DONE}>Done</Option>
          </SelectContainer>
          <CreateToDo />
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </Container>
      </body>
    </>
  );
}

export default ToDoList;
