import React from 'react';
import { Link ,useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';

function Signup() {

  
  const [password,setpassword] = useState("");
  const [email,setemail ]= useState("");
  const [firstName,setfirstName] = useState("");
  const [lastName,setlastName ]= useState("");
  const navigate = useNavigate();
  const age = 50;
  const height =20;
  const weight =30;
  const contact_no = 33;

  const  loginsubmit = () =>{
      console.log(`email: ${email}  password ${password} firstName ${firstName} lastName ${lastName} `);
      Axios.post("http://52.221.105.255:3000/api/auth/signup",{email:email,password:password,username :firstName + lastName ,contact_no :contact_no,weight:weight,height:height,age:age})
      .then(function(response){
          console.log("data",response.data);
          
              navigate('/')
          // if (response.data.role === "admin") {
          //     navigate('/admin')
          // } else {
          //     navigate('/')
              
          // }
      })
      .catch((e)=>console.log(e)) 
      console.log("end");

 }



  return (
    <MDBContainer fluid className='p-4'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            Signup
          </p>

        </MDBCol>

        <MDBCol md='6'>

          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' onChange={(e)=> setfirstName(e.target.value)}/>
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text' onChange={(e)=> setlastName(e.target.value)}/>
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email 'onChange={(e)=> setemail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'onChange={(e)=> setpassword(e.target.value)}/>

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <MDBBtn className='w-100 mb-4' size='md'onClick={loginsubmit} >sign up</MDBBtn>

              <div className="text-center">

                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>

              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;