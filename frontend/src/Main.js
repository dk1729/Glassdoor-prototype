import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AddJob from './components/AddJob/AddJob';
import CompanyHeaderBar from './components/CompanyHeaderBar/CompanyHeaderBar';
import CompanyProfilePage from './components/CompanyProfilePage/CompanyProfilePage'
import EditCompanyProfilePage from './components/CompanyProfilePage/EditCompanyProfilePage';
import CompanySignUp from './components/CompanySignUp/CompanySignUp';
import Login from './components/Login/Login';
import PostNewJob from './components/PostNewJob/PostNewJob';

class Main extends Component {
    render(){
        return(
            <div>
                <BrowserRouter>
                    <Route path='/companyProfile' component={CompanyProfilePage}/>
                    <Route path='/editCompanyProfile' component={EditCompanyProfilePage}/>
                    <Route path='/companyHeaderBar' component={CompanyHeaderBar}/>
                    <Route path = "/companySignUp" component = {CompanySignUp} />
                    <Route path = "/login" component = {Login} />
                    <Route path = "/postNewJob" component = {PostNewJob}/>
                    <Route path = "/addJob" component={AddJob}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default Main;