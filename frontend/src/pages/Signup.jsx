import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({});

  const submit = async () => {
    const res = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(`Registered! Your ID: ${data.userId}`);
    nav("/create-account");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>New User Registration</h2>
        <input placeholder="First Name" onChange={e=>setForm({...form, firstName:e.target.value})}/>
        <input placeholder="Last Name" onChange={e=>setForm({...form, lastName:e.target.value})}/>
        <input placeholder="Mobile" onChange={e=>setForm({...form, mobile:e.target.value})}/>
        <input placeholder="Email" onChange={e=>setForm({...form, email:e.target.value})}/>
        <input placeholder="DOB" onChange={e=>setForm({...form, dob:e.target.value})}/>
        <input placeholder="Nationality" onChange={e=>setForm({...form, nationality:e.target.value})}/>
        <input placeholder="State" onChange={e=>setForm({...form, state:e.target.value})}/>
        <input placeholder="City" onChange={e=>setForm({...form, city:e.target.value})}/>
        <input placeholder="Urban / Rural" onChange={e=>setForm({...form, areaType:e.target.value})}/>
        <input placeholder="Aadhaar" onChange={e=>setForm({...form, aadhaar:e.target.value})}/>
        <button onClick={submit}>Register</button>
      </div>
    </div>
  );
}
