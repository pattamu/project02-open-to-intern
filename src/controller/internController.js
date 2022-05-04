
const InternModel = require("../models/internModel")
function validateEmail(usermail) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(usermail);
}

function validateMobile(usermobile) {
    var mobilePattern = /^(\+\d{1,3}[- ]?)?\d{10}$/
    return mobilePattern.test(usermobile);
}

const createIntern = async function (req, res) {

    try {
        let data = req.body
        if (Object.keys(data).length == 0) 
        return res.status(400).send({ status: false, msg: "Body must require" })
       
        if (!data.name) 
        return res.status(400).send({ status: false, msg: "plz enter name" })

        if (!data.email) 
        return res.status(400).send({ status: false, msg: "plz enter email" })

        if (!validateEmail(data.email))
         return res.status(400).send({ status: false, msg: "plz enter valid email(like-aBcd123@gmail.com)" })
       
         if (Object.keys(data).length != 0) {
            let a = await InternModel.find({ email: data.email })
        
        if (a.length != 0) 
        return res.status(400).send({ status: false, msg: "email already used" })

        if (!data.mobile) 
        return res.status(400).send({ status: false, msg: "plz enter mobile number" })

        if (!validateMobile(data.mobile)) 
        return res.status(400).send({ status: false, msg: "plz enter valid mobile number" })

        if (Object.keys(data).length != 0) {
        let b = await InternModel.find({ mobile: data.mobile })
        if (b.length != 0) return res.status(400).send({ status: false, msg: "mobile number already used" })

            let savedData = await InternModel.create(data)
            res.status(201).send({status: true, data: savedData })

        let validCollege = await collegeModel.findOne({ name: data.collegeName })
        if (validCollege === null) 
        return res.status(400).send({ status: false, msg: "College Name  is invalid" })
        
        }

        else res.status(400).send({status: false, msg: " body not Found" })

    }
}
    catch (error) {

        res.status(400).send({status: false, msg: error.message })

}
}

module.exports.createIntern = createIntern