import Axios from 'axios';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const MeetForm = ({clicked,SetClicked,question,user,setQuestions}) => {
    const toggle = () => {SetClicked(!clicked) ;SetLink("")};
    const [MeetLink,SetLink] = useState("")
    const handleApprove = (qid)=>{
        if (MeetLink==="")
          return alert("Please Enter a Link")
        toggle()
        Axios.put("http://localhost:5005/allquestions",{mentorAttended :user._id,Question_id : qid,MeetLink:MeetLink})
        .then((questions)=>{
           setQuestions(questions.data)
           return toast("succesfully Approved",{type:"success"})
        }).catch((err)=>alert("Already accepted! Please Refresh"))
        
    }
  return (
    <div>
      <Modal isOpen={clicked} toggle={toggle} >
        <ModalHeader toggle={toggle}>APPROVAL COMFIRMATION</ModalHeader>
        <ModalBody>
            <p style={{fontWeight:"bold",fontSize:20}}>DETAILS OF QUERY</p>
  
  <p>{question.query}</p>
  <p><span style={{fontWeight:"bold"}}>Mentee Name:</span> {question.menteeName}</p>
 
  
                <Input type="text" placeholder="Please Fill Google-Meet Link" value={MeetLink} onChange={(e)=>SetLink(e.target.value)}/>

        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={()=>handleApprove(question._id)}>Confirm Approve</Button>{' '}
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MeetForm;