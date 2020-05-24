import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state={
		showSideDrawer:true
	}

	SideDrawerClosedHandler = () =>{
		this.setState({showSideDrawer: false})
	}

	SideDrawerToggleHandler = () =>{
		this.setState((prevState)=>{
			return{showSideDrawer: !prevState.showSideDrawer}
		});
	}


	render(){
		return(

			<Aux>
				<Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
				<SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
				<main className={classes.a}>
					{this.props.children }
				</main>
			</Aux>
			)
	}
	
};

export default Layout;