import React from "react";
import * as Components from './Components';
import axios from "axios";
import { Link ,useNavigate } from 'react-router-dom'

function Authentication() {
    const [signIn, toggle] = React.useState(true);
    const [name, setname] = React.useState("");
    const [email, setemail] = React.useState("");
    const [password, setpassword] = React.useState("");
    const [password2, setpassword2] = React.useState("");
    const [number, setnumber] = React.useState("");
    const [hospital,sethospital] = React.useState("");
    const [specilizedin,setspecilizedin] = React.useState("");
    const [SLMC, setSLMC] = React.useState("");

    const [sign_email, sign_setemail] = React.useState("");
    const [sign_password, sign_setpassword] = React.useState("");

    const navigate = useNavigate();
    const inputElement = React.useRef()

   function onhandle(){
       console.log(`name : ${name} password: ${password}`);
       // alert(`name : ${name} password: ${password}`);
       // alert("hello");
    //    document.getElementById("signupbutton").click();
    }
    

    const  signinsubmit = () =>{
        console.log(`email: ${email}  password ${password} password2${password2}  username ${name} contact ${number} hospital ${hospital} specilzed ${specilizedin}`);
        if(password != password2) 
        {
            alert("passwords don't match ");
            // return false;
        }else{
        axios.post("http://52.221.105.255:3000/api/auth/web/signup",{username:name,email:email,password:password,hospital:hospital, specialized_in:specilizedin,contact_no:number,role:"2"})
        .then(function(response){
            alert("You have succesfully Signed up");
            console.log("data",response.data);
            console.log("end1");
            document.getElementById("signupbutton").click();
            inputElement.click();
            
        })
        .catch((e)=>console.log(e)) 
        console.log("end");
      }

    }


    const  signupsubmit = () =>{
        console.log(`email: ${sign_email}  password ${sign_password}`);
        axios.post("http://52.221.105.255:3000/api/auth/web/login",{email:sign_email,password:sign_password})
        .then(function(response){
            console.log("data",response.data);
            sessionStorage.setItem("accesstoken", response.data.access_token);
            sessionStorage.setItem("refreshtoken", response.data.refresh_token);
            // console.log("data",response.data.access_token);
            // let at = sessionStorage.getItem("accesstoken");
            // console.log("data from st",at);

            navigate('/dashboard');
            
        })
        .catch((e)=>console.log(e)) 
        console.log("end");
    
    
    }


    

     return(
        <div className="Authentication">
         <Components.Container signinIn={true} >
             <Components.SignUpContainer>
                 <Components.Form>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='Name' onChange={e => setname(e.target.value)}/>
                     <Components.Input type='email' placeholder='Email' onChange={e => setemail(e.target.value)} />
                     <Components.Input type='password' placeholder='Password' onChange={e =>setpassword(e.target.value)} />
                     <Components.Input type='password' placeholder='Retype Password' onChange={e =>setpassword2(e.target.value)} />
                     <Components.Input type='number' placeholder='Contact No' onChange={e => setnumber(e.target.value)}/>
                     <Components.Input type='text' placeholder='Hospital'onChange={e => sethospital(e.target.value)} />
                     <Components.Input type='number' placeholder='SLMC Number' onChange={e => setspecilizedin(e.target.value)} />
                     {/* <Components.Input type='number' placeholder='SLMC No' onChange={e => setSLMC(e.target.value)} /> */}
                     <Components.Button type="button" onClick={signinsubmit}>Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={true}>
                  <Components.Form>
                      <Components.Title>Sign in</Components.Title>
                      <Components.Input type='email' placeholder='Email'  onChange={e => sign_setemail(e.target.value)}/>
                      <Components.Input type='password' placeholder='Password'  onChange={e => sign_setpassword(e.target.value)}/>
                      <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                      <Components.Button type="button" onClick={signupsubmit}>Sigin In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn} > 
                 <Components.Overlay signinIn={signIn} >

                 <Components.LeftOverlayPanel>
                     <Components.Title>glucoStat</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton id="signupbutton"  onClick={() =>  toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>glucoStat</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton ref={inputElement} id="signupbutton" onClick={() => toggle(false) }>
                               Sign Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
         </div>
     )
}

export default Authentication;