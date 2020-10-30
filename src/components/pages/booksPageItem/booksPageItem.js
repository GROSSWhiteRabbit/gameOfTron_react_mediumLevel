import React, { Component } from 'react';
import {Col, Row} from 'reactstrap';
import RowBlock from '../../rowBlock/rowBlock';
import ItemDetails, {Field} from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage'
import gotService from '../../../services/gotservice';




export default class BooksPageItem extends Component {


    state = {
        error : false
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
                            <Col lg={{size: 6, offset: 3}}>
                                <ItemDetails 
                                    getData={this.gotService.getBook} 
                                    selectedItem= {this.props.bookId} >
                                        <Field field="numberOfPages" label="Number Of Pages" />
                                        <Field field="publisher" label="Publisher" />
                                        <Field field="released" label="Released" />
                                    </ItemDetails>
                            </Col>
                        </Row>
            
        )
    }
}