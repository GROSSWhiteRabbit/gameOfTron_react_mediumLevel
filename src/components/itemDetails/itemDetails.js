import React, {Component} from 'react';
import gotService from '../../services/gotservice'
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage'

// import './charDetails.css';
import styled from 'styled-components';

const H4 = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`
const BlockItemDetails = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`
const Term = styled.span`
    font-weight: bold;
`







const Field =  function ({item, field, label}) {
    return (
    <li className="list-group-item d-flex justify-content-between">
        <Term className="term">{label}</Term>
        <span>{item[field]}</span>
    </li>
                    )
}

export {Field}


export default class ItemDetails extends Component {

    state = {
        item:{},
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.updateItem();

    }
    componentDidUpdate(prevProps) {
        if (this.props.selectedItem !== prevProps.selectedItem) {
            this.updateItem();
        }

    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }


   

    onItemLoad=(item)=>{
        this.setState({
            item,
            loading: false,
            error: false,
        })
    }
    updateItem=()=>{
        this.setState({
            loading: true
        });
        const {getData} = this.props
        getData(this.props.selectedItem)
        .then(this.onItemLoad)
        .catch(this.onError)
    }
    onError = (error)=> {
        console.error(error)
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        } 
        const {item:{name}, item,  loading} = this.state

        if(loading) {
            return <Spinner/>
        }
        console.log(React.Children.toArray(this.props.children)) 

        return (
            <BlockItemDetails className="char-details rounded">
                <H4>{name}</H4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child)=> {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </BlockItemDetails>
        );
    }
}