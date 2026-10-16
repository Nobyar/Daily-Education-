/* Pictures for Noah's Russian words. Original SVG, nothing from the network. */

(function () {
  function frame(id, c0, c1, inner) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320" aria-hidden="true">
      <defs>
        <linearGradient id="${id}-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${c0}"/>
          <stop offset="100%" stop-color="${c1}"/>
        </linearGradient>
      </defs>
      <rect width="320" height="320" rx="44" fill="url(#${id}-bg)"/>
      ${inner}
    </svg>`;
  }

  function eyes(x, y) {
    return `<circle cx="${x}" cy="${y}" r="5" fill="#2c2834"/><circle cx="${x + 28}" cy="${y}" r="5" fill="#2c2834"/>`;
  }

  const pictures = {
    "ru-privet": () => frame("ru-privet", "#E7F6FF", "#C9E4F8", `
      <circle cx="150" cy="170" r="70" fill="#F8D0B4"/>
      ${eyes(132, 160)}
      <path d="M128 190 Q150 210 176 188" fill="none" stroke="#C0392B" stroke-width="6" stroke-linecap="round"/>
      <path d="M210 90 C250 70 270 120 236 150" fill="none" stroke="#F6D56A" stroke-width="14" stroke-linecap="round"/>
      <circle cx="214" cy="96" r="14" fill="#F6D56A"/>`),
    "ru-hello": () => frame("ru-hello", "#EEF3FB", "#D5E0F4", `
      <rect x="70" y="150" width="180" height="110" rx="8" fill="#C47A3A"/>
      <path d="M70 150 H250 L160 70 Z" fill="#8B3A3A"/>
      <rect x="138" y="190" width="44" height="70" rx="6" fill="#F6D56A"/>
      <circle cx="168" cy="226" r="4" fill="#2c2834"/>`),
    "ru-bye": () => frame("ru-bye", "#F8EFE6", "#F0D5C4", `
      <circle cx="170" cy="180" r="64" fill="#F8D0B4"/>
      ${eyes(154, 170)}
      <path d="M70 120 C110 70 150 130 120 170" fill="none" stroke="#E56B8A" stroke-width="16" stroke-linecap="round"/>`),
    "ru-goodbye": () => frame("ru-goodbye", "#F7F1E8", "#E7D8C4", `
      <path d="M80 200 Q160 80 240 200" fill="none" stroke="#3E86B8" stroke-width="16" stroke-linecap="round"/>
      <circle cx="160" cy="200" r="28" fill="#F8D0B4"/>`),
    "ru-please": () => frame("ru-please", "#FDE7EE", "#F6C9D8", `
      <ellipse cx="110" cy="180" rx="46" ry="36" fill="#F8D0B4"/>
      <ellipse cx="210" cy="180" rx="46" ry="36" fill="#F8D0B4"/>
      <path d="M150 120 V200" stroke="#E56B8A" stroke-width="8" stroke-linecap="round"/>`),
    "ru-thanks": () => frame("ru-thanks", "#FDE7F3", "#F6C6DE", `
      <path d="M160 240 C70 160 80 90 130 90 C150 90 160 110 160 110 C160 110 170 90 190 90 C240 90 250 160 160 240Z" fill="#E56B8A"/>`),
    "ru-yes": () => frame("ru-yes", "#E7F8EA", "#CDEBD2", `
      <circle cx="160" cy="160" r="80" fill="#fff"/>
      <path d="M110 160 L145 196 L214 120" fill="none" stroke="#2F9E55" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>`),
    "ru-no": () => frame("ru-no", "#FDECEA", "#F6D0C8", `
      <circle cx="160" cy="160" r="80" fill="#fff"/>
      <path d="M120 120 L200 200 M200 120 L120 200" stroke="#C0392B" stroke-width="16" stroke-linecap="round"/>`),
    "ru-how": () => frame("ru-how", "#EAF3FF", "#D0E2F8", `
      <circle cx="160" cy="150" r="70" fill="#F6D56A"/>
      <text x="160" y="178" text-anchor="middle" font-family="Nunito, sans-serif" font-size="84" font-weight="800" fill="#1F3A73">?</text>`),
    "ru-good": () => frame("ru-good", "#FFF6E0", "#F8E4B0", `
      <circle cx="160" cy="160" r="78" fill="#F6D56A"/>
      ${eyes(140, 150)}
      <path d="M120 180 Q160 220 200 180" fill="none" stroke="#2c2834" stroke-width="8" stroke-linecap="round"/>`),
    "ru-name": () => frame("ru-name", "#E7F6FF", "#D0E8F8", `
      <rect x="70" y="90" width="180" height="140" rx="18" fill="#fff"/>
      <circle cx="160" cy="140" r="28" fill="#F8D0B4"/>
      <path d="M120 200 Q160 170 200 200" fill="#3E86B8"/>
      <text x="160" y="78" text-anchor="middle" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#1F3A73">Noah</text>`),
    "ru-red": () => frame("ru-red", "#FDECEA", "#F6C9C4", `<circle cx="160" cy="160" r="80" fill="#E74C3C"/>`),
    "ru-blue": () => frame("ru-blue", "#E7F3FF", "#C9E0F8", `<circle cx="160" cy="160" r="80" fill="#2E86C1"/>`),
    "ru-yellow": () => frame("ru-yellow", "#FFF8E4", "#F8E7B0", `<circle cx="160" cy="160" r="80" fill="#F2C14E"/>`),
    "ru-green": () => frame("ru-green", "#E7F8EA", "#C9EBD0", `<circle cx="160" cy="160" r="80" fill="#2F9E55"/>`),
    "ru-white": () => frame("ru-white", "#F4F7FB", "#E1E7F0", `<circle cx="160" cy="160" r="80" fill="#fff" stroke="#C5D0DE" stroke-width="6"/>`),
    "ru-black": () => frame("ru-black", "#ECEFF4", "#D5DCE6", `<circle cx="160" cy="160" r="80" fill="#2c2834"/>`),
    "ru-1": () => frame("ru-1", "#F7F3EA", "#E7DFD0", `<text x="160" y="200" text-anchor="middle" font-family="Nunito, sans-serif" font-size="140" font-weight="800" fill="#1F3A73">1</text>`),
    "ru-2": () => frame("ru-2", "#F7F3EA", "#E7DFD0", `<text x="160" y="200" text-anchor="middle" font-family="Nunito, sans-serif" font-size="140" font-weight="800" fill="#C0392B">2</text>`),
    "ru-3": () => frame("ru-3", "#F7F3EA", "#E7DFD0", `<text x="160" y="200" text-anchor="middle" font-family="Nunito, sans-serif" font-size="140" font-weight="800" fill="#2F9E55">3</text>`),
    "ru-4": () => frame("ru-4", "#F7F3EA", "#E7DFD0", `<text x="160" y="200" text-anchor="middle" font-family="Nunito, sans-serif" font-size="140" font-weight="800" fill="#2E86C1">4</text>`),
    "ru-5": () => frame("ru-5", "#F7F3EA", "#E7DFD0", `<text x="160" y="200" text-anchor="middle" font-family="Nunito, sans-serif" font-size="140" font-weight="800" fill="#E6B34D">5</text>`),
    "ru-6": () => frame("ru-6", "#F7F3EA", "#E7DFD0", `<text x="160" y="200" text-anchor="middle" font-family="Nunito, sans-serif" font-size="140" font-weight="800" fill="#8E44AD">6</text>`),
    "ru-7": () => frame("ru-7", "#F7F3EA", "#E7DFD0", `<text x="160" y="200" text-anchor="middle" font-family="Nunito, sans-serif" font-size="140" font-weight="800" fill="#1F3A73">7</text>`),
    "ru-8": () => frame("ru-8", "#F7F3EA", "#E7DFD0", `<text x="160" y="200" text-anchor="middle" font-family="Nunito, sans-serif" font-size="140" font-weight="800" fill="#C0392B">8</text>`),
    "ru-9": () => frame("ru-9", "#F7F3EA", "#E7DFD0", `<text x="160" y="200" text-anchor="middle" font-family="Nunito, sans-serif" font-size="140" font-weight="800" fill="#2F9E55">9</text>`),
    "ru-10": () => frame("ru-10", "#F7F3EA", "#E7DFD0", `<text x="160" y="200" text-anchor="middle" font-family="Nunito, sans-serif" font-size="120" font-weight="800" fill="#E67E22">10</text>`),
    "ru-bear": () => frame("ru-bear", "#E8F4FF", "#D5E6F6", `
      <circle cx="160" cy="170" r="70" fill="#8B5A3C"/>
      <circle cx="100" cy="110" r="26" fill="#8B5A3C"/>
      <circle cx="220" cy="110" r="26" fill="#8B5A3C"/>
      <ellipse cx="160" cy="186" rx="28" ry="20" fill="#E6C2A0"/>
      ${eyes(140, 160)}
      <ellipse cx="160" cy="180" rx="8" ry="6" fill="#2c2834"/>`),
    "ru-fox": () => frame("ru-fox", "#FFF4E4", "#F8D7B0", `
      <path d="M70 120 L120 200 H210 L250 110 L200 150 L160 80 L120 150 Z" fill="#E67E22"/>
      <path d="M90 130 L120 170 L110 140 Z" fill="#fff"/>
      <path d="M230 120 L200 170 L210 140 Z" fill="#fff"/>
      <ellipse cx="160" cy="190" rx="24" ry="16" fill="#fff"/>
      <circle cx="148" cy="168" r="4" fill="#2c2834"/>
      <circle cx="176" cy="168" r="4" fill="#2c2834"/>`),
    "ru-wolf": () => frame("ru-wolf", "#E8EEF4", "#D0D8E4", `
      <ellipse cx="160" cy="180" rx="80" ry="50" fill="#7F8C9A"/>
      <path d="M110 140 L90 70 L140 130 Z" fill="#7F8C9A"/>
      <path d="M210 140 L230 70 L180 130 Z" fill="#7F8C9A"/>
      <ellipse cx="160" cy="190" rx="22" ry="14" fill="#D5D8DE"/>
      ${eyes(140, 168)}`),
    "ru-hare": () => frame("ru-hare", "#F4F7FB", "#E4EAF2", `
      <ellipse cx="120" cy="90" rx="18" ry="50" fill="#F4F7FB" stroke="#C5D0DE" stroke-width="4"/>
      <ellipse cx="200" cy="90" rx="18" ry="50" fill="#F4F7FB" stroke="#C5D0DE" stroke-width="4"/>
      <circle cx="160" cy="180" r="64" fill="#F7F7F2"/>
      <circle cx="140" cy="170" r="5" fill="#2c2834"/>
      <circle cx="184" cy="170" r="5" fill="#2c2834"/>
      <ellipse cx="162" cy="190" rx="8" ry="6" fill="#E6B3B3"/>`),
    "ru-owl": () => frame("ru-owl", "#E7F0E4", "#D5E2CC", `
      <ellipse cx="160" cy="170" rx="70" ry="80" fill="#6B5344"/>
      <circle cx="130" cy="160" r="24" fill="#F6D56A"/>
      <circle cx="190" cy="160" r="24" fill="#F6D56A"/>
      <circle cx="130" cy="160" r="8" fill="#2c2834"/>
      <circle cx="190" cy="160" r="8" fill="#2c2834"/>
      <path d="M160 176 L150 190 L170 190 Z" fill="#E67E22"/>`),
    "ru-squirrel": () => frame("ru-squirrel", "#F8F1E4", "#EAD7C0", `
      <circle cx="170" cy="160" r="48" fill="#C47A3A"/>
      <path d="M120 150 Q60 80 90 200 Q140 210 150 170" fill="#A8622A"/>
      <circle cx="186" cy="150" r="4" fill="#2c2834"/>
      <ellipse cx="200" cy="166" rx="8" ry="5" fill="#E6C2A0"/>`),
    "ru-firebird": () => frame("ru-firebird", "#2C2148", "#1A1430", `
      <path d="M170 160 Q80 80 40 140 Q110 130 150 170 Q70 210 90 250 Q150 200 180 180 Q220 240 260 180 Q220 140 180 150 Z" fill="#E67E22"/>
      <path d="M150 150 Q120 60 190 90" fill="#F6D56A"/>
      <circle cx="196" cy="148" r="5" fill="#2c2834"/>
      <circle cx="230" cy="70" r="3" fill="#fff"/>`),
    "ru-mom": () => frame("ru-mom", "#FDE7EE", "#F6D0DE", `
      <circle cx="160" cy="120" r="36" fill="#F8D0B4"/>
      <path d="M110 250 Q160 150 210 250" fill="#E56B8A"/>
      <path d="M112 130 Q160 70 208 130" fill="#6B3A34"/>`),
    "ru-dad": () => frame("ru-dad", "#E7F0FF", "#D0DFF6", `
      <circle cx="160" cy="120" r="36" fill="#F8D0B4"/>
      <path d="M120 110 Q160 70 200 110 Q190 90 160 90 Q130 90 120 110Z" fill="#3A2A22"/>
      <path d="M110 250 Q160 150 210 250" fill="#3E86B8"/>`),
    "ru-brother": () => frame("ru-brother", "#EAF6EA", "#D0EBD4", `
      <circle cx="160" cy="130" r="40" fill="#F8D0B4"/>
      <path d="M120 120 Q160 80 200 120" fill="#3A2A22"/>
      <path d="M115 250 Q160 170 205 250" fill="#2F9E55"/>`),
    "ru-sister": () => frame("ru-sister", "#F8E7F4", "#F0D0E8", `
      <circle cx="160" cy="130" r="40" fill="#F8D0B4"/>
      <path d="M100 150 Q160 60 220 150" fill="#6B3A34"/>
      <path d="M115 250 Q160 170 205 250" fill="#C56B9A"/>`),
    "ru-grandma": () => frame("ru-grandma", "#F8F1E6", "#EADCC8", `
      <circle cx="160" cy="130" r="40" fill="#F3C7A3"/>
      <path d="M108 120 Q160 70 212 120 Q200 100 160 100 Q120 100 108 120Z" fill="#ddd"/>
      <path d="M110 250 Q160 160 210 250" fill="#8E4460"/>
      <circle cx="160" cy="200" r="10" fill="#F6D56A"/>`),
    "ru-grandpa": () => frame("ru-grandpa", "#F4EFE6", "#E4D8C4", `
      <circle cx="160" cy="130" r="40" fill="#F3C7A3"/>
      <path d="M112 150 Q160 110 208 150 Q200 90 160 90 Q120 90 112 150Z" fill="#bbb"/>
      <path d="M110 250 Q160 160 210 250" fill="#5D6D7E"/>`),
    "ru-doll": () => frame("ru-doll", "#FDE7EE", "#F8D0C8", `
      <ellipse cx="160" cy="200" rx="70" ry="80" fill="#E56B8A"/>
      <circle cx="160" cy="110" r="40" fill="#F8D0B4"/>
      <path d="M120 100 Q160 50 200 100" fill="#6B3A34"/>
      <ellipse cx="160" cy="210" rx="36" ry="46" fill="#F6D56A"/>
      <circle cx="148" cy="108" r="3" fill="#2c2834"/>
      <circle cx="172" cy="108" r="3" fill="#2c2834"/>`),
    "ru-bread": () => frame("ru-bread", "#FFF6E4", "#F8E2C0", `
      <path d="M70 180 Q70 110 160 110 Q250 110 250 180 V200 H70 Z" fill="#E2B15A"/>
      <path d="M110 150 H150 M170 150 H210" stroke="#C47A3A" stroke-width="6" stroke-linecap="round"/>`),
    "ru-milk": () => frame("ru-milk", "#F4F7FB", "#E4EAF4", `
      <path d="M120 80 H200 L186 240 H134 Z" fill="#fff" stroke="#C5D0DE" stroke-width="4"/>
      <rect x="146" y="52" width="28" height="32" rx="6" fill="#7EB6FF"/>`),
    "ru-apple": () => frame("ru-apple", "#FDECEA", "#F6D0C8", `
      <circle cx="160" cy="170" r="70" fill="#E74C3C"/>
      <rect x="154" y="78" width="12" height="36" rx="6" fill="#6B4423"/>
      <ellipse cx="184" cy="100" rx="22" ry="12" fill="#2F9E55"/>`),
    "ru-soup": () => frame("ru-soup", "#FFF4E4", "#F8DCC0", `
      <ellipse cx="160" cy="190" rx="90" ry="36" fill="#F2C14E"/>
      <path d="M70 170 H250" stroke="#C47A3A" stroke-width="10"/>
      <path d="M230 150 Q270 170 230 200" fill="none" stroke="#C47A3A" stroke-width="8"/>
      <path d="M120 140 Q140 110 130 90" fill="none" stroke="#fff" stroke-width="4"/>`),
    "ru-borscht": () => frame("ru-borscht", "#FDECEC", "#F6D0D0", `
      <path d="M80 150 H240 L220 240 H100 Z" fill="#A93226"/>
      <ellipse cx="160" cy="150" rx="80" ry="22" fill="#C0392B"/>
      <circle cx="160" cy="120" r="16" fill="#F4F7FB"/>
      <rect x="200" y="70" width="8" height="70" fill="#C47A3A"/>`),
    "ru-water": () => frame("ru-water", "#E5F6FF", "#C5E7F8", `
      <path d="M160 60 C220 140 240 170 160 250 C80 170 100 140 160 60Z" fill="#2E86C1"/>
      <ellipse cx="140" cy="150" rx="16" ry="24" fill="#fff" opacity="0.35"/>`),
    "ru-nose": () => frame("ru-nose", "#FFF6EE", "#F8E0D0", `
      <circle cx="160" cy="160" r="90" fill="#F8D0B4"/>
      <ellipse cx="160" cy="170" rx="22" ry="16" fill="#E7B89A"/>
      <circle cx="150" cy="176" r="4" fill="#C47A6A"/>
      <circle cx="172" cy="176" r="4" fill="#C47A6A"/>
      ${eyes(130, 130)}`),
    "ru-eye": () => frame("ru-eye", "#F4F7FB", "#E4EAF2", `
      <ellipse cx="160" cy="160" rx="100" ry="60" fill="#fff" stroke="#2c2834" stroke-width="6"/>
      <circle cx="160" cy="160" r="28" fill="#2E86C1"/>
      <circle cx="160" cy="160" r="12" fill="#2c2834"/>
      <circle cx="150" cy="150" r="5" fill="#fff"/>`),
    "ru-hand": () => frame("ru-hand", "#FFF6EE", "#F8E0D0", `
      <path d="M120 180 V100 Q120 80 140 80 Q160 80 160 100 V150 H160 V90 Q160 70 180 70 Q200 70 200 90 V150 H200 V100 Q200 80 220 80 Q240 80 240 100 V190 Q240 250 180 250 H150 Q110 250 110 210 Z" fill="#F8D0B4"/>`),
    "ru-foot": () => frame("ru-foot", "#FFF6EE", "#F8E0D0", `
      <ellipse cx="170" cy="190" rx="90" ry="48" fill="#F8D0B4"/>
      <circle cx="100" cy="150" r="18" fill="#F8D0B4"/>
      <circle cx="140" cy="136" r="16" fill="#F8D0B4"/>
      <circle cx="176" cy="132" r="16" fill="#F8D0B4"/>
      <circle cx="210" cy="140" r="15" fill="#F8D0B4"/>`),
    "ru-ear": () => frame("ru-ear", "#FFF6EE", "#F8E0D0", `
      <path d="M120 160 Q110 70 190 80 Q250 90 230 180 Q210 250 160 250 Q120 250 130 200 Q150 220 180 190 Q160 160 140 180 Q130 150 150 130" fill="#F8D0B4" stroke="#E7B89A" stroke-width="6"/>`),
    "ru-mouth": () => frame("ru-mouth", "#FDE7EE", "#F6D0DE", `
      <ellipse cx="160" cy="170" rx="90" ry="50" fill="#E56B8A"/>
      <path d="M90 150 Q160 120 230 150" fill="#F8D0B4"/>
      <ellipse cx="160" cy="180" rx="50" ry="22" fill="#C0392B"/>`),
  };

  CynthiaArt.add(pictures);
})();
