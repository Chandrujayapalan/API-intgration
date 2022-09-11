import React, { useState } from "react";
import belt from "../src/assests/belt.jpg";
import laptop from "../src/assests/laptop.jpg";
import phone from "../src/assests/phone.jpg";
import shoe from "../src/assests/shoe.jpg";
import slipper from "../src/assests/slipper.jpg";
import spoon from "../src/assests/spoon.jpg";
import watch from "../src/assests/watch.jpg";
import "./Login.css";
import { BsFillPlusSquareFill } from "react-icons/bs";

function Login() {
  let totalPrice = 0

  const [userName, setName] = useState("");
  const [nameerr, setNameError] = useState("");
  const [passerr, setPassError] = useState("");
  const [password, setPassword] = useState("");
  // const [date, setDate] = useState("");

  const [submit, setSubmit] = useState(false);
  const [datas, setData] = useState([]);
  const [items, setItemss] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [orders, setOrder] = useState([]);

  const image = [
    {
      img: laptop,
    },
    {
      img: phone,
    },
    {
      img: belt,
    },
    {
      img: shoe,
    },
    {
      img: slipper,
    },
    {
      img: watch,
    },
    {
      img: spoon,
    },
  ];

  const handleSubmit = () => {
    if (userName === "") {
      setNameError("Name should be mandatory");
    } else {
      setNameError("");
    }
    if (password === "") {
      setPassError("Password is mandatory");
    } else {
      setPassError("");
    }
    let late = {
      username: userName,
      password: password,
    };

    fetch("http://54.174.247.198:9000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(late),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.message === "password does not match") {
          alert("password");
        } else if (data?.message === "no user found") {
          alert("no user found");
        } else {
          setSubmit(true);
        }

        localStorage.setItem("Authorization", `Bearer ${data.data.token}`);
      });

    fetch("http://54.174.247.198:9000/api/listproduct", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("Authorization") },
    })
      .then((x) => x.json())
      .then((data) => {
        let a = data?.result.map((x, i) => {
          x.image = image[i].img;
          return x;
        });
        setData(a);
      });
  };
  const handlePlace = () => {
    let late = {
      items: items,
      date: "2022-06-29"
    };
    console.log(late, "kjfkhahdkjfhdhjd")
    fetch("http://54.174.247.198:9000/api/orderplace", {
      method: "POST",
      headers: { Authorization: localStorage.getItem("Authorization"), "Content-Type": "application/json" },
      body: JSON.stringify(late),

    })
      .then((response) => response.json()).then((data) => setOrder(data))
  }
  const addCart = (e) => {
    // console.log(e._id, "asjgasdgasj")

    setItemss(i => [...i, e._id])
    setItemName(i => [...i, e])
  };

  return (
    <div>
      {!submit && (
        <div className="text-center top">
          <div className="mb-4">Login Now!</div>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            name="username"
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
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          {passerr === "" ? null : (
            <span style={{ fontWeight: "bold", color: "red" }}>{passerr}</span>
          )}
          <br />
          <button onClick={handleSubmit} className="btn btn-primary">
            Login
          </button>
        </div>

      )}
      {submit && (
        <div>
          <div>Welcome:{userName}</div>
          <div className="product">
            {datas?.map((d, i) => (
              <div key={i}>
                <img src={d.image} alt="" width="100" height="100"></img>
                <div className="d-flex justify-content-between">
                  <div>
                    <p>{d.productsName}</p>
                    <p>{d.productPrice}</p>
                  </div>
                  <BsFillPlusSquareFill
                    className="mt-3"
                    key={d._id}
                    onClick={() => addCart(d)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center top">
            <button onClick={handlePlace} className="btn btn-primary">
              Place Oder
            </button>

          </div>
          <div className=" justify-content-between">
            {

              itemName.map(a => 
                <div>
                  <p>{a.productsName} : {a.productPrice}</p>
                  <p> Total  : {totalPrice += a.productPrice} </p>

                </div>
          )
            }
          </div>


        </div>
      )}
    </div>
  );
}

export default Login;
