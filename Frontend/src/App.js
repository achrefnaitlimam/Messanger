import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Compement/Home/Home";
import Login from "./Compement/login/Login";
import Navarbar from "./Compement/FIxed/Navarbar";
import Register from "./Compement/register/Register";
import Messanger from "./Compement/Messanger/Messanger";
import MailVerif from "./Compement/register/MailVerif";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/MailVerif" element={<MailVerif />} />
        <Route path="/Room/:RoomName" element={<Messanger />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
