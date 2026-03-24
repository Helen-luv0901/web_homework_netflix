const movieDatabase = [
    { name: "荒唐分局", videoPath: "videos/99.mp4", poster: "images/99.jpg" },
    { name: "航海王", videoPath: "videos/one piece.mp4", poster: "images/one piece.jpg" },
    { name: "怪奇物語", videoPath: "videos/stranger thing 2.mp4", poster: "images/stranger things.jpg" },
    { name: "黑暗榮耀", videoPath: "videos/the glory.mp4", poster: "images/the glory.jpg" }
];

let isMuted = true;

function startSpin() {
    const btn = document.getElementById('spin-btn');
    const videoContainer = document.getElementById('video-container');
    const videoElement = document.getElementById('preview-video');
    const posterElement = document.getElementById('main-poster');
    const statusText = document.getElementById('status-text');
    
    btn.disabled = true;
    btn.innerText = "連線中...";
    
    posterElement.classList.remove('hidden'); 
    videoContainer.classList.add('hidden');
    videoElement.pause();

    let counter = 0;
    const interval = setInterval(() => {
        const rand = movieDatabase[Math.floor(Math.random() * movieDatabase.length)];
        posterElement.src = rand.poster; 
        counter++;

        if (counter > 15) {
            clearInterval(interval);
            const final = movieDatabase[Math.floor(Math.random() * movieDatabase.length)];
            
            // 更換大背景圖片
            document.body.style.backgroundImage = "url('" + final.poster + "')"; 
            
            videoElement.src = encodeURI(final.videoPath);
            videoElement.load();

            videoElement.onloadedmetadata = () => {
                videoElement.currentTime = 0; 
                videoElement.muted = true; 
                
                posterElement.classList.add('hidden'); 
                videoContainer.classList.remove('hidden'); 
                
                videoElement.play().then(() => {
                    videoElement.muted = isMuted;
                    statusText.innerText = `正在播放：${final.name}`;
                }).catch(err => {
                    statusText.innerText = "點擊畫面以開始播放";
                });

                btn.disabled = false;
                btn.innerText = "不滿意？再抽一個！";
            };
        }
    }, 100);
}

function toggleMute() {
    const videoElement = document.getElementById('preview-video');
    const muteIcon = document.getElementById('mute-icon');
    isMuted = !isMuted;
    videoElement.muted = isMuted;
    muteIcon.innerText = isMuted ? "🔇" : "🔊";
}