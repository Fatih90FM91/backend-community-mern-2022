import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Question.css'
import { axiosInstance } from '../../config';

export default class ShowQuestions extends Component {
    constructor(props){
        super(props);
        this.state = {
          result:[]
        
        }
      }


      componentDidMount = () => {
        const currentToken = localStorage.getItem('user')
        console.log(currentToken );
        if(currentToken){
          axios.get(`${process.env.REACT_APP_API_URL}/showQuestion`)
                .then( response => {
                 console.log(response);
                    this.setState({ result2: response.data })
                })
                .catch( err => {
                    this.setState({ result2: err.response.data })
                })
        } else {
            this.props.history.push('/login');
        }
    }


  render() {
    return (
      <div className='show-question'>
          
           <h1>All Your Questions in Here</h1>
         <div className='question-css'>
          {
      this.state.result2 && this.state.result2.map(question => {
          return(
              <div key={question._id} className='every-question'>
               <h2>{question.question}</h2>
               <p>{question.description}</p>
               <Link to={`/showQuestion/${question._id}`} className='question-link'>See more about this question..</Link>
               
              </div>
          )
      })
  }
</div>

      </div>
    )
  }
}
