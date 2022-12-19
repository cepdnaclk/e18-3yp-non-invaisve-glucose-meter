/*
 * Project: CO300 3YP
 * Github Repository: https://github.com/cepdnaclk/e18-3yp-non-invaisve-glucose-meter
 * Authors:
 *  - Kavinda Karunarathne (E/18/170)
 *  - Nethmi Ranasinghe (E/18/282)
 *  - Denuwan Weerarathne (E/18/382)
 */
const User = require('../models/userModel')
const Request = require('../models/patientRequestModel')


const getAllRequests = async(req, res)=>{
    try{
        const requests = await Request.find().select('-password')
        
        return res.status(200).json(requests)

    }catch(err){
        return res.status(500).json({
            error: err
        })
    }
}

const deleteRequest = async(req,res)=>{
    try{
        const request = await Request.findById(req.params.id)
        
        if(request){
            try{
                await Request.findByIdAndDelete(req.params.id)
                res.status(200).json({
                    message: "Request deleted successfully"
                });
                
            }catch(error){
                return res.status(500).json({
                    error:"Request deletion failed"});
            }
            
        }else{
            return res.status(404).json({
                error:"Request not found"})
        } 
    }catch(err){
        return res.status(500).json({
            error: err
        })
    } 
}

const acceptRequest = async(req,res)=>{
    try{
        const request = await Request.findById(req.params.id)

        if(request){
            const newUser = new User({
                username: request.username,
                email: request.email,
                password: request.password,
                role: request.role
            })

            // console.log(newUser)
            try{
                const adduser = await newUser.save();
                // const {password,...others} = adduser._doc;
                await Request.findByIdAndDelete(req.params.id)
                
                // others["message"] = "User registration successful!";
                // return res.status(200).json(others);
                return res.status(200).json({
                    id: adduser._id,
                    username: adduser.username,
                    email: adduser.email,
                    role: adduser.role,
                    message: "User registration successful!"
                });
            }catch (error) {
                return res.status(500).json({
                    error:"User registration failed"
                });
            }
            
        }else{
            return res.status(404).json({
                error:"Request not found"
            })
        } 
    }catch(err){
        return res.status(500).json({
            error: err
        })
    } 
}

module.exports = {
    getAllRequests,
    deleteRequest,
    acceptRequest
}