let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!sharedCtx) {
    sharedCtx = new AudioContext();
  }
  if (sharedCtx.state === "suspended") {
    void sharedCtx.resume();
  }
  return sharedCtx;
}

function tone(
  ctx: AudioContext,
  {
    type = "sawtooth",
    freq,
    start,
    duration,
    peak = 0.25,
    endFreq,
  }: {
    type?: OscillatorType;
    freq: number;
    start: number;
    duration: number;
    peak?: number;
    endFreq?: number;
  },
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (endFreq != null) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(endFreq, 20),
      start + duration,
    );
  }
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

/** Synthesized leopard roar / bass impact — no external audio files. */
export function playLeopardRoar() {
  const ctx = getCtx();
  const t = ctx.currentTime;

  tone(ctx, {
    type: "sawtooth",
    freq: 110,
    endFreq: 45,
    start: t,
    duration: 0.55,
    peak: 0.32,
  });
  tone(ctx, {
    type: "square",
    freq: 55,
    endFreq: 28,
    start: t + 0.04,
    duration: 0.7,
    peak: 0.22,
  });
  tone(ctx, {
    type: "triangle",
    freq: 180,
    endFreq: 70,
    start: t + 0.08,
    duration: 0.35,
    peak: 0.12,
  });

  // Noise burst for grit
  const bufferSize = ctx.sampleRate * 0.4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(400, t);
  filter.frequency.exponentialRampToValueAtTime(120, t + 0.35);
  noiseGain.gain.setValueAtTime(0.18, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(t);
  noise.stop(t + 0.45);
}

/** Soft ambient chime for Gangaw sanctuary. */
export function playGangawChime() {
  const ctx = getCtx();
  const t = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    tone(ctx, {
      type: "sine",
      freq,
      start: t + i * 0.18,
      duration: 1.2,
      peak: 0.08 - i * 0.01,
    });
  });
}

/** Soft gold sparkle for treaty signing. */
export function playTreatyChime() {
  const ctx = getCtx();
  const t = ctx.currentTime;
  [880, 1108.73, 1318.51].forEach((freq, i) => {
    tone(ctx, {
      type: "triangle",
      freq,
      start: t + i * 0.08,
      duration: 0.6,
      peak: 0.1,
    });
  });
}

export function unlockAudio() {
  getCtx();
}
