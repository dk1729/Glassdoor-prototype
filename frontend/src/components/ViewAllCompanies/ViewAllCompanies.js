import { Col, Pagination, Row } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BACKEND } from '../../Config';
import { get_all_companies } from '../../js/actions';
import CompanyCard from '../CompanyCard/CompanyCard';
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import Footer from '../Footer/Footer';
import './ViewAllCompanies.css'

class ViewAllCompanies extends Component {
    constructor(props)
    {
        super(props);
        if(!sessionStorage.getItem('student_id'))
        {
            window.location.replace('/login')
        }
        else
        {
            
        }
        this.state = {
            companies : [],
            offset: 0,
            elements: [],
            perPage: 6,
            currentPage: 1,
            pageCount: 1
        }
        
    }
    componentDidMount(){
        if(this.props.companies)
        {
            // console.log("Companies there")
            this.setElementsForCurrentPage();
        }
        else
        {
            this.props.get_all_companies();
        }
    }
    componentWillReceiveProps() 
    {
        setTimeout(() => {
            this.setState({
                companies : this.props.companies
            })
            this.setElementsForCurrentPage();
        } );
    }
    setElementsForCurrentPage = () => {
        let elements = this.props.companies.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        // console.log("Inside show catolgocal data function", this.state.elements);
        return <CompanyCard company = {this.state.elements[0]} />
    }
    handlePageClick = (pageNo) => {
        const selectedPage = pageNo - 1; 
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, 
            () => this.setElementsForCurrentPage()
        );
    }
    render() {
        var temp = null;
        if(this.state.elements.length > 0)
        {
            console.log("Inside elements condition")
            temp = <div style = {{
                marginLeft : "16.5%",
                marginTop :"2%",
                }}>
                <Row>
                    <Col>
                        <CompanyCard company = {this.state.elements[0]}/>
                    </Col>
                    <Col style = {{marginLeft: "2%"}}>
                        <CompanyCard company = {this.state.elements[1]}/>
                    </Col>
                    <Col style = {{marginLeft: "2%"}}>
                        <CompanyCard company = {this.state.elements[2]}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CompanyCard company = {this.state.elements[3]}/>
                    </Col>
                    <Col style = {{marginLeft: "2%"}}>
                        <CompanyCard company = {this.state.elements[4]}/>
                    </Col>
                    <Col style = {{marginLeft: "2%"}}>
                        <CompanyCard company = {this.state.elements[5]}/>
                    </Col>
                </Row>
            </div>
        }
        else
        {
            this.props.get_all_companies()
        }
        let paginationElement;
        if(this.props.companies)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.companies.length}
                    showTotal={(total, range) => 
                    `${range[0]}-${range[1]} of ${total} items`}   
                    defaultPageSize={this.state.perPage}
                />)
            }
        }
        return (
            <div>
                <div>
                    <CompanyHeaderBar  type='student'/>
                </div>
                <div>
                    {/* <div>{this.showCatalogicData()}</div> */}
                    {temp}
                </div>
                <div style = {{marginTop : "2%", marginLeft : "70%"}}>
                    {paginationElement}
                </div>
            <Footer/>
            </div>
        )
    }
}
// export default ViewAllCompanies;
function mapDispatchToProps(dispatch) {
    return {
        get_all_companies: user => dispatch(get_all_companies())
    };
  }
  
function mapStateToProps(store) {
    return {
        message : store.message,
        companies : store.companies
    };
}

const ViewAllCompaniesForm = connect(mapStateToProps, mapDispatchToProps)(ViewAllCompanies);
export default ViewAllCompaniesForm;