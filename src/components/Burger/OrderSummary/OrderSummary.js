import React from 'react';

import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button'

const OrderSummary = (props) =>{
	const ingredientSummary = Object.keys(props.ingredients)
	.map(igKey => {
		return (<li key={igKey}>
			{igKey}: {props.ingredients[igKey]} 
				</li>)
	})
	return(
	<Aux>
		<h3>Your Order</h3>
		<p>A Delicious Burger With The FollowingIngredients</p>
		<ul>
			{ingredientSummary}
		</ul>
		<h3>Total price: ${props.price}</h3>
		<p> Continue to checkout?</p>
		<Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
		<Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
	</Aux>
	);
};

export default OrderSummary;