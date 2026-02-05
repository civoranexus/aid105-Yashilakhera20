import { useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [schemes, setSchemes] = useState([]);

  const update = e => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async () => {
    const res = await fetch("http://127.0.0.1:8000/eligibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setSchemes(json.schemes || []);
  };

  return (
    <div className="center-screen">
      <h2>Check Eligibility</h2>
      <input name="age" placeholder="Age" onChange={update} />
      <select name="gender" onChange={update}>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <select name="category" onChange={update}>
        <option>General</option>
        <option>OBC</option>
        <option>SC</option>
        <option>ST</option>
      </select>
      <input name="annual_income" placeholder="Annual Income" onChange={update} />
      <input name="state" placeholder="State" onChange={update} />
      <input name="city" placeholder="City" onChange={update} />
      <button onClick={submit}>Submit</button>

      {schemes.map(s => <p key={s}>{s}</p>)}
    </div>
  );
}
