/**
 * Gentle Music Box Synthesizer using Web Audio API
 * Generates an adorable, cozy chime/music box melody (Happy Birthday in pentatonic chime)
 * Works 100% offline with zero external audio assets!
 */

class BirthdayMusicBox {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentNoteIndex: number = 0;

  // Happy Birthday melody notes (frequencies in Hz)
  private melody: Array<{ freq: number; duration: number }> = [
    { freq: 261.63, duration: 0.35 }, // C4
    { freq: 261.63, duration: 0.25 }, // C4
    { freq: 293.66, duration: 0.5 },  // D4
    { freq: 261.63, duration: 0.5 },  // C4
    { freq: 349.23, duration: 0.5 },  // F4
    { freq: 329.63, duration: 0.8 },  // E4

    { freq: 261.63, duration: 0.35 }, // C4
    { freq: 261.63, duration: 0.25 }, // C4
    { freq: 293.66, duration: 0.5 },  // D4
    { freq: 261.63, duration: 0.5 },  // C4
    { freq: 392.00, duration: 0.5 },  // G4
    { freq: 349.23, duration: 0.8 },  // F4

    { freq: 261.63, duration: 0.35 }, // C4
    { freq: 261.63, duration: 0.25 }, // C4
    { freq: 523.25, duration: 0.5 },  // C5
    { freq: 440.00, duration: 0.5 },  // A4
    { freq: 349.23, duration: 0.5 },  // F4
    { freq: 329.63, duration: 0.5 },  // E4
    { freq: 293.66, duration: 0.7 },  // D4

    { freq: 466.16, duration: 0.35 }, // Bb4
    { freq: 466.16, duration: 0.25 }, // Bb4
    { freq: 440.00, duration: 0.5 },  // A4
    { freq: 349.23, duration: 0.5 },  // F4
    { freq: 392.00, duration: 0.5 },  // G4
    { freq: 349.23, duration: 1.0 },  // F4
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plays a single music-box chime note
  playChime(freq: number, duration: number = 0.5) {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Fundamental tone (Sine wave)
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle metallic overtone for music-box feel
    const overtone = this.ctx.createOscillator();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2.01, now);

    const gain = this.ctx.createGain();
    const overtoneGain = this.ctx.createGain();

    // Fast attack, slow bell-like exponential decay
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.6);

    overtoneGain.gain.setValueAtTime(0.001, now);
    overtoneGain.gain.linearRampToValueAtTime(0.06, now + 0.01);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.5);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    gain.connect(this.ctx.destination);
    overtoneGain.connect(this.ctx.destination);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + duration + 0.7);
    overtone.stop(now + duration + 0.7);
  }

  startMelody(onLoop?: () => void) {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.currentNoteIndex = 0;

    const playNext = () => {
      if (!this.isPlaying) return;
      const note = this.melody[this.currentNoteIndex];
      this.playChime(note.freq, note.duration);

      const delayMs = note.duration * 1000 + 120;
      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
      
      if (this.currentNoteIndex === 0 && onLoop) {
        onLoop();
      }

      this.timerId = window.setTimeout(playNext, delayMs);
    };

    playNext();
  }

  stopMelody() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggleMelody(): boolean {
    if (this.isPlaying) {
      this.stopMelody();
      return false;
    } else {
      this.startMelody();
      return true;
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const musicBox = new BirthdayMusicBox();
