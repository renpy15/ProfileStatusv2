
class SoundManager {
   constructor() {
      this.sounds = {};
      this.muted = false;
      this.volume = 0.5;
      this.init();
   }

   init() {
      
      this.loadSound('reveal', 'assets/sounds/reveal.mp3');

      
      this.addMuteControl();
   }

   loadSound(name, path) {
      const audio = new Audio(path);
      audio.preload = 'auto';
      this.sounds[name] = audio;
   }

   play(name) {
      if (this.muted) return;

      const sound = this.sounds[name];
      if (sound) {
         sound.currentTime = 0;
         sound.volume = this.volume;
         sound.play().catch(e => console.error('Sound play failed:', e));
      }
   }

   toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('soundMuted', this.muted);
      return this.muted;
   }

   setVolume(volume) {
      this.volume = Math.min(1, Math.max(0, volume));
      localStorage.setItem('soundVolume', this.volume);
   }

   addMuteControl() {
      
      document.addEventListener('keydown', (e) => {
         if (e.key === 'm') {
            this.toggleMute();
         }
      });

      
      const savedMute = localStorage.getItem('soundMuted');
      const savedVolume = localStorage.getItem('soundVolume');

      if (savedMute !== null) {
         this.muted = savedMute === 'true';
      }

      if (savedVolume !== null) {
         this.volume = parseFloat(savedVolume);
      }
   }
}


const soundManager = new SoundManager();


function playRevealSound() {
   soundManager.play('reveal');
}