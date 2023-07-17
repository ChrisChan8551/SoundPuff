import React from 'react';
import './HomePage.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HomePage() {
	const images = [
		'https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_b-447230ef.jpg',
		'https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_a-3bb2d420.jpg',
		'https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_c-318d7eed.jpg',
		'https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg',
	];

	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
	};

	return (
		<div className='home-container'>
			<Slider {...settings}>
				{images.map((imageUrl, index) => (
					<div key={index}>
						<img src={imageUrl} alt='' />
					</div>
				))}
			</Slider>
		</div>
	);
}

export default HomePage;
