import { useMutation, useQueries } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    publishYear: "",
  });

  const { mutate, isPending: loading } = useMutation({
    mutationFn: (newBook) => {
      return axios.post("/books", newBook);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });

  const navigate = useNavigate();
  return (
    <>
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Create Book</h1>
        {loading ? <Spinner /> : ""}
        {/* {error && <h5 onClick={() => reset()}>{error}</h5>} */}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              className="border-2 border-slate-500 px-4 py-2 w-full"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              className="border-2 border-slate-500 px-4 py-2 w-full"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="text"
              className="border-2 border-slate-500 px-4 py-2 w-full"
              value={form.publishYear}
              onChange={(e) =>
                setForm({ ...form, publishYear: e.target.value })
              }
            />
          </div>
          <button
            className="p-2 bg-sky-300 m-8"
            onClick={async () => {
              await mutate(form);
              navigate("/");
            }}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateBook;
