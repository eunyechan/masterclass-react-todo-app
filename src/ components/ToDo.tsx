import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";

const List = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 30px;
  justify-content: space-between;
`;

const Span = styled.span`
  color: rgb(255, 255, 255);
  font-size: 18px;
`;

const Button = styled.button`
  display: flex;
  box-sizing: border-box;
  background-color: transparent;
  color: white;
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      console.log(oldToDo, newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <List>
      <Span>{text}</Span>
      <div style={{ display: "flex" }}>
        {category !== Categories.DOING && (
          <Button name={Categories.DOING} onClick={onClick}>
            Doing
          </Button>
        )}
        {category !== Categories.TO_DO && (
          <Button name={Categories.TO_DO} onClick={onClick}>
            ToDo
          </Button>
        )}
        {category !== Categories.DONE && (
          <Button name={Categories.DONE} onClick={onClick}>
            Done
          </Button>
        )}
      </div>
    </List>
  );
}
export default ToDo;
