import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Messages from './messages/Messages';
import './Question.css'
import { axiosInstance } from '../../config';

let myId ="";

export default class ShowOneQuestion extends Component {
    constructor(props){
        super(props);
        this.state = {
          result:null,
          answer:'',
          result:[],
          result2:''
        
        }
      }

  
      
      componentDidMount = () =>{
        // console.log(this.props.match.params.id);
        let id =this.props.match.params.id;
        myId=id;
        axios.get(`${process.env.REACT_APP_API_URL}/show-question/${id}`)
        .then(res => {
         console.log(res);
          console.log(res.data[0].question);
          console.log(res.data[0].answers);
          this.setState({result:res.data[0].answers})
          this.setState({result2:res.data[0].question})
        }
          
       )
        .catch(err => console.log(err))
      

      }
      


      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    
      
      }

      
      handleSubmit = (e) => {
        e.preventDefault();
        let data = {
           
            answer: this.state.answer,
           
     
        }
       
  
      
      
        axios.post(`${process.env.REACT_APP_API_URL}/answerQuestion/${myId}`, data) //there is a bug in here  i need to solve it
              .then( res => {
             
                 console.log(res);
                this.setState({ result: res.data})
               
                // let token = response.data.token;
                // localStorage.setItem('user', token)
                
              })
              .catch( err => {
                // this.props.history.push(`show-question/${myId}`);
                window.location.reload();
                console.log('i am here')
                 console.log(err)})

  
           
      }

      
      handleRemove = (e) => {
        let allresults=this.state.result;
        const result =allresults.filter(result => result.answer !== e.target.name);
         this.setState({result:result});

     }


  render() {

    let mId =myId;
     
    return (
      <div className='oneQuestion'>
       <h1>Question</h1>
         <div className='question-message'>
             <h2>{this.state.result2 && this.state.result2.question}</h2> 
             <p>{this.state.result2 && this.state.result2.description}</p>
             <p><strong>This is Question Date:</strong> {this.state.result2 && this.state.result2.created_at}</p>
        </div>
     <Link to='/messages' className='back-link'>Go Back</Link>
        
        <div className='messages-below-question'>
        <Link to={`/answerQuestion/${this.state.result._id}`} className='all-answer-link'>These are all answers</Link>

       
           <div className='all-messages'>
          {this.state.result && this.state.result.map( result =>{
               
             return(
               <div key={result._id} className='answer-css-question'>
                 <h6>{result.answer}</h6>
                 <p><strong>This is Answer Date:</strong> {result.created_at}</p>
                 <button name={result.answer} onClick={this.handleRemove} class="btn btn-dark">Done..</button>
                 
            
               </div>
             )
          })}

       
           </div>

            
         <form onSubmit={this.handleSubmit} className='form' noValidate>
          <h1>
            Get started with us today! Create your answer by filling out the
            information below.
          </h1>
     
    
          <div className='form-inputs'>
            <label className='form-label'>Message</label>
            <textarea
              className='form-input'
              type='text'
              name='answer'
              placeholder='Leave a message'
              
              onChange={this.handleChange}
            />
             
          </div>
      
          <button className='form-input-btn' type='submit' onSubmit={this.handleSubmit} >
            Submit Message
          </button><br />
        
        </form>

        </div>



      </div>

      
    )
  }
}

