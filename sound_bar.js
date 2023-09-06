const clix = [
	'delib_laugh',
	'why',
	'quick_what',
	'what_do_we',
	'obsessed',
	'highlander',
	'so_much_to_',
	'wanna_quit',
	'never_give_',
	'just_humans',
	'just_babies',
	'bowalls',
];

clix.forEach((c) => {
	const btn = document.createElement('button');
	btn.classList.add('btn');

	btn.innerText = c;

	btn.addEventListener('click', () => {
		stopSongs();
		document.getElementById(c).play();
	});

	document.getElementById('buttons').appendChild(btn);
});

function stopSongs() {
	clix.forEach((c) => {
		const song = document.getElementById(c);

		song.pause();
		song.currentTime = 0;
	})
}
