const express = require("express");
const router = express.Router();
const companyQueries = require("../services/companyQueries");

router.get("/", async (req, res) => {
    try {
        const companies = await companyQueries.getCompanies();
        res.send(companies);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.post("/", async (req, res) => {
    try {
        let companyData = req.body;
        await companyQueries.addCompany(companyData);
        res.send("Company added successfully.")
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

// companies/users/34656example546?isPending = true
router.get("/users/:companyID", async (req, res) => {
    try {
        let isPending = JSON.parse(req.query.isPending.toLowerCase());
        if (isPending) {
            let pendingUsers = await companyQueries.getPendingUsers(req.params.companyID);
            res.send(pendingUsers);
        }
        else {
            let companyUsers = await companyQueries.getCompanyUsers(req.params.companyID);
            res.send(companyUsers);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

module.exports = router;