import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import Toastify from 'toastify-js'

export default function QR() {
    const [url,setUrl] = useState(window.location.origin + "/place_order/" + table);
    const [table,setTable] = useState();
    const [toogle,setToogle] = useState(false);
    const [data,setData] = useState([]);
    useEffect(function(){
      fetch("http://darkevo24.pythonanywhere.com/get_table").then(res => res.json()).then(res => setData(res.item))
    },[data])
    function Submit(){
      setUrl(window.location.origin + "/place_order/" + table)
       fetch(`http://darkevo24.pythonanywhere.com/add_table/${table}`).then(function(res){
        return res.json();
      }).then(function(res){
        if (res == false){
          setToogle(false);
          Toastify({
            text: "put another number!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, orange, orange)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
      }
      else {
        setToogle(true);
      }
    })
    }

    function Delete(){
      fetch("http://darkevo24.pythonanywhere.com/delete_table",{
        method:"DELETE"
      }).then(res => res.json()).then(res => console.log(res)).catch(err => console.log(err))
    }
  return (
    <div style={{ textAlign : "center" ,display:"flex",alignItems:"center",flexDirection:'column' }}>
      <h1>Table Served</h1>
      <div style={{ 	gridTemplateColumns: "repeat(6, minmax(0, 1fr))",	gap: '1.25rem',display : "grid" }}>
      {data.map(function(item,index){
        return (
          <div  key={index}>
            <p style={{ font:"bolder" }}>{item.table}</p>
          </div>
        )
      })}
      </div>
      <button onClick={Delete} style={{ height:40,marginTop:10 }}>Delete All Tables</button>
      <div style={{ textAlign : "center" ,display:"flex",alignItems:"center",flexDirection:'column'}}>
        <p style={{ marginTop:20 }}>Input No of Table</p>
        <input onChange={function(e){setTable(e.target.value)}} type="number"></input>
        <button onClick={Submit} style={{ height:40,marginTop:10 }}>Submit</button>
      </div>
      {(table && toogle )
          &&
          <div>
          <div style={{ height: "auto", margin: "0 auto",maxWidth:300, width: "100%",padding:20 }}>
          <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={url}
          viewBox={`0 0 256 256`}
          />
      </div>
      <h3>table {table}</h3> 
      </div>
      }
    </div>
  )
}
