const fullscreenBtn = document.getElementById('btn-full');
const videoContainer = document.querySelector('.video-container');

fullscreenBtn.addEventListener('click', () => {
	if (videoContainer.requestFullscreen) {
		videoContainer.requestFullscreen();
	}
});
