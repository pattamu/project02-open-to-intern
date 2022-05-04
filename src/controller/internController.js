const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")

function validateName(userName) {
    var namePattern = /^[A-z]*$|^[A-z]+\s[A-z]*$/
    return namePattern.test(userName.trim());
}

function validateEmail(userMail) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(userMail.trim());
}

function validateMobile(userMobile) {
    var mobilePattern = /^(\+\d{1,3}[- ]?)?\d{10}$/
    return mobilePattern.test(userMobile.trim());
}

const createIntern = async function (req, res) {
    try {
        let data = req.body
        delete data.collegeId

        if (Object.keys(data).length == 0) 
            return res.status(400).send({ status: false, msg: "Please enter some data to create Intern Details." })
        
        if (!data.name) 
            return res.status(400).send({ status: false, msg: "plz enter Name." })
        
        if (!validateName(data.name))
            return res.status(400).send({ status: false, msg: "plz enter a valid Name." })
            
        data.name = data.name.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')

        if (!data.email) 
            return res.status(400).send({ status: false, msg: "plz enter email" })

        if (!validateEmail(data.email))
            return res.status(400).send({ status: false, msg: "plz enter a valid email(like-aBcd123@gmail.com)" })
        
        let a = await internModel.find({ email: data.email })
        if (a.length != 0) 
            return res.status(400).send({ status: false, msg: "email already used" })

        if (!data.mobile) 
            return res.status(400).send({ status: false, msg: "plz enter mobile number" })

        if (!validateMobile(data.mobile)) 
            return res.status(400).send({ status: false, msg: "plz enter valid mobile number" })

        let b = await internModel.find({ mobile: data.mobile })
        if (b.length != 0) 
            return res.status(400).send({ status: false, msg: "mobile number already used" })

        if(!data.collegeName)
            return res.status(400).send({ status: false, msg: "Please enter College Name."})

        let validCollege = await collegeModel.findOne({ name: data.collegeName })
        if (validCollege === null) 
            return res.status(400).send({ status: false, msg: "College Name is invalid." })
        
        if(await internModel.exists(data))
            return res.status(400).send({ status:false, msg: "This Intern details already exists in our Database."})
        
        delete data.collegeName
        data.collegeId = validCollege._id

        let savedData = await internModel.create(data)
        res.status(201).send({status: true, data: savedData })
    }
    catch (error) {
        res.status(500).send({status: false, msg: error.message })
    }
}

const getInters = async (req,res) => {
    try{
        let data = req.query
        if(!data.collegeName || data.collegeName.length === 0 || (/[^-.a-zA-Z]/.test(data.collegeName)))
            return res.status(400).send({ status:false, msg: "Please Enter Valid college Short name."})
        
        let findCollege = await collegeModel.findOne({name: data.collegeName})

        if(!findCollege)
            return res.status(404).send({ status:false, msg: "College not Found."})
        
        let findInterns = await internModel.find({
            collegeId:findCollege._id, 
            isDeleted: false},
            {
            collegeId:0,
            isDeleted:0,
            createdAt:0,
            updatedAt:0,
            __v:0
        })
        
        if(!findInterns.length)
            return res.status(404).send({ status: false, msg: "No Interns have registered in this college."})
        
        res.status(200).send({
            status: true,
            data:{
                "name": findCollege.name,
                "fullName": findCollege.fullName,
                "logoLink": findCollege.logoLink,
                "interests":findInterns
            }
        })
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({ status:false, msg: err.message})
    }
}

module.exports = {createIntern, getInters}
