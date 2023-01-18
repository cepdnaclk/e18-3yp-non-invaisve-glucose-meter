import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import LineChart from "./LineChart";
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link ,useNavigate } from 'react-router-dom'

function Dashboard(){

const [patients, setPatients] = useState([]);
const [graphdata, setgraphdata] = useState([]);
const [items, setItems] = useState([1, 2, 3, 4]);
const [latest, setlatest] = React.useState("Loading");
const [average, setaverage] = React.useState("Loading");
const [highest, sethighest] = React.useState("Loading");
const [lowest, setlowest] = React.useState("Loading");
const [code, setlcode] = React.useState("Loading");

let role = false ;
const navigate = useNavigate();

async function onhandle(id){    
    console.log("here",id);   
    getMeasurements(id);
   await getMeasurements(id).then(()=>{
    

   }
   )
   .catch(error=>{
    console.log(error);

   })

}



const getData = () => {
   
        let at = sessionStorage.getItem("accesstoken");
        let code = sessionStorage.getItem("code");
        
        // console.log("token",at);

        axios.get("http://52.221.105.255:3000/api/doctor/allPatients", {
        headers: {
            Authorization: `Bearer ${at}`
        }
        })
        .then((response) => {
            console.log(response.data);
            setPatients(response.data);
            console.log("hear");
            setlcode(code);
            // console.log(patients);
        })
        .catch(error => {
            console.log(error);
            console.log("hear error");
        });
}
  

const getMeasurements =(email) =>{
    let at = sessionStorage.getItem("accesstoken");
    // console.log("token",at);

    axios.get(`http://52.221.105.255:3000/api/glucose/getMonthlyValues/${email}/2023-02`, {
    headers: {
        Authorization: `Bearer ${at}`
    }
    })
    .then((response) => {
        console.log(response.data);
        setgraphdata(response.data.monthValues);
        getlatest(response.data.latestValue);
        return response.data.monthValues;
    })
    .then((data)=>{
        // console.log("glucose",graphdata);
        // console.log(patients);
    //    console.log(getMax(data,"value").value);
    //    console.log("avg",getAvg(data,"value"));
    //    console.log("min",getMin(data,"value").value);
       sethighest(parseInt(getMax(data,"value").value));
       setaverage(parseInt(getAvg(data,"value")));
       setlowest(parseInt(getMin(data,"value").value));
    }

    )
    .catch(error => {
        console.log(error);
        console.log("glucose error");
    });
}

const getlatest = (data) =>{
    // setlatest(data[0].);
    console.log(data[0].value);
    setlatest(data[0].value);
}

useEffect(() => {
    getData();
    // getMeasurements();
    // console.log("get",patients);
}, []);

function getMax(arr, prop) {
    let max;
    for (let i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}
function getMin(arr, prop) {
    let min;
    for (let i=0 ; i<arr.length ; i++) {
        if (min == null || parseInt(arr[i][prop]) < parseInt(min[prop]))
            min = arr[i];
    }
    return min;
}
function getAvg(arr, prop) {
    let max=0;
    for (let i=0 ; i<arr.length; i++) {
            max += parseInt(arr[i][prop]);
    }
    return (max/arr.length).toFixed(2);
}

function onclickcode() {
    navigate('/');
}





    return(
        <div>
            

            <nav class="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">glucoStat</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
                        </li>
                        {role &&<li class="nav-item">
                        <a class="nav-link" href="requests">Requests</a>
                        </li>}
                        {/* <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                        </li> */}
                    </ul>
                    <form class="d-flex" role="search">
                        {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
                        {/* <button type="button" class="btn btn-outline-light me-2" >Code</button> */}
                        <button type="button" class="btn btn-dark me-2">Code</button>
                        <button type="button" class="btn btn-dark me-4">{code}</button>
                        <button type="button" class="btn btn-outline-light me-2" onClick={onclickcode} >Log out</button>
                        
                        {/* <button type="button" class="btn btn-outline-danger me-2">Log Out</button> */}
                    </form>
                    </div>
                </div>
            </nav>


            <div class="container-fluid">
                <div class="row">
                    <div className="col-2 patients">
                        <h2 className="mt-4">Patients</h2>

                        {/* <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
                                    Accordion Item #1
                                </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. 
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" 
                                // onClick={e=>onhandle(e.currentTarget.id)}
                                >
                                    Accordion Item #2
                                </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id={"headingThree"}>
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Accordion Item #3
                                </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
                                </div>
                                </div>
                            </div>
                            
                         
                        </div> */}

                        <div className="accordion" id="accordionExample">
                                    { patients.map((item, i) => {
                                        return (
                                        <div className="accordion-item" key={i}>
                                            <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" 
                                                data-bs-toggle="collapse" 
                                                data-bs-target={'#collapse' + i} onClick={e=>onhandle(item.email)}>
                                                Patient :<strong>{item.name}</strong>
                                            </button>
                                            </h2>
                                            <div id={'collapse' + i} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p>Patient :<strong>{" "+item.name}</strong></p>
                                                <ul>
                                                    <li> Age: {item.age}</li>
                                                    <li> Weight: {item.weight}</li>
                                                    <li> Height: {item.height}</li>
                                                    <li> Email: <a href={`mailto:${item.email}`}> {item.email}</a></li>
                                                </ul>
                                            </div>
                                            </div>
                                        </div>
                                        )
                                    }) }
                            </div>
                                        
                    </div>
                    <div class="col-10">
                        <h2>Insights</h2>

                        <div class="container-fluid ">
                            <div class="row">
                                <div class="col-6">

                                    <div class="container text-center overflow-hidden">
                                        <div class="row row-cols-2 g-4">
                                            <div class="col ">
                                                <div className="patient-glucose border border-dark">Latest
                                                <div>{latest}</div>
                                                </div>
                                            </div>
                                            <div class="col ">
                                                <div className="patient-glucose border border-dark">Average
                                                <div>{average}</div>
                                                </div>
                                            </div>
                                            <div class="col ">
                                                <div className="patient-glucose border border-dark">Highest
                                                <div>{highest}</div>
                                                </div>
                                            </div>
                                            <div class="col ">
                                                 <div className="patient-glucose border border-dark">Lowest
                                                 <div>{lowest}</div>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="col-6 ">
                                    <span> value</span>

                                <LineChart data={graphdata}/>
                                <div class="container text-center">
                                    <div class="row"> 
                                        <div class="col align-self-center">
                                                     date
                                                                             </div>
                                        </div>
                                </div>
                                
                                
                                </div>
                               
                            </div>
                        </div>

                        <div> 
                            <div>
                                

{/* <div className="accordion" id="accordionExample">
            { patients.map((item, i) => {
                return (
                <div className="accordion-item" key={i}>
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target={'#collapse' + i}>
                        Accordion Item { item }
                      </button>
                    </h2>
                    <div id={'collapse' + i} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>This is the item { item } accordion body.</strong> It's slso worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                      </div>
                    </div>
                </div>
                )
            }) }
        </div> */}

                            </div>


                           
                                  
                        </div>

                        <div>
                            
                            
                        </div>

                
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dashboard;