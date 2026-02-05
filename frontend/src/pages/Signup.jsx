import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    dob: "",
    nationality: "",
    state: "",
    city: "",
    aadhaar: "",
    area_type: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Registration failed");
        return;
      }

      alert("Registration successful");
      localStorage.setItem("user_id", data.user_id);
      navigate("/create-account");

    } catch {
      alert("Server not reachable");
    }
  };

  return (
    <div className="page">
      <h2>New User Registration</h2>

      <input name="first_name" placeholder="First Name" onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input name="mobile" placeholder="Mobile" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="date" name="dob" onChange={handleChange} />
      <input name="nationality" placeholder="Nationality" onChange={handleChange} />
      <input name="state" placeholder="State" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} />
      <select name="area_type" onChange={handleChange}>
        <option value="">Area Type</option>
        <option value="Urban">Urban</option>
        <option value="Rural">Rural</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
