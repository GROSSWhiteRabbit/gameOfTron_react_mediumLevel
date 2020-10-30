import React, { Component } from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage/characterPage';
import HousesPage from '../pages/housesPage/housesPage';
import BooksPage from '../pages/booksPage/booksPage';
import BooksPageItem from '../pages/booksPageItem/booksPageItem';

import ErrorMessage from '../errorMessage/errorMessage';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import styled from 'styled-components';

const AppBlock = styled.div`
	box-sizing: border-box;
	margin: 0;
	padding: 0;
    outline: none;
    overflow-x: hidden;
    background: url(${process.env.PUBLIC_URL+'/img/got.jpeg'}) center center no-repeat;
    background-size: cover;
    font-size: 16px;
    height: 100vh;	
    min-height:100vh;
`



export default class App extends Component{

    state= {
        visibleRandomChar: true,
        error: false
    }

    onToggleRandomChar = ()=>{
        this.setState(({visibleRandomChar})=> {
            return {
                visibleRandomChar: !visibleRandomChar
            }
        })
    }
    
    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        } 

        const {visibleRandomChar} = this.state
        const randomContent = visibleRandomChar? <RandomChar interval = {5000}/>: null;
        return (
            <Router>
                <AppBlock> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {randomContent}
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{size: 3, offset: 1}}>
                                <Button onClick={this.onToggleRandomChar}  className='mb-5'>Toggle random character</Button>
                            </Col>
                        </Row>
                        <Route path='/' exact component={MainPage}/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={({match:{params:{id}}}) => {
                            return <BooksPageItem bookId = {id}/>
                        }}/>
                        <Route path='/:id' render={({match:{params:{id}}}) => {
                            return checkExistUrl(id)
                        }}/>
                    </Container>
                </AppBlock>
            </Router>
            
        );
    }
    
};

const FlexBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    margin-bottom: 40px;
`;

const Links = styled.ul`
    display: flex;
    margin: 0;
    align-items: center;
    color: #fff;
    list-style-type: none;
    li {
        margin-right: 20px;
        font-size: 18px;
    }
`;
const Title = styled.h1`
    display: block;
    text-align: center;
    color: #fff;
    font-size: 36px;
`;
const H2 = styled.h2`
    display: block;
    text-align: center;
    color: #fff;
    font-size: 24px;
    font-weight: normal ;
`;
const MainPage = function() {
    return (
            <>
            <Title>Database of the Game of Thrones universe </Title>
            <H2> Select the section you are interested in</H2>
            <FlexBlock>
                <Links>
                <li>
                    <Link to = '/characters/'>Characters</Link>
                </li>
                <li>
                    <Link to = '/houses/'>Houses</Link>
                </li>
                <li>
                    <Link to = '/books/'>Books</Link>   
                </li>
                </Links>
            </FlexBlock>
            </>
            
            

    )
}
function checkExistUrl (urlId) {
switch (urlId) {
    case 'books':
        return null;
    case 'characters':
        return null;
    case 'houses':
        return null;
    default:
        return (<>
            <Title>The page does not exist</Title>
            <Button className='d-block m-auto'>
                <Link to='/'>To start page</Link>
                
            </Button>
        </>);
}
}

