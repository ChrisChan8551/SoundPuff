import React from 'react';

const footerIcons = [
	{
		src: 'https://cdn.pixabay.com/photo/2016/06/13/17/30/mail-1454731_1280.png',
		alt: 'Email',
		onClick: () => {
			window.location.href = 'mailto:chrischan8551@gmail.com';
		},
	},
	{
		src: 'https://cdn.pixabay.com/photo/2016/11/18/11/16/social-1834011_640.png',
		alt: 'LinkedIn',
		onClick: () => {
			window.location.href =
				'https://www.linkedin.com/in/chris-chan-94567289/';
		},
	},
	{
		src: 'https://cdn.pixabay.com/photo/2017/08/05/11/24/logo-2582757_640.png',
		alt: 'GitHub',
		onClick: () => {
			window.location.href =
				'https://github.com/ChrisChan8551/SoundPuff.git';
		},
	},
];

function Footer() {
	return (
		<div className='footer'>
			{footerIcons.map((icon, index) => (
				<img
					key={index}
					className='icon'
					src={icon.src}
					alt={icon.alt}
					onClick={icon.onClick}
				/>
			))}
		</div>
	);
}

export default Footer;
