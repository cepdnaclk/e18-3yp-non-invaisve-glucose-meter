import React from "react";
import Axios from 'axios'



export default function RequestListItem(props,num){


    let username = "";
        let email ="";
        let updatedAt ="";
        let id;
        let number;

    try{
     id = props._id ;
     username = props.username;
     email =props.email;
     updatedAt = props.updatedAt
     number = num;
    }
    catch(e){
        console.log(e)
        username = "";
        email ="";
        updatedAt ="";
    }


    return (

    
        <div class="container-fluid">
             <div class="row">
             <div className="col-8">
                    {/* <Badge variant="light">{number}</Badge>{' '} */}
                    <span class="badge bg-secondary">{number}</span>
                    {/* <ListGroup>
                    <ListGroupItem>Name :{username} </ListGroupItem>
                    <ListGroupItem>Email : {email}</ListGroupItem>
                    <ListGroupItem>Updated at: {updatedAt}</ListGroupItem>  
                    </ListGroup> */}
                    <ul class="list-group">
                        <li class="list-group-item">Name :{username} </li>
                        <li class="list-group-item">Email : {email}</li>
                        <li class="list-group-item">Updated at: {updatedAt}</li>
                    </ul>
                </div>
                <div className="col-2">
   
                    <button  type="button" class="btn btn-success"className="reqlistitemButton" onClick={()=> {
                        console.log(`id ${id}`)
                        Axios.post(`http://localhost:8000/api/admin/accept/${id}`)
                        .then(function(response){
                            console.log(response);
                            
                        })
                        .catch((e)=>console.log(e)) 

                        }}>Accept</button>
                        
                    <button  type="button" class="btn btn-danger" className="reqlistitemButton" onClick={()=> {
                        console.log(`id ${id}`)
                        Axios.post(`http://localhost:8000/api/admin/delete/${id}`)
                        .then(function(response){
                            console.log(response);
                            
                        })
                        .catch((e)=>console.log(e)) 

                        }}> Decline</button>
                </div>
            </div>
        </div>
    )

    }
