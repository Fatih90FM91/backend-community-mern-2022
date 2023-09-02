import React, { Component } from 'react';
import axios from 'axios';
import './Message.css'
import { axiosInstance } from '../../../config';




export default class Messages extends Component {
    constructor(props){
        super(props);
        this.state = {
        result:''
        
        }
      }

   
  componentDidMount = () =>{
  console.log(this.props);
  let id =this.props.match.params.id;
  axiosInstance.get(`${process.env.REACT_APP_API_URL}/`)
    .then( res => {

      console.log(res.data);
      this.setState({ result: res.data })
     
      // let token = response.data.token;
      // localStorage.setItem('user', token)
      // this.props.history.push('/all-users')
    })
    .catch( err => console.log(err))

  }

  

  render() {

    
    
    return (
      <>
      <h1>All Anwers </h1>
      <div className='messages'>

            {this.state.result && this.state.result.map((result) =>{
             
             return(
               <div key={result._id} className='answer-css'>
                 <h5>{}</h5>
                 <h4>{result.answer}</h4>
                 <p><strong>This is Answer Date:</strong> {result.created_at}</p>
                 
               </div>
              
             )
          })}

 
      </div>
      </>
    )
  }
}

