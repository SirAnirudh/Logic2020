
// new Student({username: "student", password: "password", first_name: "samin", last_name: "khan", grades: {"A1: 0}})

module.exports = app => {
    app.get("/api/ass", (req, res) => {
        ass_table.find({}).toArray((error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });
    });

    app.post("/api/ass", (req, res) => {
        const name = req.body.name
        const q_ids = req.body.q_ids
        const aid = req.body.aid
        const due = req.body.due

        ass_table.insertOne( { "name": name, "questions": q_ids , "aid": aid, "due": due} ).catch((error) => {
            res.status(500).send(error)
        })
        student_table.updateMany(
            {},
            { $push: { "assignments" : {"aid": aid, "number": q_ids.length, "grade": 0} } }
         ).catch((error) => {
            res.status(500).send(error)
        });

        res.send({ "name": name, "aid": aid, "questions": q_ids })
    });


    //get specific Assignment
    app.get('/api/ass/:aid', (req, res) => {
        ass_table.findOne({ "aid": req.params.aid }, (error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });
    })
}
