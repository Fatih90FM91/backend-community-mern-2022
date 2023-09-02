
import React from 'react';
import './App.css';
import { BrowserRouter as Router ,Route ,Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
// import { BrowserRouter as Routes, Switch, Route } from 'react-router-dom';
// import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import LogOut from './components/LogOut';
import Question from './components/questions/Question';
import ShowQuestions from './components/questions/ShowQuestions';
import ShowOneQuestion from './components/questions/ShowOneQuestion';
import Messages from './components/questions/messages/Messages';
import Users from './components/questions/team-users/Users';


function App() {
  return (
    <Router>
    <>
     <Navbar />
   <Switch>
    
        <Route exact path="/" component={Home } />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/support" component={Question} />
        <Route path="/messages" component={ShowQuestions} />
        <Route path="/showQuestion/:id" component={ShowOneQuestion} />
        <Route path="/answerQuestion/:id" component={Messages} />
        <Route path="/team" component={Users} />
        <Route path="/logout" component={LogOut} />
        
        </Switch>  
     
    </>
    </Router>
  );
}

export default App;
