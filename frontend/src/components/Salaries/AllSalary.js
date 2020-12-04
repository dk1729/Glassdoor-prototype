import React, { Component } from 'react'
import CompanyHeaderBarForm from '../CompanyHeaderBar/CompanyHeaderBar'
import SalaryCard from '../SalaryCard/SalaryCard'
import axios from 'axios'
import { BACKEND } from '../../Config';
import Footer from '../Footer/Footer';

export default class AllSalary extends Component {
      constructor(props){
            super(props)
            if(!sessionStorage.getItem('student_id'))
        {
            window.location.replace('/login')
        }
        else
        {
            
        }
            this.state={
                  salary:[],
            }
      }
      componentDidMount(){
            axios.post(`${BACKEND}/getAllSalaries`).then(response => {
                  console.log('salary')
                  if(response.status === 200)
                  {
                      console.log(response.data,'salary')
                      this.setState({
                          salary : response.data
                      })
                  }
              })
      }
      render() {
            return (
                  <div>  
                        <CompanyHeaderBarForm type='student' />
                        <div>
                              {this.state.salary.map(a =>{
                                return (<SalaryCard salary = {a}/>)
                            })}
                        </div>
                        <Footer/>
                  </div>
            )
      }
}
