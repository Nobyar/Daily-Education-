/* Speech and gentle sound effects. Everything stays on the device. */

const CynthiaAudio = (() => {
  let ctx = null;
  let master = null;
  let nodes = [];
  let utterance = null;

  function context() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (!master) {
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function unlock() {
    context();
  }

  function stopSounds() {
    nodes.forEach((node) => {
      try { node.stop(); } catch (err) { /* already stopped */ }
    });
    nodes = [];
  }

  function tone(c, { freq, to, dur, type, gain, delay, at }) {
    const t = (at || c.currentTime) + (delay || 0);
    const osc = c.createOscillator();
    const amp = c.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, t);
    if (to) osc.frequency.exponentialRampToValueAtTime(Math.max(40, to), t + dur);
    amp.gain.setValueAtTime(0.0001, t);
    amp.gain.exponentialRampToValueAtTime(gain || 0.06, t + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(amp);
    amp.connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
    nodes.push(osc);
  }

  function noise(c, { dur, freq, q, gain, delay, at }) {
    const t = (at || c.currentTime) + (delay || 0);
    const length = Math.max(1, Math.floor(c.sampleRate * dur));
    const buffer = c.createBuffer(1, length, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const src = c.createBufferSource();
    src.buffer = buffer;
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(freq, t);
    filter.Q.setValueAtTime(q || 1, t);
    const amp = c.createGain();
    amp.gain.setValueAtTime(gain || 0.06, t);
    amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter);
    filter.connect(amp);
    amp.connect(master);
    src.start(t);
    src.stop(t + dur);
    nodes.push(src);
  }

  const sounds = {
    woof(c, at) {
      noise(c, { dur: 0.09, freq: 320, q: 0.8, gain: 0.07, at });
      tone(c, { freq: 220, to: 110, dur: 0.13, type: "triangle", gain: 0.07, at });
      noise(c, { dur: 0.1, freq: 250, q: 0.8, gain: 0.07, delay: 0.18, at });
      tone(c, { freq: 180, to: 90, dur: 0.14, type: "triangle", gain: 0.07, delay: 0.18, at });
    },
    meow(c, at) {
      tone(c, { freq: 680, to: 360, dur: 0.42, type: "sine", gain: 0.06, at });
      tone(c, { freq: 1020, to: 520, dur: 0.42, type: "triangle", gain: 0.025, at });
    },
    moo(c, at) {
      tone(c, { freq: 170, to: 140, dur: 0.7, type: "triangle", gain: 0.06, at });
      tone(c, { freq: 340, to: 280, dur: 0.7, type: "sine", gain: 0.03, at });
    },
    tweet(c, at) {
      tone(c, { freq: 1500, to: 2300, dur: 0.1, type: "sine", gain: 0.045, at });
      tone(c, { freq: 1700, to: 2600, dur: 0.12, type: "sine", gain: 0.04, delay: 0.14, at });
    },
    quack(c, at) {
      noise(c, { dur: 0.08, freq: 1100, q: 2, gain: 0.05, at });
      tone(c, { freq: 520, to: 280, dur: 0.1, type: "triangle", gain: 0.05, at });
      noise(c, { dur: 0.08, freq: 980, q: 2, gain: 0.05, delay: 0.14, at });
      tone(c, { freq: 480, to: 260, dur: 0.1, type: "triangle", gain: 0.045, delay: 0.14, at });
    },
    blub(c, at) {
      tone(c, { freq: 420, to: 180, dur: 0.16, type: "sine", gain: 0.06, at });
      tone(c, { freq: 360, to: 150, dur: 0.16, type: "sine", gain: 0.05, delay: 0.16, at });
      tone(c, { freq: 480, to: 200, dur: 0.14, type: "sine", gain: 0.045, delay: 0.32, at });
    },
    boing(c, at) {
      tone(c, { freq: 160, to: 520, dur: 0.16, type: "sine", gain: 0.07, at });
      tone(c, { freq: 520, to: 200, dur: 0.22, type: "sine", gain: 0.05, delay: 0.14, at });
    },
    oink(c, at) {
      noise(c, { dur: 0.08, freq: 620, q: 1.4, gain: 0.05, at });
      tone(c, { freq: 300, to: 180, dur: 0.14, type: "triangle", gain: 0.06, at });
      noise(c, { dur: 0.08, freq: 540, q: 1.4, gain: 0.045, delay: 0.18, at });
      tone(c, { freq: 260, to: 160, dur: 0.14, type: "triangle", gain: 0.05, delay: 0.18, at });
    },
    neigh(c, at) {
      tone(c, { freq: 420, to: 760, dur: 0.22, type: "triangle", gain: 0.05, at });
      tone(c, { freq: 740, to: 320, dur: 0.36, type: "sine", gain: 0.045, delay: 0.18, at });
    },
    baa(c, at) {
      tone(c, { freq: 280, to: 240, dur: 0.48, type: "triangle", gain: 0.055, at });
      tone(c, { freq: 430, to: 360, dur: 0.48, type: "sine", gain: 0.03, at });
    },
    ribbit(c, at) {
      tone(c, { freq: 250, to: 140, dur: 0.12, type: "triangle", gain: 0.06, at });
      noise(c, { dur: 0.08, freq: 400, q: 1, gain: 0.04, at });
      tone(c, { freq: 220, to: 120, dur: 0.14, type: "triangle", gain: 0.055, delay: 0.16, at });
    },
    bell(c, at) {
      tone(c, { freq: 880, to: 660, dur: 0.45, type: "sine", gain: 0.05, at });
      tone(c, { freq: 1320, to: 990, dur: 0.4, type: "triangle", gain: 0.02, at });
    },
    drum(c, at) {
      tone(c, { freq: 140, to: 60, dur: 0.18, type: "sine", gain: 0.08, at });
      noise(c, { dur: 0.08, freq: 180, q: 0.6, gain: 0.05, at });
      tone(c, { freq: 120, to: 50, dur: 0.16, type: "sine", gain: 0.07, delay: 0.28, at });
    },
    clap(c, at) {
      noise(c, { dur: 0.05, freq: 1800, q: 0.7, gain: 0.06, at });
      noise(c, { dur: 0.05, freq: 1400, q: 0.7, gain: 0.05, delay: 0.16, at });
    },
  };

  function play(name, delay) {
    const c = context();
    if (!c || !sounds[name]) return;
    sounds[name](c, c.currentTime + (delay || 0));
  }

  function celebrate() {
    const c = context();
    if (!c) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      tone(c, { freq, dur: 0.18, type: "sine", gain: 0.045, delay: i * 0.09 });
    });
  }

  function pickVoice() {
    if (!window.speechSynthesis) return null;
    const voices = speechSynthesis.getVoices();
    const score = (v) => {
      const name = `${v.name} ${v.lang}`.toLowerCase();
      let s = 0;
      if (v.lang && v.lang.toLowerCase().startsWith("en")) s += 5;
      if (/en-us/.test((v.lang || "").toLowerCase())) s += 2;
      if (/samantha|karen|moira|aria|jenny|zira|google us english|female/.test(name)) s += 4;
      if (/male|david|alex|fred/.test(name) && !/female/.test(name)) s -= 2;
      if (/compact|espeak|novelty/.test(name)) s -= 3;
      return s;
    };
    return voices.slice().sort((a, b) => score(b) - score(a))[0] || null;
  }

  if (window.speechSynthesis) {
    speechSynthesis.onvoiceschanged = () => pickVoice();
  }

  function speak(text, opts) {
    const options = opts || {};
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve(false);
        return;
      }
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      utterance = u;
      u.rate = options.rate || 0.72;
      u.pitch = options.pitch || 1.04;
      u.lang = "en-US";
      const voice = pickVoice();
      if (voice) u.voice = voice;
      let settled = false;
      const finish = () => {
        if (!settled) {
          settled = true;
          resolve(true);
        }
      };
      u.onend = finish;
      u.onerror = finish;
      window.setTimeout(finish, Math.min(45000, 1600 + String(text).length * 70));
      try { speechSynthesis.resume(); } catch (err) { /* some browsers throw if idle */ }
      speechSynthesis.speak(u);
    });
  }

  function has(name) {
    return Boolean(sounds[name]);
  }

  return { unlock, stopSounds, play, celebrate, speak, has };
})();
