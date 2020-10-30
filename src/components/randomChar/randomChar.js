import React, {Component} from 'react';
import gotService from '../../services/gotservice'
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage'
// import './randomChar.css';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`
const H4 = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`
const Term = styled.span`
    font-weight: bold;
`


export default class RandomChar extends Component {

    gotService = new gotService()
    state = {
        char:{},
        loading: true,
        error: false,
    }

    static defaultProps = {
        interval: 5000
    }
    static propTypes = {
        interval: PropTypes.number
    }

    componentDidMount() {
        this.updateChar();
      this.timerId =  setInterval(this.updateChar, this.props.interval)

    }
    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    onCharLoad=(char)=>{
        this.setState({
            char,
            loading: false
        })
    }

    updateChar=()=>{
        const id = Math.round(Math.random()*140 +25);
        this.gotService
        .getCharacter(id)
        .then(this.onCharLoad)
        .catch(this.onError)
    }
    onError = (error)=> {
        console.error(error)
        this.setState({
            error: true
        })
    }
    render() {
        const {char, loading, error} = this.state
        const content = error? <ErrorMessage/> :
         loading? <Spinner/>:
          <View char={char}/>;
        return (
            <RandomBlock className="random-block rounded">
                {content}
            </RandomBlock>
        );
    }
}

const View = ({char})=>{
    const {name= 'Not said', gender = 'Not said', born= 'Not said', died= 'Not said', culture= 'Not said'} = char
    return (
        <>
            <H4>Random Character: {name}</H4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Gender </Term>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Born </Term>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Died </Term>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term className="term">Culture </Term>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
};