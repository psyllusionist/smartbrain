import React, { Component } from 'react';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPassword: '',
			wrongCredentials: false,
			wrongName: '',
			wrongEmail: '',
			wrongPassword: '',
			existingEmail: ''
		}
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value});
		if(event.key === 'Enter') this.onSubmitRegister();
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value});
		if(event.key === 'Enter') this.onSubmitRegister();
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value})
		if(event.key === 'Enter') this.onSubmitRegister();
	}

	onSubmitRegister = (e) => {

		const inpName = document.getElementById('name');
		const inpEmail = document.getElementById('email-address');
		const inpPassword = document.getElementById('password');
		let invalidInput = false;

		if(!inpName.checkValidity()){
			this.setState({wrongName: '> Name is required'});
			invalidInput = true;
		} else {this.setState({wrongName: ''})}
		if(!inpEmail.checkValidity()){
			this.setState({wrongEmail: '> Your email address was invalid'})
			invalidInput = true;
		} else {this.setState({wrongEmail: ''})}
		if(!inpPassword.checkValidity()){
			this.setState({wrongPassword: '> Password is required'})
			invalidInput = true;
		} else {this.setState({wrongPassword: ''})}

  		if (!invalidInput){
			this.onRegisterPass()
		}
		this.setState({existingEmail: ''})
		this.setState({wrongCredentials: invalidInput})		
	}

	onRegisterPass = (e) => {
		fetch('https://thawing-chamber-05508.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail.toLowerCase(),
				password: this.state.registerPassword
			})
		})
		.then(res => res.json())
		.then(user => {
			if(user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			} else {
				this.setState({wrongCredentials: true})
				this.setState({existingEmail: '> Try using another email address'})
			}	
		})
	}

	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input
				        onKeyUp={this.onNameChange}
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="text" 
				        name="name"  
				        id="name"
				        required
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input
				        onKeyUp={this.onEmailChange}
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"
				        required 
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input
				        onKeyUp={this.onPasswordChange}
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password" 
				        required
				        />
				      </div>
				      {
				      	this.state.wrongCredentials ?
				      	<div className="db fw6 lh-copy f6">
				      	<p>Oops! Please fix the following:</p>
				      	<p>{this.state.wrongName}</p>
				      	<p>{this.state.wrongEmail}</p>
				      	<p>{this.state.wrongPassword}</p>
				      	<p>{this.state.existingEmail}</p>
				      	</div> :
				      	<div></div>
				      }			      
				    </fieldset>
				    <div>
				      <input 
					      onClick={this.onSubmitRegister} 
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      type="submit" 
					      value="Register" 
				      />
				    </div>
				  </div>
				</main>
			</article>

		)
	}
}

export default Register;