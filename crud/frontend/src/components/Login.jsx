import { useState } from "react";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handle_login = () => {
        const new_user = {
            name: name,
            email: email
        }

        fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_user)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
  return (
    <div className="">
    <div>
        <label >name:</label>
        <input type="text" onChange={(e)=> setName(e.target.value)} className="bg-black"/>
    </div>
    <div>
        <label >email:</label>
        <input type="email"  onChange={(e)=> setEmail(e.target.value)} className="bg-black"/>
    </div>
    <button onClick={handle_login} className="bg-blue-500 p-2 rounded-2xl">login</button>
    </div>
  )
}

export default Login