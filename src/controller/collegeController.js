
const CollegeModel = require("../models/collegeModel")

function validateName(Shortname) {
    var namePattern = /^[a-zA-Z.-]+$/
    return namePattern.test(Shortname);
}

function validatefullName(fullname) {
    var fullNamePattern =  /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/
    return fullNamePattern.test(fullname);
}
const createCollege = async function (req, res) {

    try {
        let data = req.body
        if (Object.keys(data).length != 0) {
            let a = await CollegeModel.find({ name: data.name })
            if (a.length != 0) return res.status(400).send({ status: false, msg: " name already used" })

        if (!data.name) return res.status(400).send({ status: false, msg: "plz enter name in short form" })
        if (!validateName(data.name)) return res.status(400).send({ status: false, msg: "plz enter valid short name of college" })
        if (!data.fullName) return res.status(400).send({ status: false, msg: "plz enter fullName of the college" })
        if (!validatefullName(data.fullName)) return res.status(400).send({ status: false, msg: "plz enter valid fullName of the college" })
        let savedData = await CollegeModel.create(data)
            res.status(201).send({status: true, data: savedData })
        }

        else res.status(400).send({status: false, msg: " body not Found" })

    }
    catch (error) {

        res.status(400).send({status: false, msg: error.message })

    }
}


        module.exports.createCollege = createCollege