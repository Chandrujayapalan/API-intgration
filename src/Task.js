import React, { useState } from "react";
import './Login.css'

function Task() {
  const [name, setName] = useState("");
  const [nameerr, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailerr, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [passerr, setPassError] = useState("");
  const [password, setPassword] = useState("");
  const [phoneerr, setPhoneError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [datas, setData] = useState([]);

  const handleSubmit = () => {
    if (name === "") {
      setNameError("Name should be mandatory");
    } else {
      setNameError("");
    }
    if (email === "") {
      setEmailError("Email is mandatory");
    } else {
      setEmailError("");
    }
    if (phone.length > 10) {
      setPhoneError("Phone number exceeds Ten digits");
    } else if (phone.length < 10) {
      setPhoneError("Phone number less than Ten digits");
    } else {
      setPhoneError("");
    }
    if (password === "") {
      setPassError("Password is mandatory");
    } else {
      setPassError("");
    }
    if (email && name && phone && password) {
      setSubmit(true);
    }
    let late = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };
    fetch("http://54.174.247.198:9000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(late),
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  return (
    <div className="image">
      {!submit && (
        <div className="text-center top">
          <div className="mb-4">Register Now!</div>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            name="name"
            className="mb-4"
          ></input>
          {nameerr === "" ? null : (
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {nameerr}
            </span>
          )}
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          {emailerr === "" ? null : (
            <span style={{ fontWeight: "bold", color: "red" }}>{emailerr}</span>
          )}
          <br />
          <input
            type="password"
            placeholder="Password"
            name="pasword"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          {passerr === "" ? null : (
            <span style={{ fontWeight: "bold", color: "red" }}>{passerr}</span>
          )}
          <br />
          <input
            type="number"
            placeholder="Phone Number"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            className="mb-4"
          />
          {phoneerr === "" ? null : (
            <span style={{ fontWeight: "bold", color: "red" }}>{phoneerr}</span>
          )}
          <br />
          <button onClick={handleSubmit} className="btn btn-primary">Register</button>
        </div>
      )}
      {submit && (
        <div>
          <div>register succufutlly:{name}</div>
          {datas?.map((d) => (
            <div key={d.id}>
              <p>{d.message}</p>
              <p>{d.productPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Task;
