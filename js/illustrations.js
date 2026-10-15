/* Pictures for Pentagonal Daily Education.
   Each lesson id has a function in PICTURES. Add a new one when you add a lesson.
   Artwork is original SVG. Nothing is loaded from the network. */

const CynthiaArt = (() => {
  function scene(id, c0, c1, inner) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320" aria-hidden="true">
      <defs>
        <radialGradient id="${id}-bg" cx="48%" cy="34%" r="74%">
          <stop offset="0%" stop-color="${c0}"/>
          <stop offset="100%" stop-color="${c1}"/>
        </radialGradient>
      </defs>
      <rect width="320" height="320" rx="44" fill="url(#${id}-bg)"/>
      <circle cx="262" cy="54" r="22" fill="#fff" opacity="0.2"/>
      <circle cx="52" cy="70" r="8" fill="#fff" opacity="0.34"/>
      <circle cx="74" cy="248" r="5" fill="#fff" opacity="0.24"/>
      <ellipse cx="160" cy="278" rx="90" ry="12" fill="#5a4638" opacity="0.08"/>
      ${inner}
    </svg>`;
  }

  function eye(x, y, s) {
    const k = s || 1;
    return `<g>
      <ellipse cx="${x}" cy="${y}" rx="${7.4 * k}" ry="${8.6 * k}" fill="#2c2834"/>
      <circle cx="${x - 2.3 * k}" cy="${y - 2.8 * k}" r="${2.6 * k}" fill="#fff"/>
      <circle cx="${x + 2.5 * k}" cy="${y + 3 * k}" r="${1.15 * k}" fill="#fff" opacity="0.85"/>
    </g>`;
  }

  function eyes(x, y, gap, s) {
    return eye(x, y, s) + eye(x + gap, y, s);
  }

  function blush(x, y, s) {
    const k = s || 1;
    return `<ellipse cx="${x}" cy="${y}" rx="${10 * k}" ry="${6.5 * k}" fill="#f3a3a0" opacity="0.62"/>`;
  }

  function smile(x, y, w) {
    const width = w || 14;
    return `<path d="M${x - width} ${y} Q ${x} ${y + width * 0.85} ${x + width} ${y}" fill="none" stroke="#2c2834" stroke-width="3.4" stroke-linecap="round"/>`;
  }

  function gloss(x, y, rx, ry) {
    return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity="0.38"/>`;
  }

  function face(cx, cy, s) {
    const k = s || 1;
    const gap = 34 * k;
    return eyes(cx - gap / 2, cy, gap, k) + blush(cx - 36 * k, cy + 16 * k, k) + blush(cx + 36 * k, cy + 16 * k, k) + smile(cx, cy + 22 * k, 13 * k);
  }

  function mitten(x, y, rot, fill, s) {
    const k = s || 1;
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${k})">
      <ellipse cx="0" cy="10" rx="20" ry="24" fill="${fill}"/>
      <ellipse cx="16" cy="-8" rx="9" ry="12" fill="${fill}"/>
      <ellipse cx="-2" cy="2" rx="12" ry="8" fill="#fff" opacity="0.2"/>
    </g>`;
  }

  function person(o) {
    const skin = o.skin || "#F8D0B4";
    const shade = o.shade || "#F0B896";
    const hair = o.hair || "#6B3A34";
    const shirt = o.shirt || "#F08AA4";
    const style = o.style || "long";
    let hairBack = "";
    let hairFront = "";
    if (style === "long") {
      hairBack = `<path d="M100 150 C92 88 122 50 160 50 C200 50 230 90 220 152 C232 214 208 272 176 292 L176 214 C166 226 154 226 144 214 L144 292 C112 272 88 216 100 150Z" fill="${hair}"/>`;
      hairFront = `<path d="M106 136 C110 74 132 58 160 60 C190 58 214 78 216 136 C196 110 182 122 166 104 C154 122 136 112 120 126 C110 108 106 120 106 136Z" fill="${hair}"/>
        <path d="M106 128 C88 164 92 220 114 252 C120 214 118 166 128 134Z" fill="${hair}"/>
        <path d="M214 128 C232 164 228 220 206 252 C200 214 202 166 192 134Z" fill="${hair}"/>
        ${gloss(150, 90, 26, 10)}`;
    } else if (style === "short") {
      hairFront = `<path d="M108 148 C100 92 126 66 160 66 C196 66 222 94 214 148 C198 118 176 130 160 112 C140 130 122 118 108 148Z" fill="${hair}"/>${gloss(148, 96, 22, 8)}`;
    } else if (style === "baby") {
      hairFront = `<path d="M146 92 C152 70 170 68 174 90 C180 72 194 78 186 98 C172 86 156 88 146 92Z" fill="${hair}"/>`;
    }
    const arms = o.wave
      ? mitten(250, 150, -28, skin, 0.92)
      : `<ellipse cx="92" cy="230" rx="16" ry="22" fill="${skin}"/><ellipse cx="228" cy="230" rx="16" ry="22" fill="${skin}"/>`;
    return `${hairBack}
      <path d="M84 240 C98 198 122 184 160 184 C198 184 222 198 236 240 L250 312 H70 Z" fill="${shirt}"/>
      <path d="M132 196 Q160 228 188 196 L180 188 Q160 208 140 188Z" fill="#fff" opacity="0.82"/>
      <rect x="146" y="170" width="28" height="28" rx="12" fill="${shade}"/>
      <ellipse cx="100" cy="156" rx="12" ry="16" fill="${skin}"/>
      <ellipse cx="220" cy="156" rx="12" ry="16" fill="${skin}"/>
      <circle cx="160" cy="142" r="60" fill="${skin}"/>
      <ellipse cx="160" cy="168" rx="44" ry="24" fill="${shade}" opacity="0.25"/>
      ${hairFront}
      ${eyes(134, 146, 52, o.eye || 1.02)}
      ${blush(120, 162, 1)}
      ${blush(200, 162, 1)}
      <ellipse cx="160" cy="162" rx="5" ry="4" fill="#E7A48E"/>
      ${smile(160, 172, 13)}
      ${gloss(138, 116, 16, 8)}
      ${arms}
      ${o.extra || ""}`;
  }

  function critter(o) {
    const body = o.body;
    const belly = o.belly;
    const ear = o.ear;
    const earFill = o.earFill || body;
    const inner = o.inner || "#F6C1C4";
    let ears = "";
    if (ear === "floppy") {
      ears = `<ellipse cx="108" cy="136" rx="24" ry="36" fill="${earFill}" transform="rotate(-26 108 136)"/>
        <ellipse cx="212" cy="136" rx="24" ry="36" fill="${earFill}" transform="rotate(26 212 136)"/>
        <ellipse cx="112" cy="140" rx="12" ry="22" fill="${inner}" transform="rotate(-26 112 140)"/>
        <ellipse cx="208" cy="140" rx="12" ry="22" fill="${inner}" transform="rotate(26 208 140)"/>`;
    } else if (ear === "pointy") {
      ears = `<path d="M118 124 L98 52 L154 112 Z" fill="${earFill}"/>
        <path d="M202 124 L222 52 L166 112 Z" fill="${earFill}"/>
        <path d="M120 118 L108 68 L146 108 Z" fill="${inner}"/>
        <path d="M200 118 L212 68 L174 108 Z" fill="${inner}"/>`;
    } else if (ear === "tall") {
      ears = `<ellipse cx="122" cy="78" rx="18" ry="52" fill="${earFill}"/>
        <ellipse cx="198" cy="78" rx="18" ry="52" fill="${earFill}"/>
        <ellipse cx="122" cy="84" rx="9" ry="36" fill="${inner}"/>
        <ellipse cx="198" cy="84" rx="9" ry="36" fill="${inner}"/>`;
    } else if (ear === "side") {
      ears = `<ellipse cx="102" cy="132" rx="20" ry="16" fill="${earFill}"/>
        <ellipse cx="218" cy="132" rx="20" ry="16" fill="${earFill}"/>
        <ellipse cx="102" cy="132" rx="11" ry="9" fill="${inner}"/>
        <ellipse cx="218" cy="132" rx="11" ry="9" fill="${inner}"/>`;
    }
    let tail = "";
    if (o.tail === "curl") {
      tail = `<path d="M228 196 C270 170 274 236 232 230" fill="none" stroke="${body}" stroke-width="12" stroke-linecap="round"/>`;
    } else if (o.tail === "puff") {
      tail = `<circle cx="236" cy="196" r="18" fill="#fff"/>`;
    } else if (o.tail === "long") {
      tail = `<path d="M224 188 C286 150 270 250 214 236" fill="none" stroke="${o.tailColor || body}" stroke-width="12" stroke-linecap="round"/>`;
    } else if (o.tail === "pig") {
      tail = `<path d="M226 200 c12 -16 28 -8 18 6 c-8 12 -24 8 -18 -6" fill="none" stroke="${body}" stroke-width="6" stroke-linecap="round"/>`;
    }
    const wool = o.wool
      ? `<circle cx="118" cy="206" r="30" fill="#F7F4EF"/><circle cx="160" cy="192" r="34" fill="#F7F4EF"/><circle cx="204" cy="206" r="30" fill="#F7F4EF"/><circle cx="138" cy="230" r="26" fill="#fff"/><circle cx="184" cy="230" r="26" fill="#fff"/>`
      : `<ellipse cx="160" cy="214" rx="74" ry="50" fill="${body}"/><ellipse cx="160" cy="228" rx="44" ry="30" fill="${belly}"/>`;
    const headFill = o.wool ? "#3d342c" : body;
    let snout = "";
    if (o.snout === "short") {
      snout = `<ellipse cx="160" cy="168" rx="28" ry="18" fill="${belly}"/>
        <ellipse cx="160" cy="164" rx="8" ry="6" fill="${o.nose || "#2c2834"}"/>
        ${o.tongue ? `<ellipse cx="160" cy="178" rx="7" ry="8" fill="#E57B84"/>` : ""}`;
    } else if (o.snout === "pig") {
      snout = `<ellipse cx="160" cy="172" rx="30" ry="22" fill="#F7B4BE"/>
        <ellipse cx="150" cy="172" rx="5" ry="7" fill="#D48492"/>
        <ellipse cx="170" cy="172" rx="5" ry="7" fill="#D48492"/>`;
    } else if (o.snout === "beak") {
      snout = `<path d="M140 162 L160 186 L180 162 Q160 170 140 162Z" fill="${o.beak || "#F2B84B"}"/>`;
    }
    const spots = (o.spots || []).map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.spot || "#6B4A32"}" opacity="0.9"/>`).join("");
    return `${tail}${wool}${ears}
      <circle cx="160" cy="128" r="58" fill="${headFill}"/>
      ${o.wool ? "" : gloss(140, 108, 22, 12)}
      ${spots}
      ${o.extra || ""}
      ${eyes(136, 124, 48, o.eye || 1)}
      ${blush(118, 146, 0.9)}
      ${blush(202, 146, 0.9)}
      ${snout}
      ${o.whiskers || ""}`;
  }

  const PICTURES = {
    mama: () => scene("mama", "#FFF4F7", "#F7C3D4", person({
      style: "long",
      shirt: "#F08AA4",
      extra: `<circle cx="160" cy="206" r="6" fill="#fff"/><circle cx="160" cy="206" r="3.5" fill="#E05680"/>`,
    })),
    dada: () => scene("dada", "#F3F8FF", "#C9DDF8", person({
      style: "short",
      hair: "#3E342F",
      shirt: "#7EB0E8",
    })),
    hi: () => scene("hi", "#FFF8E8", "#FFE0A8", person({
      style: "short",
      hair: "#6B442C",
      shirt: "#F2C14E",
      wave: true,
    })),
    bye: () => scene("bye", "#F4F1FF", "#DDD4F8", `
      <rect x="36" y="118" width="62" height="150" rx="10" fill="#E7C9A2"/>
      <rect x="44" y="132" width="22" height="28" rx="4" fill="#F8E7C8"/>
      <circle cx="84" cy="196" r="4" fill="#C9844A"/>
      <g transform="translate(28 8) scale(0.86)">${person({ style: "short", hair: "#5A3A32", shirt: "#8EC5F0", wave: true })}</g>`),
    more: () => scene("more", "#FFF6EA", "#F8D7B0", `
      <ellipse cx="150" cy="214" rx="70" ry="16" fill="#F3E2C8"/>
      <ellipse cx="150" cy="206" rx="70" ry="16" fill="#fff"/>
      <circle cx="132" cy="198" r="22" fill="#E0A15A"/>
      ${gloss(124, 190, 8, 5)}
      <circle cx="126" cy="194" r="3" fill="#8A5A32"/>
      <circle cx="140" cy="202" r="3" fill="#8A5A32"/>
      ${mitten(214, 150, -20, "#F8D0B4", 1)}
      <circle cx="196" cy="132" r="20" fill="#E0A15A"/>
      ${gloss(188, 124, 7, 4)}
      <circle cx="190" cy="128" r="2.4" fill="#8A5A32"/>
      <circle cx="204" cy="136" r="2.4" fill="#8A5A32"/>
      <path d="M168 96 h10 v-10 h8 v10 h10 v8 h-10 v10 h-8 v-10 h-10z" fill="#F08AA4"/>`),
    alldone: () => scene("alldone", "#F4FBF6", "#CDEBD8", `
      <path d="M70 168 Q160 230 250 168" fill="#F4F7FB"/>
      <ellipse cx="160" cy="168" rx="90" ry="22" fill="#fff"/>
      <ellipse cx="160" cy="168" rx="64" ry="12" fill="#E7EEF6"/>
      <path d="M210 150 q20 8 8 22" fill="none" stroke="#C5D0DE" stroke-width="8" stroke-linecap="round"/>
      ${mitten(96, 118, -40, "#F8D0B4", 0.85)}
      ${mitten(214, 112, 36, "#F8D0B4", 0.85)}
      ${smile(160, 78, 16)}
      ${eyes(136, 58, 48, 0.8)}`),
    milk: () => scene("milk", "#F5FBFF", "#D5ECFA", `
      <rect x="118" y="78" width="84" height="150" rx="28" fill="#F4FBFF" stroke="#D5E6F2" stroke-width="4"/>
      <rect x="126" y="128" width="68" height="86" rx="18" fill="#FFF"/>
      <ellipse cx="160" cy="128" rx="34" ry="10" fill="#FFF"/>
      <rect x="146" y="58" width="28" height="28" rx="8" fill="#E56B8A"/>
      <rect x="154" y="46" width="12" height="20" rx="6" fill="#F2B3C4"/>
      ${gloss(140, 150, 10, 28)}
      <circle cx="168" cy="156" r="6" fill="#F7C3D4" opacity="0.8"/>`),
    ball: () => scene("ball", "#FFF8EE", "#F8D2C4", `
      <circle cx="160" cy="164" r="78" fill="#F25C6B"/>
      <path d="M98 120 Q160 150 222 120" fill="none" stroke="#fff" stroke-width="8" opacity="0.85"/>
      <path d="M160 90 Q188 164 160 238" fill="none" stroke="#fff" stroke-width="8" opacity="0.85"/>
      ${gloss(124, 124, 24, 14)}
      ${eyes(140, 158, 40, 0.85)}
      ${smile(160, 186, 12)}`),
    dog: () => scene("dog", "#FFF6E8", "#F6D3A4", critter({
      body: "#E7B56A",
      belly: "#F8D7B0",
      ear: "floppy",
      earFill: "#D0924A",
      inner: "#F2C2A8",
      tail: "curl",
      snout: "short",
      tongue: true,
      extra: `<path d="M132 168 Q160 186 188 168" fill="none" stroke="#C9844A" stroke-width="6"/>
        <circle cx="160" cy="196" r="8" fill="#E56B8A"/>`,
    })),
    up: () => scene("up", "#F4F7FF", "#D9E4FF", `
      <circle cx="160" cy="176" r="46" fill="#F8D0B4"/>
      ${eyes(142, 170, 36, 0.85)}
      ${blush(138, 186, 0.7)}
      ${blush(182, 186, 0.7)}
      ${smile(160, 190, 10)}
      <path d="M120 214 Q160 250 200 214 L210 300 H110 Z" fill="#8EC5F0"/>
      ${mitten(78, 120, -70, "#F8D0B4", 0.8)}
      ${mitten(242, 120, 70, "#F8D0B4", 0.8)}
      <path d="M160 42 v34" stroke="#F2C14E" stroke-width="8" stroke-linecap="round"/>
      <path d="M160 42 l-12 16 h24 z" fill="#F2C14E"/>
      <circle cx="108" cy="78" r="4" fill="#fff"/>
      <circle cx="214" cy="64" r="5" fill="#fff" opacity="0.8"/>`),
    baby: () => scene("baby", "#FFF8EC", "#FDE0B8", person({
      style: "baby",
      hair: "#8A5A3A",
      shirt: "#F6D56A",
      eye: 1.12,
    })),
    no: () => scene("no", "#FFF1F0", "#F6C9C4", `
      <circle cx="160" cy="158" r="68" fill="#F8D0B4"/>
      ${eyes(132, 150, 52, 1)}
      ${blush(122, 176, 1)}
      ${blush(198, 176, 1)}
      ${smile(160, 188, 12)}
      <path d="M70 132 q-18 -16 2 -30" fill="none" stroke="#E98974" stroke-width="6" stroke-linecap="round"/>
      <path d="M250 132 q18 -16 -2 -30" fill="none" stroke="#E98974" stroke-width="6" stroke-linecap="round"/>
      <path d="M78 188 q-16 10 0 24" fill="none" stroke="#E98974" stroke-width="6" stroke-linecap="round"/>
      <path d="M242 188 q16 10 0 24" fill="none" stroke="#E98974" stroke-width="6" stroke-linecap="round"/>`),
    yes: () => scene("yes", "#F3FBF4", "#CDEBD4", `
      <circle cx="160" cy="150" r="78" fill="#7DCEA0"/>
      <path d="M112 154 l28 30 56-64" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      ${gloss(124, 112, 22, 12)}`),
    help: () => scene("help", "#FFF6EE", "#F8D0C0", `
      ${mitten(108, 176, -30, "#F8D0B4", 1.15)}
      ${mitten(206, 150, 20, "#F8D0B4", 1.15)}
      <circle cx="168" cy="108" r="26" fill="#F2C14E"/>
      ${gloss(158, 98, 10, 6)}
      <path d="M168 86 v18 M159 95 h18" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`),
    water: () => scene("water", "#F3FBFF", "#C9E7FA", `
      <path d="M160 48 C160 48 84 150 84 196 a76 76 0 0 0 152 0 C236 150 160 48 160 48Z" fill="#7EC8F2"/>
      <path d="M160 78 C160 78 112 150 112 186 a48 48 0 0 0 96 0 C208 150 160 78 160 78Z" fill="#B9E4FB"/>
      ${gloss(132, 168, 16, 28)}
      ${eyes(142, 176, 36, 0.7)}
      ${smile(160, 198, 10)}`),
    book: () => scene("book", "#F8F4FF", "#E0D4F8", `
      <path d="M64 86 h96 q16 40 0 150 H64 q-8-70 0-150Z" fill="#F08AA4"/>
      <path d="M160 86 h96 q8 70 0 150 h-96 q16-40 0-150Z" fill="#7EB0E8"/>
      <path d="M160 86 v150" stroke="#F7F4EF" stroke-width="8"/>
      <path d="M84 120 h52 M84 140 h40" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
      <path d="M184 120 h48 M184 140 h36" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
      ${gloss(96, 104, 18, 8)}`),
    nose: () => scene("nose", "#FFF4F0", "#F8D0C4", `
      <circle cx="160" cy="156" r="78" fill="#F8D0B4"/>
      ${eyes(128, 140, 64, 0.9)}
      ${blush(112, 176, 1.1)}
      ${blush(208, 176, 1.1)}
      <ellipse cx="160" cy="176" rx="16" ry="20" fill="#F0B090"/>
      <ellipse cx="152" cy="182" rx="4" ry="5" fill="#E08A78"/>
      <ellipse cx="168" cy="182" rx="4" ry="5" fill="#E08A78"/>
      <circle cx="160" cy="168" r="22" fill="none" stroke="#E98974" stroke-width="4" opacity="0.7"/>
      ${smile(160, 210, 14)}`),
    eyes: () => scene("eyes", "#F4F8FF", "#D5E4FA", `
      <circle cx="160" cy="168" r="74" fill="#F8D0B4"/>
      ${eyes(112, 156, 76, 1.55)}
      ${blush(108, 200, 1)}
      ${blush(212, 200, 1)}
      ${smile(160, 214, 12)}`),
    ears: () => scene("ears", "#FFF6F2", "#F6D5C8", `
      <ellipse cx="78" cy="160" rx="32" ry="42" fill="#F8D0B4"/>
      <ellipse cx="242" cy="160" rx="32" ry="42" fill="#F8D0B4"/>
      <ellipse cx="78" cy="160" rx="16" ry="24" fill="#F3B2AE"/>
      <ellipse cx="242" cy="160" rx="16" ry="24" fill="#F3B2AE"/>
      <circle cx="160" cy="164" r="70" fill="#F8D0B4"/>
      ${eyes(136, 158, 48, 0.9)}
      ${smile(160, 190, 12)}
      <circle cx="78" cy="160" r="36" fill="none" stroke="#E98974" stroke-width="4"/>
      <circle cx="242" cy="160" r="36" fill="none" stroke="#E98974" stroke-width="4"/>`),
    mouth: () => scene("mouth", "#FFF3F6", "#F8D0DC", `
      <circle cx="160" cy="150" r="78" fill="#F8D0B4"/>
      ${eyes(132, 132, 56, 0.85)}
      ${blush(116, 168, 1)}
      ${blush(204, 168, 1)}
      <path d="M112 186 Q160 236 208 186 Q160 206 112 186Z" fill="#E57B84"/>
      <path d="M128 196 Q160 214 192 196" fill="#F2B4B8"/>
      <circle cx="160" cy="196" r="34" fill="none" stroke="#E56B8A" stroke-width="4"/>`),
    hands: () => scene("hands", "#FFF8F2", "#F8DCC8", `
      ${mitten(110, 150, -12, "#F8D0B4", 1.45)}
      ${mitten(214, 156, 16, "#F8D0B4", 1.35)}`),
    feet: () => scene("feet", "#FFF6F1", "#F6D4C6", `
      <g transform="translate(104 168) rotate(-8)">
        <ellipse cx="0" cy="18" rx="40" ry="24" fill="#F8D0B4"/>
        <circle cx="-24" cy="0" r="9" fill="#F8D0B4"/>
        <circle cx="-8" cy="-6" r="9" fill="#F8D0B4"/>
        <circle cx="8" cy="-8" r="9" fill="#F8D0B4"/>
        <circle cx="24" cy="-2" r="8" fill="#F8D0B4"/>
      </g>
      <g transform="translate(214 186) rotate(8)">
        <ellipse cx="0" cy="18" rx="40" ry="24" fill="#F3C2A4"/>
        <circle cx="-24" cy="0" r="9" fill="#F3C2A4"/>
        <circle cx="-8" cy="-6" r="9" fill="#F3C2A4"/>
        <circle cx="8" cy="-8" r="9" fill="#F3C2A4"/>
        <circle cx="24" cy="-2" r="8" fill="#F3C2A4"/>
      </g>`),
    tummy: () => scene("tummy", "#FFF6F2", "#F8D5C8", `
      <circle cx="160" cy="168" r="78" fill="#F8D0B4"/>
      <ellipse cx="160" cy="176" rx="46" ry="40" fill="#FBE3D4"/>
      <circle cx="160" cy="176" r="8" fill="#E7A48E"/>
      <circle cx="157" cy="173" r="2" fill="#fff" opacity="0.7"/>
      ${eyes(136, 112, 48, 0.75)}
      ${smile(160, 132, 10)}`),
    hair: () => scene("hair", "#FFF5F8", "#F4D0DE", `
      <path d="M70 170 C70 70 110 36 160 36 C210 36 250 70 250 170 C230 130 200 150 160 120 C120 150 90 130 70 170Z" fill="#6B3A34"/>
      <circle cx="160" cy="176" r="58" fill="#F8D0B4"/>
      <path d="M108 150 C112 100 136 78 160 80 C186 78 210 102 214 150 C196 128 180 140 160 118 C140 140 122 128 108 150Z" fill="#6B3A34"/>
      ${gloss(142, 100, 20, 8)}
      ${eyes(140, 176, 40, 0.8)}
      ${smile(160, 200, 10)}
      <circle cx="250" cy="86" r="8" fill="#F2C14E"/>`),
    shoes: () => scene("shoes", "#FFF4F4", "#F8D0D0", `
      <g transform="translate(108 176) rotate(-8)">
        <ellipse cx="10" cy="28" rx="52" ry="16" fill="#C4474A"/>
        <path d="M-30 20 Q-10 -10 36 -6 Q58 0 48 22 Q10 10 -30 20Z" fill="#E25B5B"/>
        ${gloss(0, 4, 16, 6)}
      </g>
      <g transform="translate(214 190) rotate(10)">
        <ellipse cx="10" cy="28" rx="52" ry="16" fill="#C4474A"/>
        <path d="M-30 20 Q-10 -10 36 -6 Q58 0 48 22 Q10 10 -30 20Z" fill="#F07A78"/>
        ${gloss(0, 4, 16, 6)}
      </g>`),
    hat: () => scene("hat", "#FFF8EC", "#F8E0B4", `
      <ellipse cx="160" cy="214" rx="100" ry="22" fill="#F2C14E"/>
      <path d="M92 168 Q160 40 228 168 Z" fill="#F6D56A"/>
      <rect x="96" y="150" width="128" height="28" rx="10" fill="#E56B8A"/>
      ${gloss(140, 100, 20, 10)}
      <circle cx="160" cy="188" r="6" fill="#fff" opacity="0.7"/>`),
    cup: () => scene("cup", "#F4FBFF", "#D4ECF8", `
      <path d="M96 96 h128 l-14 120 a24 24 0 0 1 -24 20 h-52 a24 24 0 0 1 -24 -20 Z" fill="#7EB6FF"/>
      <path d="M112 120 h96 l-10 86 a16 16 0 0 1 -16 12 h-44 a16 16 0 0 1 -16 -12 Z" fill="#EAF6FF"/>
      <path d="M214 120 q36 8 28 40 q-8 28 -36 24" fill="none" stroke="#7EB6FF" stroke-width="12" stroke-linecap="round"/>
      ${gloss(124, 140, 12, 28)}`),
    spoon: () => scene("spoon", "#F8F6FF", "#E4DDF8", `
      <ellipse cx="128" cy="118" rx="46" ry="58" fill="#F7F4EF" stroke="#E0D8EE" stroke-width="4"/>
      <ellipse cx="128" cy="118" rx="30" ry="40" fill="#FFF"/>
      <rect x="156" y="150" width="28" height="110" rx="14" fill="#F7F4EF" transform="rotate(28 170 200)"/>
      ${gloss(112, 96, 14, 10)}`),
    car: () => scene("car", "#F3F8FF", "#D5E6FA", `
      <rect x="46" y="150" width="228" height="74" rx="30" fill="#5BA3E6"/>
      <path d="M96 150 L124 102 H198 L226 150 Z" fill="#8EC5F8"/>
      <path d="M132 146 L148 114 H176 L192 146 Z" fill="#F4FBFF"/>
      <circle cx="104" cy="226" r="26" fill="#2C2834"/>
      <circle cx="104" cy="226" r="12" fill="#E6EAF1"/>
      <circle cx="220" cy="226" r="26" fill="#2C2834"/>
      <circle cx="220" cy="226" r="12" fill="#E6EAF1"/>
      <circle cx="78" cy="178" r="7" fill="#FFE08A"/>
      <circle cx="246" cy="178" r="7" fill="#FFE08A"/>
      ${smile(160, 186, 16)}
      ${gloss(120, 124, 16, 8)}`),
    bed: () => scene("bed", "#F6F4FF", "#DDD6F8", `
      <rect x="48" y="150" width="224" height="90" rx="20" fill="#8E7CC3"/>
      <rect x="64" y="120" width="70" height="48" rx="16" fill="#FFF"/>
      <path d="M70 168 Q160 120 250 176 V220 H70 Z" fill="#F7C3D4"/>
      <rect x="40" y="138" width="22" height="110" rx="8" fill="#6E5AA8"/>
      <circle cx="230" cy="78" r="16" fill="#F6E7A8"/>
      <circle cx="252" cy="96" r="3" fill="#fff"/>
      <circle cx="214" cy="64" r="2.5" fill="#fff"/>`),
    bath: () => scene("bath", "#F3FBFF", "#D2EEF8", `
      <path d="M58 150 h204 v46 a36 36 0 0 1 -36 36 H94 a36 36 0 0 1 -36 -36 Z" fill="#F7FBFF" stroke="#B7D7EA" stroke-width="4"/>
      <ellipse cx="160" cy="162" rx="90" ry="22" fill="#B9E4FB"/>
      <circle cx="116" cy="150" r="14" fill="#fff" opacity="0.9"/>
      <circle cx="150" cy="140" r="18" fill="#fff" opacity="0.85"/>
      <circle cx="186" cy="152" r="12" fill="#fff" opacity="0.9"/>
      <circle cx="210" cy="138" r="10" fill="#fff" opacity="0.75"/>
      <ellipse cx="214" cy="176" rx="18" ry="12" fill="#F6D56A"/>
      <circle cx="206" cy="174" r="2" fill="#2c2834"/>
      <path d="M220 174 h10" stroke="#E09A3E" stroke-width="3" stroke-linecap="round"/>`),
    door: () => scene("door", "#FFF8EE", "#F4D7B4", `
      <rect x="96" y="48" width="128" height="220" rx="16" fill="#E7B56A"/>
      <rect x="108" y="64" width="104" height="188" rx="10" fill="#F3D099"/>
      <path d="M168 64 h44 v188 h-44" fill="#FFF6E4"/>
      <circle cx="176" cy="164" r="6" fill="#C9844A"/>
      ${gloss(132, 100, 14, 30)}`),
    cat: () => scene("cat", "#FFF5EE", "#F8D2C0", critter({
      body: "#F0A36A",
      belly: "#F8D7C4",
      ear: "pointy",
      earFill: "#E08A4E",
      inner: "#F6B7C0",
      tail: "long",
      snout: "short",
      nose: "#E56B8A",
      whiskers: `<path d="M112 166 h-28 M112 174 h-24 M208 166 h28 M208 174 h24" stroke="#2c2834" stroke-width="2" stroke-linecap="round"/>`,
    })),
    bird: () => scene("bird", "#F4FBFF", "#D0ECFA", `
      <path d="M40 230 Q120 200 280 214" fill="none" stroke="#C9844A" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="168" cy="168" rx="58" ry="42" fill="#5BA3E6"/>
      <circle cx="214" cy="132" r="32" fill="#7EB6FF"/>
      <path d="M120 160 Q70 140 96 120 Q110 160 140 156Z" fill="#3E86B8"/>
      <path d="M236 132 L268 140 L236 150 Z" fill="#F2B84B"/>
      ${eye(220, 126, 0.8)}
      ${blush(200, 142, 0.6)}
      <ellipse cx="150" cy="196" rx="10" ry="6" fill="#F2B84B"/>
      <ellipse cx="186" cy="198" rx="10" ry="6" fill="#E09A3E"/>`),
    cow: () => scene("cow", "#F6FBF6", "#D7F0DC", critter({
      body: "#F7F4EF",
      belly: "#F3D2DC",
      ear: "side",
      earFill: "#F7F4EF",
      inner: "#F6B7C0",
      snout: "short",
      nose: "#E56B8A",
      spots: [[120, 200, 14], [200, 186, 16], [150, 230, 10]],
      spot: "#2c2834",
      extra: `<path d="M118 86 q-6 -28 16 -20" fill="none" stroke="#E7C9A2" stroke-width="8" stroke-linecap="round"/>
        <path d="M202 86 q6 -28 -16 -20" fill="none" stroke="#E7C9A2" stroke-width="8" stroke-linecap="round"/>`,
    })),
    duck: () => scene("duck", "#FFFBEA", "#F8E7A8", critter({
      body: "#F6D56A",
      belly: "#FFF3C4",
      ear: "none",
      snout: "beak",
      beak: "#F2A03A",
      tail: "none",
    })),
    fish: () => scene("fish", "#F2FBFF", "#C5E7F8", `
      <ellipse cx="150" cy="164" rx="78" ry="48" fill="#F08AA4"/>
      <path d="M214 164 L268 124 L262 164 L268 204 Z" fill="#E56B8A"/>
      <path d="M120 130 Q150 100 168 128" fill="#F7B7C8"/>
      <ellipse cx="118" cy="164" rx="16" ry="22" fill="#fff" opacity="0.25"/>
      ${eye(112, 156, 1.1)}
      ${blush(130, 176, 0.7)}
      <circle cx="70" cy="120" r="8" fill="#fff" opacity="0.7"/>
      <circle cx="54" cy="150" r="5" fill="#fff" opacity="0.55"/>
      <circle cx="86" cy="96" r="4" fill="#fff" opacity="0.5"/>`),
    bunny: () => scene("bunny", "#FFF7F8", "#F8D5E0", critter({
      body: "#F7F4EF",
      belly: "#F8D7E0",
      ear: "tall",
      earFill: "#F7F4EF",
      inner: "#F6B7C8",
      tail: "puff",
      snout: "short",
      nose: "#E56B8A",
    })),
    pig: () => scene("pig", "#FFF3F6", "#F8D0DC", critter({
      body: "#F7B7C4",
      belly: "#FDE4EA",
      ear: "side",
      earFill: "#F4A6B4",
      inner: "#F8D0DC",
      tail: "pig",
      snout: "pig",
    })),
    horse: () => scene("horse", "#FFF6EC", "#F6D7B8", `
      <path d="M210 210 C250 180 246 250 200 236" fill="none" stroke="#C9844A" stroke-width="10" stroke-linecap="round"/>
      <ellipse cx="150" cy="214" rx="70" ry="46" fill="#E0A15A"/>
      <ellipse cx="150" cy="226" rx="40" ry="26" fill="#F3D2A4"/>
      <ellipse cx="176" cy="126" rx="48" ry="42" fill="#E7B56A"/>
      <path d="M150 96 C170 70 210 80 214 120 C190 100 170 112 156 130Z" fill="#8A5A32"/>
      <path d="M168 78 C190 60 214 78 206 108 C186 90 172 96 164 112Z" fill="#6B442C"/>
      ${eye(190, 118, 0.85)}
      <ellipse cx="214" cy="142" rx="16" ry="12" fill="#F3D2A4"/>
      <ellipse cx="220" cy="140" rx="5" ry="4" fill="#2c2834"/>
      ${blush(176, 140, 0.7)}`),
    sheep: () => scene("sheep", "#F6FBF7", "#D9F0DE", critter({
      body: "#F7F4EF",
      belly: "#F3D2A4",
      ear: "side",
      earFill: "#3d342c",
      inner: "#F6B7C0",
      wool: true,
      snout: "short",
      nose: "#2c2834",
      extra: `<ellipse cx="160" cy="146" rx="36" ry="28" fill="#F3D2A4"/>`,
    })),
    frog: () => scene("frog", "#F2FBF3", "#C9EBC8", `
      <ellipse cx="160" cy="196" rx="78" ry="48" fill="#7DCEA0"/>
      <ellipse cx="160" cy="206" rx="48" ry="28" fill="#D5F5E3"/>
      <circle cx="118" cy="132" r="28" fill="#7DCEA0"/>
      <circle cx="202" cy="132" r="28" fill="#7DCEA0"/>
      <circle cx="118" cy="132" r="14" fill="#fff"/>
      <circle cx="202" cy="132" r="14" fill="#fff"/>
      <circle cx="118" cy="134" r="7" fill="#2c2834"/>
      <circle cx="202" cy="134" r="7" fill="#2c2834"/>
      <circle cx="116" cy="131" r="2.4" fill="#fff"/>
      <circle cx="200" cy="131" r="2.4" fill="#fff"/>
      ${blush(104, 168, 0.8)}
      ${blush(216, 168, 0.8)}
      <path d="M132 186 Q160 210 188 186" fill="none" stroke="#2c2834" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="70" cy="210" rx="22" ry="12" fill="#63B888"/>
      <ellipse cx="250" cy="210" rx="22" ry="12" fill="#63B888"/>`),
    banana: () => scene("banana", "#FFFBEA", "#F8E7A0", `
      <path d="M96 210 C90 120 150 70 230 96 C200 110 176 150 176 214 C150 200 120 214 96 210Z" fill="#F6D56A"/>
      <path d="M108 196 C110 130 156 96 214 110 C196 124 176 160 170 200 C148 188 124 198 108 196Z" fill="#FFE9A0"/>
      ${gloss(150, 140, 16, 10)}
      ${eyes(132, 156, 28, 0.65)}
      ${smile(146, 176, 8)}
      <path d="M214 96 Q236 88 230 112" fill="#C9844A"/>`),
    apple: () => scene("apple", "#FFF4F4", "#F8CFCF", `
      <circle cx="150" cy="176" r="70" fill="#E25B5B"/>
      <circle cx="186" cy="168" r="58" fill="#F07070"/>
      <path d="M166 108 Q160 70 184 64" fill="none" stroke="#6B442C" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="196" cy="86" rx="16" ry="8" fill="#7DCEA0" transform="rotate(30 196 86)"/>
      ${gloss(124, 140, 16, 22)}
      ${eyes(140, 170, 40, 0.7)}
      ${smile(162, 196, 10)}`),
    cracker: () => scene("cracker", "#FFF8EC", "#F6E0B8", `
      <rect x="78" y="78" width="164" height="164" rx="28" fill="#F2C98A"/>
      <rect x="92" y="92" width="136" height="136" rx="18" fill="#F8DCA6"/>
      <circle cx="130" cy="130" r="6" fill="#E0B36A"/>
      <circle cx="160" cy="160" r="6" fill="#E0B36A"/>
      <circle cx="190" cy="130" r="6" fill="#E0B36A"/>
      <circle cx="130" cy="190" r="6" fill="#E0B36A"/>
      <circle cx="190" cy="190" r="6" fill="#E0B36A"/>
      <path d="M210 78 L242 110 L210 110 Z" fill="#E7B56A"/>
      ${gloss(120, 110, 20, 8)}`),
    cheese: () => scene("cheese", "#FFF9E8", "#F8E4A4", `
      <path d="M64 220 L160 70 L256 220 Z" fill="#F6D56A"/>
      <path d="M96 220 L160 112 L224 220 Z" fill="#FFE28A"/>
      <circle cx="150" cy="170" r="10" fill="#F2C14E"/>
      <circle cx="186" cy="196" r="8" fill="#F2C14E"/>
      <circle cx="160" cy="210" r="6" fill="#F2C14E"/>
      ${gloss(140, 130, 14, 8)}`),
    egg: () => scene("egg", "#FFFBF6", "#F8E6D4", `
      <ellipse cx="160" cy="176" rx="70" ry="88" fill="#FFF"/>
      <ellipse cx="160" cy="190" rx="48" ry="58" fill="#FFF6EA"/>
      ${gloss(132, 130, 18, 22)}
      ${eyes(140, 166, 40, 0.8)}
      ${blush(128, 188, 0.8)}
      ${blush(192, 188, 0.8)}
      ${smile(160, 198, 10)}`),
    cookie: () => scene("cookie", "#FFF6EC", "#F6D2B4", `
      <circle cx="160" cy="164" r="80" fill="#E0A15A"/>
      <circle cx="160" cy="164" r="68" fill="#E7B56A"/>
      <circle cx="130" cy="140" r="8" fill="#6B442C"/>
      <circle cx="176" cy="128" r="7" fill="#6B442C"/>
      <circle cx="196" cy="166" r="8" fill="#6B442C"/>
      <circle cx="150" cy="186" r="7" fill="#6B442C"/>
      <circle cx="118" cy="176" r="6" fill="#6B442C"/>
      ${gloss(124, 120, 20, 10)}
      ${eyes(140, 160, 40, 0.7)}
      ${smile(160, 186, 10)}`),
    eat: () => scene("eat", "#FFF6F0", "#F8D4C4", `
      <circle cx="150" cy="160" r="70" fill="#F8D0B4"/>
      ${eyes(124, 148, 48, 0.85)}
      ${blush(116, 176, 0.8)}
      <path d="M116 186 Q150 220 184 186 Q150 200 116 186Z" fill="#E57B84"/>
      ${mitten(236, 150, -40, "#F8D0B4", 0.7)}
      <ellipse cx="228" cy="132" rx="16" ry="22" fill="#F7F4EF" transform="rotate(20 228 132)"/>
      <rect x="220" y="120" width="10" height="46" rx="5" fill="#E7C9A2" transform="rotate(20 225 140)"/>
      <circle cx="214" cy="118" r="8" fill="#F6D56A"/>`),
    drink: () => scene("drink", "#F4FBFF", "#D4EEF8", `
      <path d="M118 150 h70 l-8 70 a16 16 0 0 1 -16 12 h-22 a16 16 0 0 1 -16 -12 Z" fill="#7EB6FF"/>
      <path d="M126 162 h54 l-6 52 h-42 Z" fill="#F4FBFF"/>
      <path d="M176 150 q28 -40 10 -70" fill="none" stroke="#E56B8A" stroke-width="8" stroke-linecap="round"/>
      <circle cx="210" cy="100" r="10" fill="#B9E4FB" opacity="0.9"/>
      <circle cx="230" cy="84" r="6" fill="#B9E4FB"/>
      ${gloss(136, 176, 8, 16)}`),
    night: () => scene("night", "#EEF0FA", "#C9C4E8", `
      <circle cx="210" cy="84" r="26" fill="#F6E7A8"/>
      <circle cx="222" cy="78" r="20" fill="#D9D4F2"/>
      <path d="M70 200 Q160 150 250 200 V250 H70 Z" fill="#6E5AA8"/>
      <path d="M86 188 Q150 150 230 196 V230 H86 Z" fill="#F7C3D4"/>
      <circle cx="126" cy="176" r="22" fill="#F8D0B4"/>
      ${eyes(116, 174, 18, 0.45)}
      <path d="M116 184 Q126 190 136 184" fill="none" stroke="#2c2834" stroke-width="2" stroke-linecap="round"/>
      <circle cx="70" cy="70" r="3" fill="#fff"/>
      <circle cx="108" cy="54" r="2" fill="#fff"/>
      <circle cx="150" cy="78" r="2.4" fill="#fff"/>`),
    clap: () => scene("clap", "#FFF8EE", "#F8D8B0", `
      ${mitten(118, 160, 20, "#F8D0B4", 1.2)}
      ${mitten(202, 160, -20, "#F8D0B4", 1.2)}
      <path d="M160 96 v18 M148 108 h24" stroke="#F2C14E" stroke-width="6" stroke-linecap="round"/>
      <path d="M96 120 l-16 -16 M224 120 l16 -16 M100 210 l-18 10 M220 210 l18 10" stroke="#F2C14E" stroke-width="6" stroke-linecap="round"/>`),
    walk: () => scene("walk", "#F6FBF6", "#D4EFD8", `
      <circle cx="168" cy="92" r="32" fill="#F8D0B4"/>
      ${eyes(156, 88, 24, 0.55)}
      ${smile(168, 104, 8)}
      <path d="M168 124 v62" stroke="#7EB0E8" stroke-width="16" stroke-linecap="round"/>
      <path d="M168 140 l-36 24" stroke="#F8D0B4" stroke-width="10" stroke-linecap="round"/>
      <path d="M168 146 l34 -8" stroke="#F8D0B4" stroke-width="10" stroke-linecap="round"/>
      <path d="M168 184 l-28 48" stroke="#3E6E8C" stroke-width="10" stroke-linecap="round"/>
      <path d="M168 184 l26 36" stroke="#3E6E8C" stroke-width="10" stroke-linecap="round"/>
      <ellipse cx="112" cy="248" rx="28" ry="10" fill="#5a4638" opacity="0.08"/>`),
    jump: () => scene("jump", "#F7F6FF", "#DDD6F8", `
      <ellipse cx="160" cy="262" rx="36" ry="8" fill="#5a4638" opacity="0.12"/>
      <circle cx="160" cy="118" r="32" fill="#F8D0B4"/>
      ${eyes(148, 114, 24, 0.55)}
      ${smile(160, 130, 8)}
      <path d="M160 150 v36" stroke="#F08AA4" stroke-width="16" stroke-linecap="round"/>
      <path d="M160 162 l-34 -10" stroke="#F8D0B4" stroke-width="10" stroke-linecap="round"/>
      <path d="M160 162 l34 -6" stroke="#F8D0B4" stroke-width="10" stroke-linecap="round"/>
      <path d="M160 186 l-30 28" stroke="#6E5AA8" stroke-width="10" stroke-linecap="round"/>
      <path d="M160 186 l30 28" stroke="#6E5AA8" stroke-width="10" stroke-linecap="round"/>
      <path d="M70 210 q20 -16 40 0 M210 210 q20 -16 40 0" fill="none" stroke="#C9B6F5" stroke-width="4" stroke-linecap="round"/>`),
    open: () => scene("open", "#FFF8EE", "#F8DCC0", `
      <rect x="70" y="150" width="180" height="100" rx="16" fill="#E7B56A"/>
      <path d="M78 150 h164 l-20 -70 H98 Z" fill="#F2C98A"/>
      <path d="M150 80 h70 l-16 70 h-70 Z" fill="#FFF6E4"/>
      <circle cx="160" cy="188" r="16" fill="#F6D56A"/>
      <path d="M160 176 l4 8 9 1 -6 6 2 9 -9 -5 -9 5 2 -9 -6 -6 9 -1z" fill="#fff"/>`),
    down: () => scene("down", "#F4F8FF", "#D5E4FA", `
      <circle cx="160" cy="120" r="36" fill="#7EB6FF"/>
      ${gloss(146, 106, 12, 8)}
      <path d="M160 168 v40" stroke="#5BA3E6" stroke-width="8" stroke-linecap="round"/>
      <path d="M160 208 l-16 -18 h32 z" fill="#5BA3E6"/>
      <ellipse cx="160" cy="248" rx="50" ry="12" fill="#C9D8EA"/>`),
    wash: () => scene("wash", "#F3FBFF", "#D0ECF8", `
      <rect x="138" y="40" width="18" height="70" rx="8" fill="#C5D4E0"/>
      <path d="M147 108 q-8 20 0 36 q8 -16 0 -36" fill="#7EC8F2"/>
      ${mitten(110, 190, 10, "#F8D0B4", 1)}
      ${mitten(206, 190, -8, "#F8D0B4", 1)}
      <circle cx="150" cy="176" r="10" fill="#fff" opacity="0.85"/>
      <circle cx="176" cy="164" r="14" fill="#fff" opacity="0.8"/>
      <circle cx="196" cy="188" r="8" fill="#fff" opacity="0.75"/>`),
    dance: () => scene("dance", "#F8F4FF", "#E4D6F8", `
      <circle cx="160" cy="96" r="30" fill="#F8D0B4"/>
      ${eyes(148, 92, 24, 0.55)}
      ${smile(160, 108, 8)}
      <path d="M160 126 l-10 70" stroke="#C084D8" stroke-width="16" stroke-linecap="round"/>
      <path d="M156 146 l-40 -20" stroke="#F8D0B4" stroke-width="10" stroke-linecap="round"/>
      <path d="M156 150 l36 -28" stroke="#F8D0B4" stroke-width="10" stroke-linecap="round"/>
      <path d="M150 194 l-24 46" stroke="#8E7CC3" stroke-width="10" stroke-linecap="round"/>
      <path d="M152 194 l20 28" stroke="#8E7CC3" stroke-width="10" stroke-linecap="round"/>
      <circle cx="70" cy="80" r="8" fill="#F6D56A"/>
      <circle cx="250" cy="110" r="6" fill="#F08AA4"/>
      <path d="M236 64 q10 10 0 18" fill="none" stroke="#7EB0E8" stroke-width="4" stroke-linecap="round"/>`),
    please: () => scene("please", "#FFF5F8", "#F8D0E0", `
      ${mitten(124, 176, 24, "#F8D0B4", 1.15)}
      ${mitten(196, 176, -24, "#F8D0B4", 1.15)}
      <circle cx="160" cy="92" r="10" fill="#F08AA4"/>
      <circle cx="148" cy="108" r="7" fill="#F2C14E"/>
      <circle cx="174" cy="106" r="6" fill="#7DCEA0"/>`),
    thanks: () => scene("thanks", "#FFF6F4", "#F8D4CC", `
      <path d="M160 210 C120 170 90 150 110 120 C124 100 150 112 160 132 C170 112 196 100 210 120 C230 150 200 170 160 210Z" fill="#E56B8A"/>
      ${gloss(136, 136, 14, 10)}
      ${mitten(96, 168, -20, "#F8D0B4", 0.85)}
      ${mitten(224, 168, 20, "#F8D0B4", 0.85)}`),
    hug: () => scene("hug", "#FFF4F7", "#F7C9D8", `
      <circle cx="122" cy="132" r="40" fill="#F8D0B4"/>
      <circle cx="198" cy="140" r="32" fill="#F3C2A4"/>
      ${eyes(108, 128, 26, 0.6)}
      ${eyes(186, 136, 20, 0.5)}
      ${smile(122, 148, 8)}
      ${smile(198, 154, 7)}
      <path d="M86 176 Q122 230 160 210 Q198 236 236 180" fill="#F08AA4"/>
      <path d="M150 176 Q168 210 196 190" fill="#7EB0E8"/>
      ${blush(100, 146, 0.6)}
      ${blush(214, 154, 0.55)}`),
    love: () => scene("love", "#FFF3F7", "#F8C9DA", `
      <path d="M160 250 C80 190 48 140 84 104 C110 78 146 96 160 124 C174 96 210 78 236 104 C272 140 240 190 160 250Z" fill="#E56B8A"/>
      ${gloss(112, 120, 22, 14)}
      ${eyes(130, 150, 60, 0.85)}
      ${smile(160, 180, 12)}
      ${blush(112, 168, 0.7)}
      ${blush(208, 168, 0.7)}`),
    mine: () => scene("mine", "#FFF6F2", "#F6D5C8", `
      <circle cx="150" cy="150" r="48" fill="#F8D0B4"/>
      ${eyes(132, 146, 36, 0.75)}
      ${smile(150, 170, 10)}
      <ellipse cx="214" cy="176" rx="40" ry="32" fill="#C9844A"/>
      <circle cx="232" cy="156" r="18" fill="#E0A15A"/>
      ${eye(238, 152, 0.45)}
      <ellipse cx="248" cy="164" rx="8" ry="6" fill="#F3D2A4"/>
      <path d="M120 190 Q150 230 210 200" fill="#8EC5F0"/>`),
    peekaboo: () => scene("peekaboo", "#F7F6FF", "#E0D8F8", `
      <circle cx="160" cy="170" r="72" fill="#F8D0B4"/>
      ${smile(160, 200, 14)}
      ${blush(112, 186, 1)}
      ${blush(208, 186, 1)}
      ${mitten(104, 130, 8, "#F8D0B4", 1.05)}
      ${mitten(214, 130, -8, "#F8D0B4", 1.05)}
      ${eye(160, 150, 0.9)}`),
    big: () => scene("big", "#FFF8EA", "#F8E1B0", `
      <circle cx="168" cy="168" r="86" fill="#F2C14E"/>
      ${gloss(136, 120, 24, 14)}
      ${face(168, 162, 1.05)}
      <circle cx="62" cy="78" r="18" fill="#F6D56A" opacity="0.9"/>`),
    little: () => scene("little", "#F6FBF8", "#D7F0E0", `
      <circle cx="160" cy="160" r="100" fill="#fff" opacity="0.28"/>
      <ellipse cx="160" cy="176" rx="28" ry="18" fill="#E25B5B"/>
      <circle cx="148" cy="168" r="12" fill="#2c2834"/>
      <circle cx="174" cy="166" r="10" fill="#2c2834"/>
      <circle cx="146" cy="166" r="3" fill="#fff"/>
      <circle cx="160" cy="176" r="4" fill="#2c2834"/>
      <path d="M156 150 q6 -16 14 0" stroke="#2c2834" stroke-width="3" fill="none"/>
      ${blush(160, 186, 0.5)}`),
    hot: () => scene("hot", "#FFF4EE", "#F8CFC0", `
      <path d="M108 140 h104 l-10 90 a20 20 0 0 1 -20 16 h-44 a20 20 0 0 1 -20 -16 Z" fill="#E25B5B"/>
      <ellipse cx="160" cy="140" rx="52" ry="16" fill="#F07070"/>
      <ellipse cx="160" cy="140" rx="36" ry="8" fill="#F6D56A"/>
      <path d="M140 110 q8 -20 0 -32" fill="none" stroke="#F2C14E" stroke-width="6" stroke-linecap="round"/>
      <path d="M160 104 q10 -24 0 -40" fill="none" stroke="#F6D56A" stroke-width="6" stroke-linecap="round"/>
      <path d="M180 110 q8 -18 0 -30" fill="none" stroke="#F2C14E" stroke-width="6" stroke-linecap="round"/>
      ${gloss(132, 170, 10, 20)}`),
    wet: () => scene("wet", "#F3FBFF", "#CDE8F8", `
      <path d="M160 40 C160 40 78 150 78 196 a82 82 0 0 0 164 0 C242 150 160 40 160 40Z" fill="#7EC8F2"/>
      ${gloss(124, 150, 18, 32)}
      ${face(160, 186, 0.85)}
      <ellipse cx="160" cy="286" rx="70" ry="8" fill="#9FD4F2" opacity="0.7"/>`),
    red: () => scene("red", "#FFF3F3", "#F8D0D0", `
      <circle cx="160" cy="168" r="78" fill="#E25B5B"/>
      ${gloss(128, 128, 24, 16)}
      ${face(160, 168, 0.95)}`),
    blue: () => scene("blue", "#F3F8FF", "#D0E4FA", `
      <ellipse cx="160" cy="176" rx="52" ry="36" fill="#3E86B8"/>
      <circle cx="206" cy="146" r="28" fill="#5BA3E6"/>
      <path d="M112 168 Q70 150 92 132 Q108 166 130 160Z" fill="#2F6E9A"/>
      <path d="M226 146 L258 154 L226 164Z" fill="#F2B84B"/>
      ${eye(214, 142, 0.75)}
      <ellipse cx="150" cy="206" rx="10" ry="6" fill="#F2B84B"/>`),
    yellow: () => scene("yellow", "#FFFBE8", "#F8E7A0", `
      <path d="M160 70 L176 126 L236 130 L190 168 L206 226 L160 190 L114 226 L130 168 L84 130 L144 126 Z" fill="#F6D56A"/>
      ${face(160, 156, 0.72)}
      ${gloss(148, 118, 12, 8)}`),
    one: () => scene("one", "#FFF8EE", "#F8DCC4", `
      <ellipse cx="160" cy="230" rx="28" ry="10" fill="#E7A0A8" opacity="0.35"/>
      <ellipse cx="160" cy="150" rx="46" ry="62" fill="#F07070"/>
      <path d="M160 92 Q156 70 176 66" fill="none" stroke="#6B442C" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="186" cy="78" rx="12" ry="6" fill="#7DCEA0" transform="rotate(28 186 78)"/>
      ${gloss(140, 124, 12, 16)}`),
    two: () => scene("two", "#FFF6F4", "#F7D5D4", `
      <g transform="translate(104 176)">
        <ellipse cx="8" cy="30" rx="48" ry="14" fill="#C4474A"/>
        <path d="M-28 18 Q-8 -8 30 -4 Q52 2 42 20 Q8 8 -28 18Z" fill="#E25B5B"/>
      </g>
      <g transform="translate(206 188)">
        <ellipse cx="8" cy="30" rx="48" ry="14" fill="#C4474A"/>
        <path d="M-28 18 Q-8 -8 30 -4 Q52 2 42 20 Q8 8 -28 18Z" fill="#F08A88"/>
      </g>`),
    three: () => scene("three", "#F6F7FF", "#D9E0FA", `
      <circle cx="78" cy="168" r="36" fill="#E25B5B"/>
      <circle cx="160" cy="168" r="36" fill="#F2C14E"/>
      <circle cx="242" cy="168" r="36" fill="#5BA3E6"/>
      ${gloss(66, 154, 10, 6)}
      ${gloss(148, 154, 10, 6)}
      ${gloss(230, 154, 10, 6)}`),
    sun: () => scene("sun", "#FFF9E6", "#FFE3A0", `
      ${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        const x1 = 160 + Math.cos(r) * 78;
        const y1 = 160 + Math.sin(r) * 78;
        const x2 = 160 + Math.cos(r) * 112;
        const y2 = 160 + Math.sin(r) * 112;
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#F6D56A" stroke-width="10" stroke-linecap="round"/>`;
      }).join("")}
      <circle cx="160" cy="160" r="64" fill="#F6D56A"/>
      ${gloss(136, 132, 20, 12)}
      ${face(160, 160, 0.9)}`),
    moon: () => scene("moon", "#EEF1FB", "#D5D8F2", `
      <circle cx="150" cy="160" r="78" fill="#F6E7A8"/>
      <circle cx="186" cy="140" r="64" fill="#D9DCF4"/>
      ${eyes(112, 156, 36, 0.75)}
      ${blush(108, 180, 0.7)}
      ${smile(128, 186, 10)}
      <circle cx="250" cy="70" r="3" fill="#fff"/>
      <circle cx="236" cy="98" r="2" fill="#fff"/>
      <circle cx="268" cy="110" r="2.5" fill="#fff"/>`),
    star: () => scene("star", "#F7F5FF", "#E0D8F8", `
      <path d="M160 48 L184 118 L258 122 L200 170 L220 244 L160 202 L100 244 L120 170 L62 122 L136 118 Z" fill="#F6D56A"/>
      ${gloss(150, 100, 16, 10)}
      ${face(160, 156, 0.78)}`),
    rain: () => scene("rain", "#F4F8FB", "#D5E4EE", `
      <ellipse cx="118" cy="120" rx="46" ry="34" fill="#fff"/>
      <ellipse cx="170" cy="108" rx="54" ry="40" fill="#fff"/>
      <ellipse cx="214" cy="126" rx="36" ry="28" fill="#F7FBFF"/>
      <ellipse cx="164" cy="140" rx="78" ry="26" fill="#F4F7FB"/>
      ${eyes(146, 112, 36, 0.65)}
      ${smile(164, 132, 10)}
      <ellipse cx="112" cy="200" rx="7" ry="14" fill="#7EC8F2"/>
      <ellipse cx="150" cy="220" rx="7" ry="14" fill="#5BA3E6"/>
      <ellipse cx="188" cy="198" rx="7" ry="14" fill="#7EC8F2"/>
      <ellipse cx="220" cy="218" rx="6" ry="12" fill="#8EC5F8"/>`),
    circle: () => scene("circle", "#F6F7FF", "#DDE3FA", `
      <circle cx="160" cy="160" r="86" fill="none" stroke="#7EB0E8" stroke-width="28"/>
      <circle cx="160" cy="160" r="86" fill="none" stroke="#fff" stroke-width="8" opacity="0.35"/>
      ${face(160, 160, 0.85)}`),
    flower: () => scene("flower", "#F6FBF6", "#D4F0DC", `
      ${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="160" cy="112" rx="22" ry="36" fill="#F08AA4" transform="rotate(${a} 160 156)"/>`).join("")}
      <circle cx="160" cy="156" r="28" fill="#F6D56A"/>
      ${face(160, 156, 0.45)}
      <rect x="152" y="196" width="16" height="70" rx="8" fill="#7DCEA0"/>
      <ellipse cx="132" cy="230" rx="18" ry="10" fill="#63B888" transform="rotate(-30 132 230)"/>
      <ellipse cx="196" cy="236" rx="18" ry="10" fill="#63B888" transform="rotate(30 196 236)"/>`),
  };

  function fallback() {
    return scene("fallback", "#FFF8EE", "#F8E1B8", `
      <path d="M160 70 L176 126 L236 130 L190 168 L206 226 L160 190 L114 226 L130 168 L84 130 L144 126 Z" fill="#F6D56A"/>
      ${face(160, 156, 0.7)}`);
  }

  function svg(id) {
    const draw = PICTURES[id];
    return draw ? draw() : fallback();
  }

  function add(extra) {
    Object.assign(PICTURES, extra);
  }

  return { svg, ids: () => Object.keys(PICTURES), add };
})();
