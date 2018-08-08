const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 9000
const cohortData = require("./cohorts.js")

app.use(cors())

function findById(data, id) {
    for (let i = 0; i < data.length; i++) {
        let idString = data[i].id.toString()
        if (idString === id) {
            return data[i];
        }
    }return null;
}

app.get("/", (req, res, next) => {
    res.json({cohortData: cohortData});
})

app.get("/:id", (req, res,next) => {
    const cohort = findById(cohortData, req.params.id);
    if (!cohort) {
        res.status(404).send({
            error: {
                message: "No record found!"
            }
        })
    } else {
        res.json({cohortData: cohort});
    }
});

app.listen(port, () => {
    console.log(`I am listening on ${port}`)
})