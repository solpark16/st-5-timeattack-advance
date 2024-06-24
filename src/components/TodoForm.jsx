import { useState } from "react";
import { todoApi } from "../api/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function TodoForm({ fetchData }) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const queryClient = useQueryClient();

  // TODO: useMutation 으로 리팩터링 하세요.
  const handleAddTodo = async () => {
    setTitle("");
    setContents("");
    await todoApi.post("/todos", {
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      createdAt: Date.now(),
    });
  };

  const addMutation = useMutation({
    mutationFn: handleAddTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addMutation.mutate();
      }}
    >
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
