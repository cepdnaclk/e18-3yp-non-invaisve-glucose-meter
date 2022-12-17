/*
 * Project: CO300 3YP
 * Github Repository: https://github.com/cepdnaclk/e18-3yp-non-invaisve-glucose-meter
 * Authors:
 *  - Kavinda Karunarathne (E/18/170)
 *  - Nethmi Ranasinghe (E/18/282)
 *  - Denuwan Weerarathne (E/18/382)
 */

const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true,                                        
    },
    contact_no: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: false,
        default:""
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Request",RequestSchema)