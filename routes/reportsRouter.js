const express= require('express');
const Reports= require('../models/report');

const reportsRouter= express.Router();
reportsRouter.use(express.urlencoded({extended: false}));

reportsRouter.route('/')
.get((req,res,next)=>{
    Reports.findById(req.query.reportID)
    .then((report)=>{
        if(report){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(report);
        }
        else{
            if(req.query.reportID){
                res.statusCode=200;
                res.setHeader('Content-type','application/json');
                res.json({status: 'unsuccessful', comment:`Report with reportID: ${req.query.reportID} does not exist.`});
            }
            
            else{
                res.statusCode=200;
                res.setHeader('Content-type','application/json');
                res.json({status: 'unsuccessful', comment:`No reportID provided`});
            }
        }
    },(err)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json({status: 'unsuccessful', comment:`Invalid reportID`});
    })
    .catch((err)=>{        
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    res.json({status: 'unsuccessful', comment:`Invalid reportID`});
    });
})
.post((req,res,next)=>{
    Reports.find({cmdtyID: req.body.reportDetails.cmdtyID, marketID: req.body.reportDetails.marketID})
    .then((reports)=>{
        if(reports[0]){
            let priceInKg= req.body.reportDetails.price/req.body.reportDetails.convFctr;
            reports[0].price= (reports[0].price*reports[0].users.length + priceInKg)/(reports[0].users.length+1);
            reports[0].users.push(req.body.reportDetails.userID);
            reports[0].save()
            .then((report)=>{
                res.statusCode=201;
                res.setHeader('Content-Type','application/json');
                res.json({status: "success", reportID: report._id});
            })
        }
        else{
            Reports.create({
                cmdtyName: req.body.reportDetails.cmdtyName,
                cmdtyID: req.body.reportDetails.cmdtyID,
                marketID: req.body.reportDetails.marketID,
                marketName: req.body.reportDetails.marketName,
                users: [req.body.reportDetails.userID],
                placeUnit: "Kg",
                price: req.body.reportDetails.price/req.body.reportDetails.convFctr
            })
            .then((report)=>{
                res.statusCode=201;
                res.setHeader('Content-Type','application/json');
                res.json({status: "success", reportID: report._id});
            })
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})

module.exports= reportsRouter;