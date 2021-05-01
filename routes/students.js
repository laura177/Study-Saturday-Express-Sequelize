const app = require('../app');

const router = require('express').Router();

const Student = require('../db/models/student')

//URL:   /students
//route: get all students
router.get('/', async (req, res, next) => {
    try {
        const students = await Student.findAll();
        res.send(students)
    } catch(error) {
        next(error)
    }
})

//URL:   /students.:studentId
//route: get all students
router.get('/:studentId', async (req, res, next) => {
    try {
        let oneStudent = await Student.findByPk(req.params.studentId);
        if(!oneStudent){
            res.sendStatus(404)
        } else {
            res.send(oneStudent)
        }
    } catch(error){
        next(error)
}
})


router.post('/', async (req, res, next) => {
    try {
        let newStudent = await Student.create(req.body);
        res.status(201).send(newStudent)
        } catch(error){
        next(error)
    }
})

//URL /students/:studentId
// updates an instant of a student
router.put('/:studentId', async (req, res, next) => {
    try {
        const oneStudent = await Student.findByPk(req.params.studentId);
        if(!oneStudent){
            res.sendStatus(404)
        } else {
            const updatedStudent = await Student.update(req.body)
            res.send(updatedStudent)
        }
    } catch(err){
        next(err)
    }
})

// delete an instance of a student
router.delete('/:studentId', async(req, res, next) => {
    try{
        const oneStudent = await Student.findByPk(req.params.studentId);
        if(!oneStudent) {
            res.sendStatus(404)
        } else {
            const deletedStudent = await oneStudent.destroy();
            res.sendStatus(204)
        }
    } catch (err) {
        next(err)
    }
})




module.exports = router;
