import React, { Component } from 'react';
import { Form, TextArea ,Input ,Label , Button  } from 'semantic-ui-react';
import axios from 'axios';
import './Question.css'
import { axiosInstance } from '../../config';

export default class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
          question: '',
          description: '',
          result:''
        
        }
      }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
     
      
      }

      componentDidMount = () => {
        const currentToken = localStorage.getItem('user')
        console.log(currentToken );
        if(currentToken){
          axios.get(`${process.env.REACT_APP_API_URL}/showQuestion`)
                .then( response => {
                
                    this.setState({ result2: response.data })
                })
                .catch( err => {
                    this.setState({ result2: err.response.data })
                })
        } else {
            this.props.history.push('/login');
        }
    }

  
      handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            question: this.state.question,
            description: this.state.description,
    
            
        }
        axios.post(`${process.env.REACT_APP_API_URL}/askQuestion`, data)
              .then( res => {

                // console.log(res.data);
                this.setState({ result: res.data })
                this.props.history.push('/messages')
               
                // let token = response.data.token;
                // localStorage.setItem('user', token)
                
              })
              .catch( err => {
                this.setState({ result: err.res.data })
              })
           
      }

  

  render() {
    return (
      <div className='questions'>
          <h1>Ask a Question</h1>

<form onSubmit={this.handleSubmit} className='form' noValidate>
          <h1>
            Get started with us today! Create your question by filling out the
            information below.
          </h1>
     
          <div className='form-inputs'>
            <label className='form-label'>Question</label>
            <input
              className='form-input'
              type='text'
              name='question'
              placeholder='Enter your question'
             
              onChange={this.handleChange}
            />
          
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Description</label>
            <textarea
              className='form-input'
              type='text'
              name='description'
              placeholder='Enter your description'
              
              onChange={this.handleChange}
            />
             
          </div>
      
          <button className='form-input-btn' type='submit' onSubmit={this.handleSubmit} >
            Submit Question
          </button><br />
        
        </form>


      </div>
    )
  }
}
