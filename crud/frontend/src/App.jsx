import { useState, useEffect } from "react"

import Login from "./components/Login"

const App = () => {
  // const [users, setUsers] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(()=> {
  //   fetch("http://localhost:8080/users")
  //   .then(res => res.json())
  //   .then(data => setUsers(data))
  //   .catch(err => setError(err))
  // })

  //  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="w-screen bg-amber-600/25 py-4 overflow-x-hidden">
      <h1 className="text-3xl text-black font-bold font-sans text-center">Create Read Update Delete (CRUD) Application</h1>
      </div>
      <div className="">
        <h2 className="text-3xl text-black font-bold font-sans text-center">Users List</h2>
        <ul className="font-sans flex justify-center items-center flex-col gap-2 bg-black/45 w-1/2">
          {/* {users.map((user)=> (
            <li key={user.id}>{user.name}</li>
          ))} */}
          <li className="text-white p-1.5 text-center ">Lorem ipsum dolor sit amet.</li>
          <li className="text-white p-1.5 text-center">Lorem ipsum dolor sit amet.</li>
          <li className="text-white p-1.5 text-center">Lorem ipsum dolor sit amet.</li>
          <li className="text-white p-1.5 text-center ">Lorem ipsum dolor sit amet.</li>
        </ul>
      </div>
      <div className="">
        <Login />
      </div>
    </div>
  )
}

export default App