import React from "react";
import axios from "../lib/axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useQuery } from "@tanstack/react-query";

const ShowBook = () => {
  const { id } = useParams();
  const { data: book, isLoading: loading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const { data } = await axios.get(`/books/${id}`);
      return data;
    },
  });
  return (
    <>
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Show Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Title:</span>
                <span>{book.title}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Author:</span>
                <span>{book.author}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">
                  Publish Year:
                </span>
                <span>{book.publishYear}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Create Time:</span>
                <span>{new Date(book.createdAt).toLocaleString()}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">
                  Last Update Time:
                </span>
                <span>{new Date(book.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShowBook;
