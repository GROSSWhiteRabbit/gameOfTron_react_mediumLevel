import React, { Component } from 'react';
import RowBlock from '../../rowBlock/rowBlock';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage'
import gotService from '../../../services/gotservice';




export default class HousesPage extends Component {

    state = {
        selectedHouse: 27,
        error: false
    }


    gotService = new gotService()

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
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
            getData={this.gotService.getHouse} 
            selectedItem= {this.state.selectedHouse} >
                <Field field="region" label="Region" />
                <Field field="words" label="Words" />
                {/* <Field field="ancestralWeapons" label="Ancestral Weapons" /> */}

            </ItemDetails>
        )

        const itemList = (
            <ItemList getData={this.gotService.getAllHouses} 
                        onItemSelected= {this.onItemSelected}
                        renderItem = {({name}) => name}
                         />
        )


        return (
            <RowBlock left= {itemList} right = {itemDetails}/>
        )
    }
}