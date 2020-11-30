import React, { useEffect ,useState} from 'react';

import './css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from './components/index.js'
import Question from './components/Question/Question.js'
import Answer from './components/Answer/Answer'
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat/Chat.js'
import Join from './components/Chat/Join/Join.js'
import MentorDashboard from './components/Dashboards/MentorDashboard';
import { UserContext } from './Context/UserContext';

function App() {
  return (
    // <UserContext.Provider value={{user,setUser}}>

    <div>
      <BrowserRouter>
        {/* <ReactNotification /> */}
        <div>
            <Switch>

                <Route path="/index" render={props => <Index {...props} /> } />
                <Route path="/qna" render={props => <Question {...props} /> } />
                <Route path="/answer" render={props => <Answer {...props} /> } />
                <Route exact path="/login" render={props => <Login {...props} /> } />
                <Route path="/join" render={props => <Join {...props} /> } />
                <Route path="/chat" render={props => <Chat {...props} /> } />
                {/* <Route path="/login" render={props => <Login {...props} /> } />
                <Route path="/student" render={props => <Student {...props} /> } /> */}
                <Route path ="/MentorDashboard" render={props => <MentorDashboard {...props}/>}/>
                <Redirect to="/index" />
                <Redirect from="/" to="/index" />
            </Switch>
        </div>
      </BrowserRouter>
    </div>
    // </UserContext.Provider>
  )
}

export default App;
