import express from "express"

import History from "../../../database/models/Queries/History.js"

const mentorQuestions = express.Router()

mentorQuestions.get("/allquestions",(req,res,next)=>{
      History.find({status :"pending"})
      .then((questions)=>{
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json(questions)
      })
      .catch((err)=>{
          res.statusCode =404;
          res.send(err)
      })
})


mentorQuestions.post("/allquestions",(req,res,next)=>{
    History.create(req.body)
   .then((question)=>{
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(question)
   })
   .catch((err)=>{
       res.statusCode = 404;
       res.send(err)
   })
})
mentorQuestions.put("/allquestions",(req,res,next)=>{
    History.findById({_id:req.body.Question_id})
        .then((question)=>{
                if (question.status ==="approved")
                {
                    res.statusCode = 408;
                    res.setHeader('Content-Type','application/json');
                    res.json({message : "already Approved"})
                }
                else{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    question.updateOne({status:"approved",approvedBy : req.body.mentorAttended,MeetLink:req.body.MeetLink,selectedDate:Date.now()})
                    .then((Resp)=>{
                        History.find({status:"pending"})
                        .then((qs)=>{
                            res.json(qs)
                        })
                    })
                    
                }
        })
    
})
mentorQuestions.get("/approvedqns/:mentorAttended",(req,res,next)=>{
    console.log(req.body)
    History.find({approvedBy:req.params.mentorAttended})
    .then((questions)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(questions)
    })
})
// mentorQuestions.get("/statusFinder/:qid",(req,res,next)=>{
//  QuestionSchema.findById({_id:req.params.qid})
//  .then((question)=>{
//      if(question.status==="approved")
//      {
//         res.statusCode = 408;
//                     res.setHeader('Content-Type','application/json');
//                     res.json({message : "already Approved"})
//      }
//      else{
//         res.statusCode = 200;
//         res.setHeader('Content-Type','application/json');
//         res.json({message:"not-approved"})
//      }
//  })
// })

export default mentorQuestions;