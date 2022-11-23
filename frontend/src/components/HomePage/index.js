import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './HomePage.css';

function HomePage() {
	const dispatch = useDispatch();


	return (
		<div className='home-container'>
			<img
				src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_b@2x-7e5ff471.jpg'
				alt='home pic'
			></img>
		</div>
	);
}

export default HomePage;
