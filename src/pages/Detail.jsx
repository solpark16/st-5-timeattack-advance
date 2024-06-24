import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../api/todos";
import { useQuery } from "@tanstack/react-query";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDetail = async () => {
    const response = await todoApi(`/todos/${id}`);
    return response.data;
  };

  // TODO: useQuery 로 리팩터링 하세요.
  const { data, isPending, isError } = useQuery({
    queryKey: ["todos", id],
    queryFn: fetchDetail,
  });

  if (isPending) return <div style={{ fontSize: 36 }}>로딩중...</div>;
  if (isError) {
    console.error(isError);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {isError.message}</div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>홈으로 이동</button>
      <p>제목: {data.title}</p>
      <p>내용: {data.contents}</p>
      <p>작성일자: {new Date(data.createdAt).toDateString()}</p>
    </div>
  );
}
