import React from "react";

const Todo = () => {
  return (
    <div>
      <div className="text-center w-full px-40 space-y-3">
        <p className="font-extrabold text-5xl font-sans">
          Turn Intentions into Actions One Task at a Time.
        </p>
        <p className="font-sans italic font-medium">
          Stay focused. Stay organized. Stay unstoppable.
        </p>
      </div>

      <div className="my-15">
        <div className="px-50">
          <div className="bg-gray-100/15 rounded-xl w-full py-3 flex justify-between">
            <div className="flex justify-center items-center">
              <input type="checkbox" name="complete" className="mx-3 border-none p-1" />
              <p className="font-medium font-sans">Coding</p>
            </div>
            <div className="flex justify-center items-center">
            <button type="submit" className="bg-fuchsia-300 mx-3 text-black px-7 py-1.5 cursor-pointer rounded-4xl font-medium">Edit</button>
            <button type="submit" className="bg-red-800 mx-3 text-black px-7 py-1.5 cursor-pointer rounded-4xl font-medium">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
