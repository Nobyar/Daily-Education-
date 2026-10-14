/* High-contrast pictures for Vera. Black ground, white, red, and yellow shapes. */

(function () {
  function frame(inner) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320" aria-hidden="true"><rect width="320" height="320" rx="36" fill="#0a0a0a"/>${inner}</svg>`;
  }

  function eyes(y) {
    return `<circle cx="124" cy="${y}" r="14" fill="#0a0a0a"/><circle cx="196" cy="${y}" r="14" fill="#0a0a0a"/><circle cx="128" cy="${y - 4}" r="4" fill="#fff"/><circle cx="200" cy="${y - 4}" r="4" fill="#fff"/>`;
  }

  function face(lip) {
    return frame(`
      <circle cx="160" cy="156" r="108" fill="#fff"/>
      ${eyes(148)}
      <path d="M118 190 Q160 230 202 190" fill="none" stroke="${lip}" stroke-width="10" stroke-linecap="round"/>
    `);
  }

  const pictures = {
    "v-mama": () => face("#ff2a2a"),
    "v-dada": () => frame(`
      <circle cx="160" cy="162" r="104" fill="#fff"/>
      <path d="M70 150 Q160 40 250 150 Q230 90 160 86 Q90 90 70 150Z" fill="#0a0a0a"/>
      ${eyes(168)}
      <path d="M124 206 Q160 232 196 206" fill="none" stroke="#ff2a2a" stroke-width="8" stroke-linecap="round"/>
    `),
    "v-hi": () => frame(`
      <circle cx="150" cy="176" r="78" fill="#fff"/>
      <circle cx="128" cy="168" r="10" fill="#0a0a0a"/>
      <circle cx="168" cy="168" r="10" fill="#0a0a0a"/>
      <path d="M128 198 Q150 214 172 198" fill="none" stroke="#ff2a2a" stroke-width="7" stroke-linecap="round"/>
      <path d="M214 70 C250 50 286 90 262 130" fill="none" stroke="#ffe14a" stroke-width="16" stroke-linecap="round"/>
      <circle cx="214" cy="78" r="16" fill="#ffe14a"/>
    `),
    "v-ball": () => frame(`
      <circle cx="160" cy="160" r="100" fill="#ff2a2a"/>
      <path d="M160 60 v200 M60 160 h200" fill="none" stroke="#fff" stroke-width="8"/>
      <path d="M92 92 Q160 150 92 228 M228 92 Q160 150 228 228" fill="none" stroke="#fff" stroke-width="8"/>
      <circle cx="128" cy="128" r="16" fill="#fff" opacity="0.85"/>
    `),
    "v-peek": () => frame(`
      <circle cx="160" cy="176" r="90" fill="#fff"/>
      <path d="M60 120 H260 L240 70 H80 Z" fill="#ffe14a"/>
      <circle cx="128" cy="186" r="12" fill="#0a0a0a"/>
      <circle cx="192" cy="186" r="12" fill="#0a0a0a"/>
      <path d="M70 150 H130 M190 150 H250" stroke="#0a0a0a" stroke-width="14" stroke-linecap="round"/>
    `),
    "v-pat": () => frame(`
      <circle cx="110" cy="170" r="58" fill="#fff"/>
      <circle cx="210" cy="170" r="58" fill="#ffe14a"/>
      <rect x="78" y="168" width="164" height="22" rx="11" fill="#ff2a2a"/>
    `),
    "v-bye": () => frame(`
      <circle cx="168" cy="196" r="70" fill="#fff"/>
      <rect x="150" y="150" width="28" height="90" rx="14" fill="#fff"/>
      <path d="M70 80 C120 40 150 120 118 160" fill="none" stroke="#ffe14a" stroke-width="18" stroke-linecap="round"/>
      <circle cx="78" cy="74" r="18" fill="#ff2a2a"/>
    `),
    "v-more": () => frame(`
      <circle cx="90" cy="160" r="36" fill="#fff"/>
      <circle cx="160" cy="160" r="36" fill="#ffe14a"/>
      <circle cx="230" cy="160" r="36" fill="#ff2a2a"/>
    `),
    "v-milk": () => frame(`
      <rect x="118" y="78" width="84" height="150" rx="28" fill="#fff"/>
      <rect x="138" y="48" width="44" height="40" rx="12" fill="#ffe14a"/>
      <rect x="132" y="130" width="56" height="70" rx="10" fill="#ff2a2a"/>
    `),
    "v-up": () => frame(`
      <path d="M160 48 L230 150 H196 V250 H124 V150 H90 Z" fill="#ffe14a"/>
      <circle cx="160" cy="196" r="18" fill="#0a0a0a"/>
    `),
    "v-dog": () => frame(`
      <ellipse cx="160" cy="180" rx="90" ry="70" fill="#fff"/>
      <circle cx="86" cy="110" r="28" fill="#fff"/>
      <circle cx="234" cy="110" r="28" fill="#fff"/>
      <circle cx="128" cy="168" r="10" fill="#0a0a0a"/>
      <circle cx="192" cy="168" r="10" fill="#0a0a0a"/>
      <ellipse cx="160" cy="196" rx="16" ry="12" fill="#0a0a0a"/>
      <path d="M160 208 v18" stroke="#ff2a2a" stroke-width="6" stroke-linecap="round"/>
    `),
    "v-cat": () => frame(`
      <circle cx="160" cy="176" r="84" fill="#fff"/>
      <path d="M86 130 L70 48 L140 110 Z" fill="#ffe14a"/>
      <path d="M234 130 L250 48 L180 110 Z" fill="#ffe14a"/>
      <circle cx="128" cy="170" r="10" fill="#0a0a0a"/>
      <circle cx="192" cy="170" r="10" fill="#0a0a0a"/>
      <path d="M160 184 L150 200 H170 Z" fill="#ff2a2a"/>
    `),
    "v-bird": () => frame(`
      <ellipse cx="150" cy="170" rx="70" ry="50" fill="#fff"/>
      <circle cx="196" cy="150" r="32" fill="#fff"/>
      <path d="M220 150 L270 136 L220 166 Z" fill="#ffe14a"/>
      <circle cx="206" cy="144" r="6" fill="#0a0a0a"/>
      <path d="M70 150 Q120 80 150 150" fill="none" stroke="#ff2a2a" stroke-width="10"/>
    `),
    "v-nose": () => frame(`
      <circle cx="160" cy="160" r="100" fill="#fff"/>
      <circle cx="118" cy="130" r="12" fill="#0a0a0a"/>
      <circle cx="202" cy="130" r="12" fill="#0a0a0a"/>
      <ellipse cx="160" cy="176" rx="22" ry="16" fill="#ff2a2a"/>
    `),
    "v-eyes": () => frame(`
      <ellipse cx="100" cy="160" rx="52" ry="36" fill="#fff"/>
      <ellipse cx="220" cy="160" rx="52" ry="36" fill="#fff"/>
      <circle cx="108" cy="160" r="16" fill="#0a0a0a"/>
      <circle cx="228" cy="160" r="16" fill="#0a0a0a"/>
      <circle cx="114" cy="154" r="5" fill="#ffe14a"/>
      <circle cx="234" cy="154" r="5" fill="#ffe14a"/>
    `),
    "v-mouth": () => frame(`
      <ellipse cx="160" cy="170" rx="100" ry="70" fill="#ff2a2a"/>
      <ellipse cx="160" cy="176" rx="64" ry="36" fill="#0a0a0a"/>
      <rect x="108" y="78" width="104" height="28" rx="10" fill="#fff"/>
    `),
    "v-hands": () => frame(`
      <circle cx="108" cy="168" r="62" fill="#fff"/>
      <circle cx="212" cy="168" r="62" fill="#fff"/>
      <circle cx="108" cy="110" r="16" fill="#ffe14a"/>
      <circle cx="212" cy="110" r="16" fill="#ffe14a"/>
      <circle cx="160" cy="150" r="14" fill="#ff2a2a"/>
    `),
    "v-feet": () => frame(`
      <ellipse cx="110" cy="180" rx="62" ry="40" fill="#fff"/>
      <ellipse cx="214" cy="180" rx="62" ry="40" fill="#fff"/>
      <circle cx="78" cy="156" r="12" fill="#ffe14a"/>
      <circle cx="108" cy="146" r="12" fill="#ffe14a"/>
      <circle cx="182" cy="146" r="12" fill="#ffe14a"/>
      <circle cx="212" cy="156" r="12" fill="#ffe14a"/>
    `),
    "v-tummy": () => frame(`
      <circle cx="160" cy="170" r="100" fill="#fff"/>
      <circle cx="160" cy="176" r="28" fill="#ff2a2a"/>
    `),
    "v-baby": () => frame(`
      <circle cx="160" cy="118" r="48" fill="#fff"/>
      <circle cx="144" cy="112" r="6" fill="#0a0a0a"/>
      <circle cx="176" cy="112" r="6" fill="#0a0a0a"/>
      <path d="M146 132 Q160 146 174 132" fill="none" stroke="#ff2a2a" stroke-width="5" stroke-linecap="round"/>
      <rect x="118" y="168" width="84" height="90" rx="36" fill="#ffe14a"/>
    `),
    "v-book": () => frame(`
      <path d="M70 78 H160 V250 H70 Q48 250 48 220 V108 Q48 78 70 78Z" fill="#fff"/>
      <path d="M250 78 H160 V250 H250 Q272 250 272 220 V108 Q272 78 250 78Z" fill="#ffe14a"/>
      <rect x="154" y="78" width="12" height="172" fill="#ff2a2a"/>
    `),
    "v-cup": () => frame(`
      <path d="M90 90 H210 L196 230 H110 Z" fill="#fff"/>
      <path d="M210 110 H250 Q270 150 220 170" fill="none" stroke="#ffe14a" stroke-width="16"/>
      <ellipse cx="150" cy="90" rx="60" ry="16" fill="#ff2a2a"/>
    `),
    "v-bath": () => frame(`
      <path d="M50 150 H270 V210 Q270 260 210 260 H110 Q50 260 50 210 Z" fill="#fff"/>
      <circle cx="110" cy="120" r="22" fill="#ffe14a"/>
      <circle cx="168" cy="96" r="16" fill="#fff"/>
      <circle cx="214" cy="118" r="12" fill="#ff2a2a"/>
    `),
    "v-bed": () => frame(`
      <rect x="48" y="150" width="224" height="80" rx="16" fill="#fff"/>
      <rect x="64" y="110" width="70" height="50" rx="12" fill="#ffe14a"/>
      <rect x="48" y="220" width="16" height="40" fill="#ff2a2a"/>
      <rect x="256" y="220" width="16" height="40" fill="#ff2a2a"/>
    `),
    "v-car": () => frame(`
      <rect x="46" y="150" width="228" height="60" rx="18" fill="#ff2a2a"/>
      <path d="M90 150 L120 100 H210 L236 150 Z" fill="#fff"/>
      <circle cx="100" cy="214" r="24" fill="#ffe14a"/>
      <circle cx="220" cy="214" r="24" fill="#ffe14a"/>
      <circle cx="100" cy="214" r="10" fill="#0a0a0a"/>
      <circle cx="220" cy="214" r="10" fill="#0a0a0a"/>
    `),
    "v-hat": () => frame(`
      <ellipse cx="160" cy="210" rx="110" ry="24" fill="#fff"/>
      <rect x="96" y="90" width="128" height="110" rx="50" fill="#ffe14a"/>
      <rect x="96" y="160" width="128" height="24" fill="#ff2a2a"/>
    `),
    "v-shoes": () => frame(`
      <path d="M40 180 H150 Q190 180 190 210 V230 H40 Z" fill="#fff"/>
      <path d="M150 180 H270 Q290 180 286 214 V230 H150 Z" fill="#ffe14a"/>
      <rect x="150" y="150" width="28" height="40" fill="#ff2a2a"/>
    `),
    "v-duck": () => frame(`
      <ellipse cx="150" cy="190" rx="80" ry="52" fill="#ffe14a"/>
      <circle cx="214" cy="150" r="36" fill="#ffe14a"/>
      <path d="M240 150 L290 140 L242 168 Z" fill="#ff2a2a"/>
      <circle cx="226" cy="142" r="6" fill="#0a0a0a"/>
    `),
    "v-cow": () => frame(`
      <ellipse cx="160" cy="186" rx="100" ry="70" fill="#fff"/>
      <circle cx="90" cy="120" r="22" fill="#fff"/>
      <path d="M70 100 L84 60 L110 108 Z" fill="#ff2a2a"/>
      <path d="M250 100 L236 60 L210 108 Z" fill="#ff2a2a"/>
      <circle cx="130" cy="176" r="10" fill="#0a0a0a"/>
      <circle cx="190" cy="176" r="10" fill="#0a0a0a"/>
      <ellipse cx="160" cy="204" rx="22" ry="14" fill="#ffe14a"/>
    `),
    "v-fish": () => frame(`
      <ellipse cx="150" cy="160" rx="90" ry="52" fill="#fff"/>
      <path d="M230 160 L290 110 V210 Z" fill="#ffe14a"/>
      <circle cx="110" cy="150" r="10" fill="#0a0a0a"/>
      <path d="M70 160 H110" stroke="#ff2a2a" stroke-width="8"/>
    `),
    "v-banana": () => frame(`
      <path d="M90 200 Q70 80 180 70 Q150 140 210 230 Q120 250 90 200Z" fill="#ffe14a"/>
      <path d="M96 190 Q110 120 168 96" fill="none" stroke="#0a0a0a" stroke-width="8"/>
    `),
    "v-apple": () => frame(`
      <circle cx="160" cy="176" r="90" fill="#ff2a2a"/>
      <rect x="150" y="62" width="12" height="40" rx="6" fill="#fff"/>
      <ellipse cx="188" cy="96" rx="24" ry="12" fill="#ffe14a"/>
    `),
    "v-clap": () => frame(`
      <circle cx="118" cy="160" r="50" fill="#fff"/>
      <circle cx="202" cy="160" r="50" fill="#fff"/>
      <path d="M150 110 L168 150 L150 190 L132 150 Z" fill="#ffe14a"/>
    `),
    "v-wave": () => frame(`
      <path d="M70 200 Q120 120 170 200 Q210 140 260 190" fill="none" stroke="#ffe14a" stroke-width="18" stroke-linecap="round"/>
      <circle cx="250" cy="100" r="36" fill="#fff"/>
      <circle cx="250" cy="94" r="6" fill="#0a0a0a"/>
    `),
    "v-hug": () => frame(`
      <circle cx="118" cy="150" r="48" fill="#fff"/>
      <circle cx="202" cy="150" r="48" fill="#ffe14a"/>
      <path d="M70 210 Q160 280 250 210" fill="none" stroke="#ff2a2a" stroke-width="18" stroke-linecap="round"/>
    `),
    "v-kiss": () => frame(`
      <path d="M160 70 C220 70 250 130 160 250 C70 130 100 70 160 70Z" fill="#ff2a2a"/>
      <circle cx="160" cy="130" r="16" fill="#fff"/>
    `),
    "v-bubbles": () => frame(`
      <circle cx="120" cy="180" r="48" fill="none" stroke="#fff" stroke-width="10"/>
      <circle cx="190" cy="140" r="36" fill="none" stroke="#ffe14a" stroke-width="10"/>
      <circle cx="210" cy="210" r="22" fill="none" stroke="#ff2a2a" stroke-width="8"/>
    `),
    "v-tickle": () => frame(`
      <circle cx="160" cy="170" r="70" fill="#fff"/>
      <path d="M70 90 L110 130 M250 90 L210 130 M90 70 L120 120 M230 70 L200 120" stroke="#ffe14a" stroke-width="8" stroke-linecap="round"/>
      <circle cx="136" cy="160" r="8" fill="#0a0a0a"/>
      <circle cx="184" cy="160" r="8" fill="#0a0a0a"/>
      <path d="M140 196 Q160 214 180 196" fill="none" stroke="#ff2a2a" stroke-width="6" stroke-linecap="round"/>
    `),
    "v-piggy": () => frame(`
      <circle cx="70" cy="180" r="22" fill="#fff"/>
      <circle cx="125" cy="160" r="22" fill="#ffe14a"/>
      <circle cx="180" cy="160" r="22" fill="#fff"/>
      <circle cx="235" cy="170" r="22" fill="#ffe14a"/>
      <circle cx="270" cy="210" r="28" fill="#ff2a2a"/>
    `),
    "v-twinkle": () => frame(`
      <path d="M160 40 L184 120 L268 128 L202 180 L224 264 L160 214 L96 264 L118 180 L52 128 L136 120 Z" fill="#ffe14a"/>
    `),
    "v-row": () => frame(`
      <path d="M40 200 Q160 120 280 200" fill="none" stroke="#fff" stroke-width="10"/>
      <path d="M70 190 L250 190 L220 230 H100 Z" fill="#ffe14a"/>
      <rect x="150" y="120" width="8" height="70" fill="#fff"/>
      <path d="M158 120 L210 150 L158 150 Z" fill="#ff2a2a"/>
    `),
    "v-spider": () => frame(`
      <circle cx="160" cy="150" r="28" fill="#fff"/>
      <circle cx="160" cy="196" r="36" fill="#fff"/>
      <path d="M120 140 L50 80 M130 160 L40 160 M120 190 L50 240 M200 140 L270 80 M190 160 L280 160 M200 190 L270 240 M140 120 L90 40 M180 120 L230 40" stroke="#ffe14a" stroke-width="8" stroke-linecap="round"/>
      <circle cx="150" cy="146" r="4" fill="#0a0a0a"/>
      <circle cx="170" cy="146" r="4" fill="#0a0a0a"/>
    `),
    "v-drum": () => frame(`
      <ellipse cx="160" cy="120" rx="90" ry="28" fill="#ffe14a"/>
      <path d="M70 120 V200 Q160 250 250 200 V120" fill="#ff2a2a"/>
      <ellipse cx="160" cy="120" rx="70" ry="16" fill="#fff"/>
      <rect x="210" y="70" width="10" height="90" transform="rotate(20 215 115)" fill="#fff"/>
    `),
    "v-bell": () => frame(`
      <path d="M160 50 V78" stroke="#ffe14a" stroke-width="10"/>
      <path d="M90 200 Q90 90 160 90 Q230 90 230 200 Z" fill="#ffe14a"/>
      <rect x="78" y="196" width="164" height="18" rx="8" fill="#fff"/>
      <circle cx="160" cy="230" r="14" fill="#ff2a2a"/>
    `),
    "v-light": () => frame(`
      <circle cx="160" cy="130" r="48" fill="#ffe14a"/>
      <path d="M160 40 V70 M70 90 L96 110 M250 90 L224 110 M60 160 H92 M228 160 H260" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
      <rect x="136" y="176" width="48" height="50" rx="8" fill="#fff"/>
    `),
    "v-moon": () => frame(`
      <circle cx="150" cy="160" r="90" fill="#fff"/>
      <circle cx="190" cy="140" r="70" fill="#0a0a0a"/>
    `),
    "v-red": () => frame(`<rect x="70" y="70" width="180" height="180" rx="24" fill="#ff2a2a"/>`),
    "v-yellow": () => frame(`<circle cx="160" cy="160" r="100" fill="#ffe14a"/>`),
    "v-stripes": () => frame(`
      <rect x="50" y="48" width="220" height="28" fill="#fff"/>
      <rect x="50" y="90" width="220" height="28" fill="#fff"/>
      <rect x="50" y="132" width="220" height="28" fill="#fff"/>
      <rect x="50" y="174" width="220" height="28" fill="#fff"/>
      <rect x="50" y="216" width="220" height="28" fill="#fff"/>
    `),
    "v-circle": () => frame(`<circle cx="160" cy="160" r="100" fill="none" stroke="#fff" stroke-width="28"/>`),
    "v-star": () => frame(`
      <path d="M160 48 L186 124 L266 128 L204 176 L226 256 L160 210 L94 256 L116 176 L54 128 L134 124 Z" fill="#fff"/>
    `),
    "v-sun": () => frame(`
      <circle cx="160" cy="160" r="58" fill="#ffe14a"/>
      <g stroke="#fff" stroke-width="12" stroke-linecap="round">
        <path d="M160 36 V70 M160 250 V284 M36 160 H70 M250 160 H284 M72 72 L96 96 M224 224 L248 248 M248 72 L224 96 M96 224 L72 248"/>
      </g>
    `),
    "v-rain": () => frame(`
      <path d="M70 150 Q70 80 140 90 Q150 50 200 80 Q260 70 250 140 Z" fill="#fff"/>
      <path d="M110 190 L96 240 M160 190 L146 250 M210 190 L196 240" stroke="#ffe14a" stroke-width="10" stroke-linecap="round"/>
    `),
    "v-big": () => frame(`<circle cx="160" cy="160" r="120" fill="#fff"/>`),
    "v-little": () => frame(`<circle cx="160" cy="160" r="28" fill="#ffe14a"/>`),
    "v-water": () => frame(`
      <path d="M160 40 C220 130 250 160 160 260 C70 160 100 130 160 40Z" fill="#fff"/>
      <circle cx="140" cy="150" r="12" fill="#0a0a0a"/>
    `),
    "v-door": () => frame(`
      <rect x="96" y="40" width="128" height="240" rx="8" fill="#fff"/>
      <circle cx="196" cy="160" r="10" fill="#ff2a2a"/>
      <rect x="116" y="70" width="40" height="50" fill="#ffe14a"/>
    `),
    "v-spoon": () => frame(`
      <ellipse cx="160" cy="90" rx="46" ry="36" fill="#fff"/>
      <rect x="148" y="110" width="24" height="140" rx="12" fill="#ffe14a"/>
    `),
    "v-bunny": () => frame(`
      <ellipse cx="118" cy="90" rx="22" ry="60" fill="#fff"/>
      <ellipse cx="202" cy="90" rx="22" ry="60" fill="#fff"/>
      <ellipse cx="118" cy="90" rx="10" ry="40" fill="#ff2a2a"/>
      <ellipse cx="202" cy="90" rx="10" ry="40" fill="#ff2a2a"/>
      <circle cx="160" cy="190" r="70" fill="#fff"/>
      <circle cx="136" cy="180" r="8" fill="#0a0a0a"/>
      <circle cx="184" cy="180" r="8" fill="#0a0a0a"/>
      <ellipse cx="160" cy="202" rx="10" ry="8" fill="#ffe14a"/>
    `),
    "v-one": () => frame(`
      <rect x="142" y="60" width="36" height="180" rx="16" fill="#fff"/>
      <circle cx="160" cy="250" r="8" fill="#ffe14a"/>
    `),
    "v-yes": () => frame(`
      <circle cx="160" cy="160" r="100" fill="#fff"/>
      ${eyes(150)}
      <path d="M110 190 Q160 240 210 190" fill="none" stroke="#ff2a2a" stroke-width="12" stroke-linecap="round"/>
    `),
    "v-alldone": () => frame(`
      <circle cx="160" cy="160" r="100" fill="#fff"/>
      <path d="M100 160 H220" stroke="#ff2a2a" stroke-width="16" stroke-linecap="round"/>
    `),
    "v-love": () => frame(`
      <path d="M160 250 C40 170 50 80 110 80 C140 80 160 110 160 110 C160 110 180 80 210 80 C270 80 280 170 160 250Z" fill="#ff2a2a"/>
    `),
  };

  const extra = {};
  Object.keys(pictures).forEach((id) => {
    extra[id] = pictures[id];
  });
  CynthiaArt.add(extra);
})();
