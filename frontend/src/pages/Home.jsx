import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import Spinner from "../components/Spinner";
import axios from "../lib/axios";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data: books, isLoading: loading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const { data } = await axios.get("/books");
      return data.data;
    },
  });

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Books List</h1>
          <Link to="/books/create">
            <div className="flex items-center gap-x-2 bg-sky-800 text-white px-2 py-1 rounded-lg w-fit">
              <p>Create Book</p>
              <MdOutlineAddBox className="white text-2xl" />
            </div>
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">Title</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Author
                </th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Publish Year
                </th>
                <th className="border border-slate-600 rounded-md">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {books &&
                books.map((book, index) => (
                  <tr key={book._id} className="h-8">
                    <td className="border border-slate-700 rounded-md text-center">
                      {index + 1}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {book.title}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      {book.author}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      {book.publishYear}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      <div className="flex justify-center gap-x-4">
                        <Link to={`/books/details/${book._id}`}>
                          <BsInfoCircle className="text-green-800 text-2xl" />
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                          <AiOutlineEdit className="text-yellow-600 text-2xl" />
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                          <MdOutlineDelete className="text-red-600 text-2xl" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Home;
