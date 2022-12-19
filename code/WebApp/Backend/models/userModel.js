/*
 * Project: CO300 3YP
 * Github Repository: https://github.com/cepdnaclk/e18-3yp-non-invaisve-glucose-meter
 * Authors:
 *  - Kavinda Karunarathne (E/18/170)
 *  - Nethmi Ranasinghe (E/18/282)
 *  - Denuwan Weerarathne (E/18/382)
 */

// DOCTOR MODEL 

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    // reg_no:{

    // },
    password:{
        type: String,
        required: true,                                        
    },
    hospital:{
        type: String,
        required: true, 
    },
    specialized_in:{
        type: String,
        required: false, 
    },
    contact_no:{
        type: String,
        required: true, 
    },
    role:{
        type: String,
        required: false,
        
    },
},
{
    timestamps:true
}
);

module.exports = mongoose.model("User",UserSchema)