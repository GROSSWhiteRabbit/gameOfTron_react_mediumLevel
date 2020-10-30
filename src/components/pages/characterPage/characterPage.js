import React, { Component } from 'react';
import RowBlock from '../../rowBlock/rowBlock';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage'
import gotService from '../../../services/gotservice';




export default class CharacterPage extends Component {

    state = {
        selectedChar: 27,
        error: false
    }


    gotService = new gotService()

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }
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


        const itemDetails = (
            <ItemDetails 
            getData={this.gotService.getCharacter} 
            selectedItem= {this.state.selectedChar} >
                <Field field="gender" label="Gender" />
                <Field field="born" label="Born" />
                <Field field="died" label="Died" />
                <Field field="culture" label="Culture" />
            </ItemDetails>
        )

        const itemList = (
            <ItemList getData={this.gotService.getAllCharacters} 
                      onItemSelected= {this.onItemSelected}
                      renderItem = {({name, gender}) => `${name} (${gender})`}
                         />
        )


        return (
            <RowBlock left= {itemList} right = {itemDetails}/>
        )
    }
}