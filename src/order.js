import React, { useState } from "react";


function Order() {
    const [order, setOrder] = useState([])

  

        fetch("http://localhost:9000/api/listorder", {
            method: "GET",
            headers: { Authorization: localStorage.getItem("Authorization") },
        })
            .then((x) => x.json())
            .then((data) => setOrder(data))
    
    return (
        <div>
         
                <div>
                    {order?.data?.map(a =>
                        <div>
                            <table class="table" width="54%">
                                <thead>
                                    <tr>
                                        <th >CustumerName</th>
                                        <th> products/Price</th>
                                        <th >date</th>
                                        <th >Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td width="1%">{a.CustumerName}</td>
                                        <td width="1%">{a.ProductsDetails.map(b => <div>
                                            <p>{b.productName}</p>
                                            <p>{b.productPrice}</p>
                                        </div>)}</td>
                                        <td width="1%">{a.Date}</td>
                                        <td width="1%">{a.Total}</td>
                                    </tr>

                                </tbody>
                            </table>

                            {/*                             
                            <p>{a.CustumerName}</p>
                            <p>{a.ProductsDetails.map(b => <div>
                                 <p>{b.productName}</p>
                                <p>{b.productPrice}</p>
                                 </div> )}</p>
                            <p> {a.Total}</p> */}
                        </div>
                    )}
                </div>

            
        </div >
    );
};

export default Order;