import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {deleteTokensCustomer} from './auth';
import './customer.css'

export default function Checkout(){
    const {id} = useParams();
    const [data,setData] = useState([]);

    useEffect(function(){
        fetch('http://darkevo24.pythonanywhere.com/get_checkout/' + id).then(res => res.json()).then(res => {
            setData({...res,food : JSON.parse(res.food)})
          })
    },[])

    return (
        <div className="bg3" style={{textAlign: "left",padding : 30}}>
            <div style={{ background : "white",padding : 30,borderRadius:10,boxShadow : "5px 10px" }}>
                <p style={{ color : "orange" }}>Ordered Date : {data.date}</p>
                {data.food && data.food.map(function(item,index,array){
                    for (let i=0;i<index;i++){
                        if (item == array[i]){
                            data.splice(index,1);
                        }
                    }
                    return (
                        <div style={{ boxShadow : "1px 2px",marginTop : 10,padding:10 ,display:"flex"}} key={index}>
                            <div style={{ textAlign : "left",width : "100%" }}>
                            <h3>{item.name}</h3>
                            <p>x {item.quantity}</p>
                            </div>
                            <div style={{ display:"flex",alignItems : "center" }}>
                                <h1>Rm{item.price}</h1>
                            </div>
                        </div>
                    )
                })}
                <div style={{marginTop : 10,padding:10 ,display:"flex"}}>
                    <div style={{ textAlign : "left",width : "100%" }}>
                    <p>Sub Total</p>
                    <h3 style={{ color : "orange" }}>Total</h3>
                    </div>
                    <div >
                        <p>Rm{data.amount}</p>
                        <h3 style={{ color : "orange" }}>Rm{data.amount}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}