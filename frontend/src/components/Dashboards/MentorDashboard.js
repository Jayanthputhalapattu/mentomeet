import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import React, { useEffect ,useState} from "react";
import { Container,Row,Col,Card,Button} from "react-bootstrap";
import {Badge} from "reactstrap"
import {Redirect} from 'react-router-dom'
import NavBar from "../NavBar";
import MeetForm from "./MeetForm";


const MentorDashboard = ()=>{
    const [Questions,setQuestions] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))
    const [approved,setApproved] = useState(false)
    const  [clicked,SetClicked] = useState(false)
    const [question,SetQuestion] = useState("")
    const color = {
      "JEE":"warning",
      "NEET" :"info",
      "CARRER":"success"
    }
    console.log(Questions)
    const QuestionGetter = (path)=>{
      Axios.get("http://localhost:5005/"+path)
        .then((resp)=>{
            setQuestions(resp.data)
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        QuestionGetter("allquestions")
        // SetRole((user.category))
    },[])
    if (JSON.parse(localStorage.getItem("user"))==undefined)
    {
      return <Redirect to="/" />
    }
    
    const handleApprove = (q)=>{
        SetQuestion(q)
        SetClicked(!clicked)
    }
    
const gotoApprove =()=>{
   setApproved(!approved)
   setQuestions([])
  if(!approved) 
     QuestionGetter("approvedqns/" + user._id)
  else 
  QuestionGetter("allquestions")
}
  return(
    <Container fluid>
      <ToastContainer position="bottom-left"/>
        <Row >
           <Col >
            <NavBar />
           </Col>
           
        </Row>
        
        <Row>
       <Col md={4}><h2>{!approved?(<>All available Questions</>):(<>My approved Questions</>)}</h2></Col>
  <Col md={{span : 4,offset :4}}><Button style={{marginTop:10}} onClick={gotoApprove}>{approved?(<> {`<`} Go to All available Questions</>):(<>Go to My approved Questions {`>`}</>)}</Button></Col>
        </Row>
        <MeetForm clicked={clicked} SetClicked={SetClicked} user={user} question={question} setQuestions={setQuestions}/>
        <Row>
        
                {Questions.map((question,index)=>(
                  
            
                    <Col >
                       
                    <Card style={{ width: '18rem' ,marginTop:10}} key={index}>
                    
                    <Card.Body>
                    
                <Card.Title> 
                
                <Badge color={color[question.category]}>{question.category}</Badge>
                     {question.headline}
                </Card.Title>
                      <Card.Text>
                     
                       {question.query}
                       
                       <ul style={{listStyleType:"none"}}>
                      <li style={{fontWeight:"bold"}}>  Mentee Name : {question.menteeName}</li>
                      <li>
                      <span style={{backgroundColor:"lightyellow"}}>Asked on : {new Date(question.applicationDate).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</span>
                      </li>
                     </ul>
                     
                      </Card.Text>
                {approved?(
                  <>
                    
                <span style={{backgroundColor:"lightgreen"}}>Approved on : {new Date(question.selectedDate).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</span><br/>
                <Button color="info" style={{fontSize:14}} href={question.MeetLink}>Meet Link</Button>
                
                </>):(
                <>
                <Button variant="primary" onClick={()=>{handleApprove(question)}}>Approve</Button>
                </>)}   
                    </Card.Body>
                  </Card>
                  </Col>
                 
  ))}
    </Row>          
           
    </Container>
    
  )
  
}
export default MentorDashboard