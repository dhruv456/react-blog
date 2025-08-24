import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import authService from "./service/auth";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const onSubmitClick = (e) => {
    e.preventDefault();
    const details = {
      name,
      email,
      password,
    };
    setName("");
    setEmail("");
    setPassword("");
    // authService.createAccount({
    //   emailId: email,
    //   password,
    //   name,
    // });
    authService.login({
      emailId: email,
      password,
      name,
    });
    console.log(details);
  };

  useEffect(() => {
    const c = async () => {
      const a = await authService.GetLogInUser();
      console.log(a);
      setUser(a);
    };
    c();
  }, []);
  const checkStatus = () => {};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 flex-col">
      <h3 className="font-bold text-2xl">Register here</h3>
      <form className="border rounded-2xl p-4 flex flex-col gap-4">
        <Input lable={"Name"} value={name} setValue={setName} />
        <Input lable={"Email"} value={email} setValue={setEmail} />
        <Input
          lable={"Password"}
          type={"password"}
          value={password}
          setValue={setPassword}
        />
        <button className="border" onClick={onSubmitClick}>
          Submit
        </button>
      </form>
      <button className="text-blue-800 cursor-pointer">
        check if login status
      </button>
      <h1>{user === null ? `Pls log in` : "user is logged in"}</h1>
    </div>
  );
}

export default App;
