const button = document.querySelector('#get-songs-button');
console.log(button);

const getSongs = async (e) => {
const songs = await fetch('http://localhost:8000/api/songs').then(
		(response) => response.json()
	);
	const songsArray = songs.Songs;

	const bodydiv = document.createElement('div');
	bodydiv.classList.add('songs-container');
	document.body.appendChild(bodydiv);

	songsArray.forEach((song) => {
		const div = document.createElement('div');
		const userId = song.userId;
		const title = song.title;
		const description = song.description;
		const userIdbox = document.createElement('div');
		userIdbox.classList.add(`userIdbox`);
		const titlebox = document.createElement('div');
		titlebox.classList.add(`titlebox`);
		const descriptionbox = document.createElement('div');
		descriptionbox.classList.add(`descriptionbox`);
		userIdbox.innerText = `UserId: ${userId}`;
		titlebox.innerText = `Title: ${title}`;
		descriptionbox.innerText = `Description: ${description}`;

		div.appendChild(userIdbox);
		div.appendChild(titlebox);
		div.appendChild(descriptionbox);
		bodydiv.appendChild(div);
	});
	button.removeEventListener('click', getSongs);
	}

button.addEventListener('click', getSongs)
