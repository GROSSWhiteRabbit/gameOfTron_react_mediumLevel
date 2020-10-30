import React, {useState, useEffect} from 'react';
// import nextId from "react-id-generator";
import Spinner from '../spinner/spinner';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';








const Li = styled.li`
cursor: pointer;
`
function ItemList({data, onItemSelected, renderItem}) {




     const  renderItems = (arr) => {
        return arr.map(item => {
            const label = renderItem(item)
            return ( 
                <Li key={item.id} onClick={()=>onItemSelected(item.id)} className="list-group-item">
                {label}
            </Li>
            )
        })
    }



        
        return (
            <ul className="item-list list-group">
                {renderItems(data)}
            </ul>
        );

}

function withData(View) {

    function Container (props) {
        const {getData} = props;
        const [data, updateData] = useState([]);
        const [error, updateError] = useState(false);

        useEffect(() => {
            getData()
                .then(serverData => {
                    updateData(serverData)
                                        
                })
                .catch(onError)
            
        },[])



        function onError  (error) {
            console.error(error)
            updateError(true)
        }




        if (error) {
            return <ErrorMessage/>
        } 
        if(!data) {
            return <Spinner/>
        }
        return <View {...props} data ={data} />

    }
    Container.propTypes= {
        getData: PropTypes.func,
        onItemSelected: PropTypes.func
    }
    return Container;
}

export default withData(ItemList)