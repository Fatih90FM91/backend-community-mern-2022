import React, { Component } from 'react';
import axios from 'axios';
import './Users.css';
import { axiosInstance } from '../../../config';

export default class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: ''
        }
    }
    componentDidMount = () => {
        const currentToken = localStorage.getItem('user');
        console.log(currentToken);
        if(currentToken){
           
            axiosInstance.get(`${process.env.REACT_APP_API_URL}/all-users`)
                .then( response => {
                    console.log(response);
                    this.setState({ result: response.data })
                })
                .catch( err => {
                    this.setState({ result: err.response.data })
                })
        } else {
            this.props.history.push('/login');
        }
    }
    // logOut = () => {
    //     localStorage.removeItem('user');
    //     this.props.history.push('/login');
    // }
    render() {
        return (
            <>
             <h1>All My Team</h1>
        <div className='all-team'>
           
            {/* <div>
                <button onClick={this.logOut}>Logout</button>
            </div> */}
            { this.state.result ?
                this.state.result.map( (user, index) => {
                    return (
                        <div key={index} className='users'>
                           <h3>{user.username}</h3> 
                           <h6>{user.email}</h6>
                           <p>{user.createdAt}</p>
                           <p>{user.updatedAt}</p>
                        </div>
                    )
                })
            : null }
        </div>
        </>
        )
    }
}
