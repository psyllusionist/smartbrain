import React from 'react';
import brain from './brain.png'
import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma4 mt0 pointer' style={{ height: 150, width: 150}}>
			<Tilt className="parallax-effect shadow-2 tilt" perspective={500} style={{ height: 150, width: 150}}>
			    <div className="inner-element pa3">
			      <img src={brain} alt='logo' style={{ height: 100, width: 100}} />
			    </div>
			</Tilt>
		</div>
	)
}

export default Logo;