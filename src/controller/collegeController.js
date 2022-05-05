const collegeModel = require("../models/collegeModel")

function validateName(Shortname) {
    var namePattern = /^[a-zA-Z.-]+$/
    return namePattern.test(Shortname.trim());
}

function validatefullName(fullname) {
    var fullNamePattern =  /^[A-Za-z\s]{1,}[\,]{0,1}[A-Za-z\s]{0,}$/
    return fullNamePattern.test(fullname.trim());
}

function validateURL(url) {
    var urlPattern = /^(http(s)?:\/\/)?(www.)?([a-zA-Z0-9])+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?$/gm
    return urlPattern.test(url.trim());
}

const createCollege = async function (req, res) {
    try {
        let data = req.body
        
        if (Object.keys(data).length == 0)
            return res.status(400).send({status: false, msg: "Please Enter college details to create college Data." })

        if (!data.name) 
            return res.status(400).send({ status: false, msg: "plz enter name in short form" })
        
        if (!validateName(data.name)) 
            return res.status(400).send({ status: false, msg: "plz enter valid short name of college" })
            
        let a = await collegeModel.find({ name: data.name })
        if (a.length != 0) 
            return res.status(400).send({ status: false, msg: "This Name is already used." })

        if (!data.fullName) 
            return res.status(400).send({ status: false, msg: "plz enter fullName of the college" })
        
        if (!validatefullName(data.fullName)) 
            return res.status(400).send({ status: false, msg: "plz enter valid fullName of the college" })
        
        data.fullName = data.fullName.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')

        if(data.logoLink && !validateURL(data.logoLink))
            return res.status(400).send({ status: false, msg: "Please Enter a valid URL for the logoLink."})
                        
        let savedData = await collegeModel.create(data)
            res.status(201).send({status: true, data: savedData })
    }
    catch (error) {
        console.log(error.message)
        if(err.message.includes('E11000' && 'name'))
            return res.status(400).send({ status: false, msg: "Please enter a unique college name"})
        
        res.status(500).send({status: false, msg: error.message })
    }
}

module.exports.createCollege = createCollege