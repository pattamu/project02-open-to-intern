const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema( {

   name: 
            {type: String, 
               required: true,
               unique:true,
               trim: true,
            },

   fullName: {type: String, 
               required: true,
               trim: true,
            }, 

   logoLink: {type:String,
               required: true,
               trim: true,
               default: "https://functionup.s3.ap-south-1.amazonaws.com/colleges/iith.png",
            },

   isDeleted: {
               type: Boolean,
               default: false
            },

},{ timestamps: true });

module.exports = mongoose.model('College', collegeSchema)

