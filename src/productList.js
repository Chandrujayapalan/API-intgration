import React, { useState } from "react";
import belt from "../src/assests/belt.jpg";
import laptop from "../src/assests/laptop.jpg";
import phone from "../src/assests/phone.jpg";
import shoe from "../src/assests/shoe.jpg";
import slipper from "../src/assests/slipper.jpg";
import spoon from "../src/assests/spoon.jpg";
import watch from "../src/assests/watch.jpg";
import "./Login.css";
import Order from './order'
import { BsFillPlusSquareFill } from "react-icons/bs";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function ProductList() {
    let totalPrice = 0
    const [userName, setName] = useState("");
    const [nameerr, setNameError] = useState("");
    const [passerr, setPassError] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState("");
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
    
    const handlePlace = () => {

        let late = {
            items: items,
            date: date
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
          
            <Link to='/order' className="text-decoration-none ms-2 text-dark text-end">Your orders</Link>


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
                    <input type="date" onChange={(e) => setDate(e.target.value)}></input>

                    <div className="text-center top">
                       <button onClick={handlePlace} className="btn btn-primary">
                            Place Order
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

                    <div>
                        {

                            <div>
                                <p>{orders?.data?.items}</p>
                            </div>
                        }

                    </div>
                </div>

            )}



export default ProductList;