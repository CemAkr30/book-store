import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.delete(`/books/${id}`).then(() => {
      navigate("/");
    });
  }, [id]);
  return <></>;
};

export default DeleteBook;
