import React, { Component } from 'react';
import {Col, Row} from 'reactstrap';
import RowBlock from '../../rowBlock/rowBlock';
import ItemList from '../../itemList';
import ErrorMessage from '../../errorMessage/errorMessage'
import gotService from '../../../services/gotservice';
import {withRouter} from 'react-router-dom';





class BooksPage extends Component {

    state = {

        error: false
    }


    gotService = new gotService()


    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return (
                <RowBlock left ={<ErrorMessage/>}/>
                    

            ) 
        }






        return (
            <Row>
                            <Col lg={{size: 4, offset: 4}}>
                                <ItemList
                                    getData={this.gotService.getAllBooks} 
                                    onItemSelected= {(bookId)=> {
                                        console.log(bookId)
                                        this.props.history.push(bookId)
                                    }}
                                    renderItem = {({name}) => name}
                                    />
                            </Col>
                        </Row>
            
        )
    }
}

export default withRouter(BooksPage);