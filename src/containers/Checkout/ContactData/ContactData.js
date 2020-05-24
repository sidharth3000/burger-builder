import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
	state ={
		orderForm:{

			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid:false,
				touched: false
			},               
            street:{
            	elementType:'input',
            	elementConfig:{
            		type:'text',
            		placeholder: 'Street'
            	},
            	value: '',
				validation: {
					required: true
				},
				valid:false,
				touched: false
            },
            zipCode:{
            	elementType:'input',
            	elementConfig:{
            		type:'text',
            		placeholder: 'Pin code'
            	},
            	value: '',
				validation: {
					required: true
				},
				valid:false,
				touched: false
            },
            country: {
            	elementType:'input',
            	elementConfig:{
            		type:'text',
            		placeholder: 'Country'
            	},
            	value: '',
				validation: {
					required: true
				},
				valid:false,
				touched: false
            } ,          
        	email:{
        		elementType:'input',
            	elementConfig:{
            		type:'text',
            		placeholder: 'email'
            	},
            	value: '',
				validation: {
					required: true
				},
				valid:false,
				touched: false
        	},        
            deliveryMethod:{
            	elementType:'select',
            	elementConfig:{
            		options:
            		[{value: 'fastest', displayValue: 'Fastest'},
            		{value: 'cheapest', displayValue: 'Cheapest'}
            		]
            	},
            	value: ''
            }

		},
		loading:false	
	}

	orderHandler = (event) => {
			event.preventDefault();
			alert('You continue!');
        this.setState( { loading: true } );
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
        	formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
           
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false, purchasing: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false, purchasing: false } );
            } );
		}

		checkValidity (value, rules) {
			let isValid = false;

			if(rules.required){
				isValid = value.trim() !== '';
			}

			return isValid;
		} 

		inputChangedHandler = (event, inputIdentifier) => {
			const updatedOrderForm = {
				...this.state.orderForm
			}
			const updatedFormElement = {
				...updatedOrderForm[inputIdentifier]
			};
			updatedFormElement.value = event.target.value;
			updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
			updatedOrderForm[inputIdentifier] = updatedFormElement;
			updatedFormElement.touched = true;
			this.setState({orderForm: updatedOrderForm})
		}

	render() {
		const formElementsArray = [];
		for(let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form =(
					<form onSubmit={this.orderHandler}>
						{formElementsArray.map(formElement => (
							<Input 
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							key={formElement.id}
							shouldValidate={formElement.config.validation}
							changed={(event) =>this.inputChangedHandler(event, formElement.id)}
							touched={formElement.config.touched}/>
							
							))}
						<Button btnType='Success'>ORDER</Button>
					</form>);
		if (this.state.loading)
		{
			form=<Spinner/>
		}
		return (
				<div className={classes.ContactData}>
					<h4>Enter your contact data</h4>
					{form}
				</div>
			)
	}
}

export default ContactData;