import React, { Component } from 'react'
import {Button, Card, Checkbox, Col, Input, notification, Row, Rate, Modal} from 'antd';
import axios from 'axios';
import { BACKEND } from '../../Config';


class ApplicationCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            reply: ""
        }
    }

    withdrawSubmitHandler = (e) => {
        console.log(e)
        var data = {
            _id: e
        }
        axios.post(`${BACKEND}/withdrawApplication`,data)
        .then(response => {
            console.log("Status Code in Withdrawing Application : ", response);
            if(response.status === 200){
                console.log("HERE IN ACTIONS - WITHDRAWING APPLICATION!")
                console.log(response.data);
            }
            else{
                console.log("ERROR!!!")
            }
        })
        .catch(err => {
            console.log("Error in catch", err)
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Card title = "" style={{width:676}}>
                        <div className="column-left-reviews">
                        </div>
                        <div className="column-right-reviews">
                            <p style={{fontWeight:"bold", marginTop:-15}}>Job Title:</p>
                            <p style={{marginTop:-8}}>{this.props.applications.job_title}</p>
                            <p style={{fontWeight:"bold", marginTop: 7}}>Status</p>
                            <p style={{marginTop:-10}}>{this.props.applications.application_status}</p>
                            <Button onClick = { () =>this.withdrawSubmitHandler(this.props.applications._id)} style={{backgroundColor:"#00a422", borderRadius:3, color:"white", fontWeight:"bold"}}>Withdraw</Button>
                        </div> 
                    </Card>
                </div>
            </div>
        )
    }
}

export default ApplicationCard;
