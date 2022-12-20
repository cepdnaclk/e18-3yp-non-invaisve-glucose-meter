/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";
import Axios from 'axios';

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useEffect, useState } from 'react'

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

function Cover() {

  const [password,setpassword] = useState("");
  const [email,setemail ]= useState("");
  const [name,setname ]= useState("");
  const [contact,setcontact ]= useState("");
  const [hospital,sethospital ]= useState("");
  const [specialized,setspecialized ]= useState("");


  const  loginsubmit = () =>{
    console.log(`email: ${email}  password ${password} username ${name} contact ${contact}`);
    Axios.post("http://52.221.105.255:3000/api/user/signup",{username:name,email:email,password:password,hospital:hospital, specialized_in:specialized,contact_no:contact,role:"2"})
    .then(function(response){
        console.log("data",response.data);
        
    })
    .catch((e)=>console.log(e)) 
    console.log("end");


}


  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth onChange={(e)=> setname(e.target.value)}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={(e)=> setemail(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth  onChange={(e)=> setpassword(e.target.value)}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Contact no" variant="standard" fullWidth onChange={(e)=> setcontact(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Hospital" variant="standard" fullWidth onChange={(e)=> sethospital(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Specilized in" variant="standard" fullWidth onChange={(e)=> setspecialized(e.target.value)} />
            </MDBox>
           
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={loginsubmit}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text" >
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
