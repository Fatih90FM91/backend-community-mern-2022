import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './Form.css';
import { Route } from 'react-router-dom';
import { axiosInstance } from '../config';
import { PORT } from '../config/Port';

console.log(process.env.PORT);
class SignUp extends Component {
 constructor(props){
   super(props);
  
  
   this.state = {
     username:'',
     email:'',
     password:'',
     result:'',
     isSubmitting:false,
     setIsSubmmitting:false
    

   }
 }
  
 

 handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value})
}

  handleSubmit = e => {
    e.preventDefault();
    let data = {
      username:this.state.username,
      email: this.state.email,
      password: this.state.password,
      
    }
    axios.post(`${process.env.REACT_APP_API_URL}/signup`, data)
          .then( response => {
            
            this.setState({ result: response.data })
            this.props.history.push('/login');
            this.setState({setIsSubmmitting:true});
            // console.log(this.state.setIsSubmmitting);
          
          })
          .catch( err => {
            this.setState({ result: err.response.data.errors })
            
          })
        
  };
 
  // login = () =>{
  //   const history = useHistory();
  // }
      myFunction(){  this.props.history.push("/login"); }
  // useEffect = () =>{
  //   if(this.state.setIsSubmmitting==true){
  //     <Route to='login' />
  //   }
  // }
  
  
  render() {
   console.log(this.props.history);
    return (
      <div className='form-content-right'>
        <form onSubmit={this.handleSubmit} className='form' noValidate>
          <h1>
            Get started with us today! Create your account by filling out the
            information below.
          </h1>
          <div className='form-inputs'>
            <label className='form-label'>Username</label>
            <input
              className='form-input'
              type='text'
              name='username'
              placeholder='Enter your username'
      
              onChange={this.handleChange}
            />
           {this.state.result.username && <p>{this.state.result.username}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Email</label>
            <input
              className='form-input'
              type='email'
              name='email'
              placeholder='Enter your email'
             
              onChange={this.handleChange}
            />
            {this.state.result.email && <p>{this.state.result.email}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Password</label>
            <input
              className='form-input'
              type='password'
              name='password'
              placeholder='Enter your password'
              
              onChange={this.handleChange}
            />
             {this.state.result.password && <p>{this.state.result.password}</p>}
          </div>
      
          <button className='form-input-btn' type='submit' onSubmit={this.handleSubmit}  >
            Sign up
          </button><br />
          <span className='form-input-login'>
            Already have an account? Login <a href='/login'>here</a>
          </span>
        </form>
          <div className='right-side-img'>
          
          <img src="img/42-423452_multiplication-clipart-1to-rocket-ship-cartoon-png-transparent-removebg-preview.png" alt="" />
          </div>
        
      </div>
    )
  }
}

export default SignUp ;