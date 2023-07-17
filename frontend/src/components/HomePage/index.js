import './HomePage.css';
import Slider from 'react-slick';
import React, { Component } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HomePage() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
	};

	return (
		<div className='home-container'>
			<Slider {...settings}>
				<div>
					<img
						src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_b-447230ef.jpg'
						alt='home pic'
					></img>
				</div>
				<div>
					<img
						src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_a-3bb2d420.jpg'
						alt='home pic'
					></img>
				</div>
				<div>
					<img
						src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg'
						alt='home pic'
					></img>
				</div>
			</Slider>
		</div>
	);
}

// return (
// 	<div className='home-container'>
// 		<img
// 			src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_b@2x-7e5ff471.jpg'
// 			alt='home pic'
// 		></img>
// 	</div>
// );

export default HomePage;
