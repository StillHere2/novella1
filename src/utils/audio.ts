// Web Audio API Synthesizer

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Typing sound is completely muted per user request.
 */
export function playTeletypeClick(_volume?: number) {
  // Muted per user request
}

export function playPaperRustle(volume = 0.35) {
  try {
    const ctx = getAudioContext();
    const duration = 0.24;
    const sampleRate = ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    // Synthesize textured paper fiber noise with authentic crinkle micro-crackles
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      const isCrackle = Math.random() < 0.09 ? (Math.random() * 2 - 1) * 1.6 : 0;
      lastOut = (lastOut + 0.05 * white) / 1.05;
      data[i] = lastOut * 0.65 + white * 0.25 + isCrackle * 0.4;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    // Bandpass filter for papery friction timbre (1200 - 3500 Hz)
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + duration);
    filter.Q.setValueAtTime(1.1, ctx.currentTime);

    // Highpass to eliminate muddy low bass
    const hpFilter = ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(450, ctx.currentTime);

    // Multi-peak envelope simulating paper rustling and folding
    const gainNode = ctx.createGain();
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(volume * 0.85, now + 0.03);
    gainNode.gain.linearRampToValueAtTime(volume * 0.45, now + 0.08);
    gainNode.gain.linearRampToValueAtTime(volume * 0.95, now + 0.13);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noiseSource.connect(hpFilter);
    hpFilter.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + duration);
  } catch {}
}

// All other sounds are silenced/muted as requested
export function playTapSound(_volume?: number) {
  // Muted
}

export function playChoiceBeep(_volume?: number) {
  // Muted
}

export function playSignalConnect(_volume?: number) {
  // Muted
}

export function playMessageSend(_volume?: number) {
  // Muted
}

export function playMessageReceive(_volume?: number) {
  // Muted
}

export function playGlitchStatic(_volume?: number) {
  // Muted
}

export function playHeartbeat(_volume?: number) {
  // Muted
}

export function playMonsterGrowl(_volume?: number) {
  // Muted
}

export function toggleAmbientAtmosphere(_enabled: boolean, _character?: 'girl' | 'boy', _volume?: number) {
  // Muted
}
