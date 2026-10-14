/* Original pictures for Noah's history and science days. */

(function () {
  function card(id, c0, c1, inner) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320" aria-hidden="true">
      <defs>
        <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${c0}"/>
          <stop offset="100%" stop-color="${c1}"/>
        </linearGradient>
      </defs>
      <rect width="320" height="320" rx="44" fill="url(#${id}-sky)"/>
      ${inner}
    </svg>`;
  }

  function flag() {
    const stripes = [0, 1, 2, 3, 4, 5, 6].map((i) => {
      const y = 70 + i * 22;
      const fill = i % 2 === 0 ? "#C0392B" : "#fff";
      return `<rect x="36" y="${y}" width="248" height="22" fill="${fill}"/>`;
    }).join("");
    const stars = [];
    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 5; c += 1) {
        stars.push(`<circle cx="${58 + c * 18}" cy="${86 + r * 16}" r="3.2" fill="#fff"/>`);
      }
    }
    return card("n-flag", "#E8F1FF", "#C9D8F2", `
      ${stripes}
      <rect x="36" y="70" width="100" height="88" fill="#1F3A73"/>
      ${stars}
      <rect x="36" y="70" width="248" height="154" fill="none" stroke="#1F3A73" stroke-width="4"/>
    `);
  }

  const pictures = {
    "n-flag": flag,
    "n-roots": () => card("n-roots", "#E7F8EA", "#C6E6CC", `
      <rect x="40" y="168" width="240" height="90" rx="16" fill="#8B5A3C"/>
      <rect x="148" y="70" width="24" height="120" rx="10" fill="#3E8F4A"/>
      <ellipse cx="120" cy="110" rx="40" ry="18" fill="#57B36A"/>
      <ellipse cx="200" cy="108" rx="42" ry="18" fill="#3E9A55"/>
      <circle cx="160" cy="78" r="16" fill="#F2C14E"/>
      <path d="M160 190 C120 230 90 220 80 250 M160 200 C200 240 230 220 246 248" fill="none" stroke="#E7C39A" stroke-width="6" stroke-linecap="round"/>
    `),
    "n-states": () => card("n-states", "#E7F0FF", "#D5E2FA", `
      <circle cx="160" cy="150" r="78" fill="#7EB6FF"/>
      <path d="M110 120 H150 V150 H190 V130 H220 V180 H140 V200 H100 Z" fill="#F4E2B4"/>
      <text x="160" y="268" text-anchor="middle" font-family="Nunito, sans-serif" font-size="42" font-weight="800" fill="#1F3A73">50</text>
    `),
    "n-sprout": () => card("n-sprout", "#F4FBEE", "#D5F0C8", `
      <ellipse cx="160" cy="230" rx="70" ry="22" fill="#C4A574"/>
      <path d="M160 220 C160 160 120 150 110 110" fill="none" stroke="#3E8F4A" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="96" cy="100" rx="28" ry="16" fill="#57B36A" transform="rotate(-30 96 100)"/>
      <ellipse cx="150" cy="130" rx="26" ry="14" fill="#7DCEA0" transform="rotate(20 150 130)"/>
      <ellipse cx="160" cy="236" rx="16" ry="10" fill="#8B5A3C"/>
    `),
    "n-washington": () => card("n-washington", "#F8EBD2", "#E7D3A4", `
      <circle cx="160" cy="132" r="54" fill="#F3C7A3"/>
      <path d="M108 120 Q160 60 214 122 Q200 96 160 96 Q120 96 108 120Z" fill="#F7F7F2"/>
      <rect x="112" y="186" width="96" height="70" rx="16" fill="#1F3A73"/>
      <text x="160" y="278" text-anchor="middle" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#1F3A73">1st</text>
    `),
    "n-leaf": () => card("n-leaf", "#E9F8EF", "#D0F0C0", `
      <path d="M160 250 C80 200 70 90 150 50 C240 80 250 190 160 250Z" fill="#2E9B4A"/>
      <path d="M150 70 C150 140 150 190 160 240" fill="none" stroke="#E7F8D8" stroke-width="4"/>
      <circle cx="210" cy="90" r="28" fill="#F6D56A"/>
      <text x="160" y="290" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#1E6B38">O₂</text>
    `),
    "n-lincoln": () => card("n-lincoln", "#F6EDE2", "#E4D2BC", `
      <circle cx="160" cy="150" r="70" fill="#F3C7A3"/>
      <path d="M98 130 H222 V108 H98Z" fill="#2C2834"/>
      <path d="M120 108 H200 L188 70 H132Z" fill="#2C2834"/>
      <rect x="150" y="168" width="8" height="40" fill="#2C2834"/>
      <text x="160" y="280" text-anchor="middle" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#3A2A22">16th</text>
    `),
    "n-cheetah": () => card("n-cheetah", "#FFF4D8", "#F6E0A4", `
      <ellipse cx="170" cy="180" rx="90" ry="36" fill="#E2B15A"/>
      <circle cx="230" cy="150" r="28" fill="#E2B15A"/>
      <circle cx="242" cy="144" r="4" fill="#2C2834"/>
      <path d="M80 170 H140" stroke="#C0392B" stroke-width="6"/>
      <circle cx="120" cy="160" r="6" fill="#2C2834"/>
      <circle cx="150" cy="176" r="6" fill="#2C2834"/>
      <circle cx="176" cy="168" r="6" fill="#2C2834"/>
    `),
    "n-gettysburg": () => card("n-gettysburg", "#F7F1E6", "#E7DCC8", `
      <rect x="70" y="70" width="180" height="150" rx="8" fill="#FBF7EF"/>
      <path d="M90 110 H230 M90 140 H210 M90 170 H220" stroke="#3A2A22" stroke-width="4"/>
      <text x="160" y="268" text-anchor="middle" font-family="Nunito, sans-serif" font-size="32" font-weight="800" fill="#3A2A22">1863</text>
    `),
    "n-peregrine": () => card("n-peregrine", "#E7F2FF", "#D5E4F8", `
      <path d="M180 60 L150 160 L70 200 L160 180 L190 250 L210 160 L270 140 Z" fill="#3E4C63"/>
      <path d="M188 90 L210 70" stroke="#F2C14E" stroke-width="6"/>
      <circle cx="196" cy="100" r="4" fill="#F6D56A"/>
    `),
    "n-liberty": () => card("n-liberty", "#E5F4FF", "#B9DDF5", `
      <path d="M148 40 H176 L186 90 H138 Z" fill="#F6D56A"/>
      <rect x="146" y="90" width="28" height="70" fill="#7EB6FF"/>
      <path d="M110 160 H214 L200 250 H124 Z" fill="#3E8FD0"/>
      <circle cx="160" cy="130" r="16" fill="#F3C7A3"/>
      <path d="M200 120 H250" stroke="#F6D56A" stroke-width="8" stroke-linecap="round"/>
      <circle cx="258" cy="120" r="12" fill="#F2C14E"/>
    `),
    "n-whale": () => card("n-whale", "#D9F1F8", "#B7E0EE", `
      <path d="M40 180 Q120 80 230 150 Q270 180 240 210 Q150 250 70 200 Z" fill="#3E6F8C"/>
      <path d="M230 140 L280 90 L250 160 Z" fill="#2C4C63"/>
      <circle cx="120" cy="160" r="5" fill="#fff"/>
      <path d="M70 150 Q40 130 60 110" fill="none" stroke="#7EB6D8" stroke-width="4"/>
    `),
    "n-liberty-size": () => card("n-liberty-size", "#EAF3FB", "#D5E4F4", `
      <rect x="70" y="40" width="16" height="230" fill="#1F3A73"/>
      <rect x="70" y="40" width="70" height="8" fill="#1F3A73"/>
      <text x="160" y="80" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#1F3A73">151 ft</text>
      <text x="160" y="160" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#C0392B">305 ft</text>
      <path d="M70 250 H200" stroke="#1F3A73" stroke-width="6"/>
    `),
    "n-elephant": () => card("n-elephant", "#F4F0E4", "#E4D8C4", `
      <circle cx="150" cy="150" r="60" fill="#8D8A96"/>
      <ellipse cx="210" cy="160" rx="40" ry="28" fill="#8D8A96"/>
      <path d="M230 160 Q270 200 230 240" fill="none" stroke="#6E6A78" stroke-width="14" stroke-linecap="round"/>
      <ellipse cx="120" cy="90" rx="16" ry="28" fill="#8D8A96"/>
      <circle cx="176" cy="146" r="5" fill="#2C2834"/>
    `),
    "n-july4": () => card("n-july4", "#16325C", "#0E2244", `
      <circle cx="100" cy="110" r="6" fill="#F6D56A"/>
      <path d="M160 150 L168 180 L198 182 L174 198 L182 228 L160 210 L138 228 L146 198 L122 182 L152 180 Z" fill="#F6D56A"/>
      <circle cx="230" cy="100" r="4" fill="#fff"/>
      <text x="160" y="280" text-anchor="middle" font-family="Nunito, sans-serif" font-size="36" font-weight="800" fill="#fff">1776</text>
    `),
    "n-giraffe": () => card("n-giraffe", "#FFF6E4", "#F8E2B4", `
      <rect x="150" y="40" width="22" height="150" rx="10" fill="#E2B15A"/>
      <circle cx="161" cy="40" r="22" fill="#E2B15A"/>
      <rect x="130" y="180" width="70" height="50" rx="16" fill="#E2B15A"/>
      <circle cx="150" cy="70" r="5" fill="#8B5A3C"/>
      <circle cx="168" cy="110" r="5" fill="#8B5A3C"/>
      <circle cx="156" cy="150" r="5" fill="#8B5A3C"/>
      <path d="M150 24 L140 8 M176 22 L190 8" stroke="#8B5A3C" stroke-width="4"/>
    `),
    "n-thanks": () => card("n-thanks", "#FFF4E4", "#F6D7A8", `
      <ellipse cx="160" cy="200" rx="90" ry="28" fill="#C47A3A"/>
      <ellipse cx="160" cy="180" rx="70" ry="36" fill="#E6B34D"/>
      <circle cx="120" cy="150" r="16" fill="#C0392B"/>
      <circle cx="200" cy="146" r="14" fill="#3E8F4A"/>
      <rect x="150" y="90" width="12" height="50" fill="#8B5A3C"/>
    `),
    "n-insects": () => card("n-insects", "#F2FBE8", "#DDF3C8", `
      <ellipse cx="160" cy="170" rx="36" ry="48" fill="#F2C14E"/>
      <circle cx="160" cy="112" r="22" fill="#2C2834"/>
      <path d="M120 150 H70 M124 176 H64 M130 200 H78 M200 150 H250 M196 176 H256 M190 200 H242" stroke="#2C2834" stroke-width="5" stroke-linecap="round"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#2C2834">6 legs</text>
    `),
    "n-bell": () => card("n-bell", "#F8F1E4", "#E7D7BC", `
      <path d="M160 70 V96" stroke="#8B5A3C" stroke-width="8"/>
      <path d="M90 210 Q90 110 160 110 Q230 110 230 210 Z" fill="#D1A15A"/>
      <rect x="78" y="206" width="164" height="16" rx="6" fill="#8B5A3C"/>
      <path d="M150 150 Q170 190 150 200" fill="none" stroke="#6B4423" stroke-width="4"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#6B4423">1752</text>
    `),
    "n-spider": () => card("n-spider", "#F4F6EA", "#E4E8D4", `
      <circle cx="160" cy="150" r="22" fill="#2C2834"/>
      <circle cx="160" cy="190" r="30" fill="#2C2834"/>
      <path d="M130 140 L70 90 M136 160 L60 160 M130 186 L70 230 M190 140 L250 90 M184 160 L260 160 M190 186 L250 230 M146 128 L100 70 M174 128 L220 70" stroke="#2C2834" stroke-width="4"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#2C2834">8 legs</text>
    `),
    "n-constitution": () => card("n-constitution", "#F7F3EA", "#E7DFD0", `
      <rect x="80" y="60" width="160" height="180" rx="6" fill="#FBF7EF" stroke="#8B5A3C" stroke-width="4"/>
      <path d="M100 100 H220 M100 124 H220 M100 148 H200 M100 172 H210" stroke="#3A2A22" stroke-width="3"/>
      <text x="160" y="280" text-anchor="middle" font-family="Nunito, sans-serif" font-size="24" font-weight="800" fill="#3A2A22">1787</text>
    `),
    "n-polarbear": () => card("n-polarbear", "#E7F4FF", "#D0E6F8", `
      <circle cx="160" cy="160" r="70" fill="#fff"/>
      <circle cx="110" cy="110" r="22" fill="#fff"/>
      <circle cx="210" cy="110" r="22" fill="#fff"/>
      <circle cx="136" cy="156" r="6" fill="#2C2834"/>
      <circle cx="184" cy="156" r="6" fill="#2C2834"/>
      <ellipse cx="160" cy="176" rx="12" ry="8" fill="#2C2834"/>
      <text x="160" y="276" text-anchor="middle" font-family="Nunito, sans-serif" font-size="24" font-weight="800" fill="#1F3A73">Arctic</text>
    `),
    "n-whitehouse": () => card("n-whitehouse", "#EAF3FF", "#D5E4F8", `
      <rect x="50" y="150" width="220" height="90" fill="#fff"/>
      <rect x="110" y="90" width="100" height="70" fill="#fff"/>
      <path d="M100 90 H220 V70 H100 Z" fill="#fff"/>
      <rect x="70" y="170" width="18" height="40" fill="#9BB6D4"/>
      <rect x="110" y="170" width="18" height="40" fill="#9BB6D4"/>
      <rect x="192" y="170" width="18" height="40" fill="#9BB6D4"/>
      <rect x="232" y="170" width="18" height="40" fill="#9BB6D4"/>
      <text x="160" y="276" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#1F3A73">1600</text>
    `),
    "n-penguin": () => card("n-penguin", "#E8F4FF", "#D5E6F6", `
      <ellipse cx="160" cy="180" rx="50" ry="70" fill="#2C2834"/>
      <ellipse cx="160" cy="190" rx="30" ry="48" fill="#fff"/>
      <circle cx="160" cy="110" r="32" fill="#2C2834"/>
      <circle cx="148" cy="106" r="5" fill="#fff"/>
      <circle cx="172" cy="106" r="5" fill="#fff"/>
      <path d="M150 120 L170 120 L160 132 Z" fill="#F2A35A"/>
      <text x="160" y="286" text-anchor="middle" font-family="Nunito, sans-serif" font-size="20" font-weight="800" fill="#1F3A73">Antarctica</text>
    `),
    "n-capital": () => card("n-capital", "#E7EEF8", "#D5DEEE", `
      <path d="M160 50 L190 100 H130 Z" fill="#fff"/>
      <rect x="70" y="150" width="180" height="16" fill="#fff"/>
      <rect x="90" y="166" width="16" height="70" fill="#fff"/>
      <rect x="130" y="166" width="16" height="70" fill="#fff"/>
      <rect x="174" y="166" width="16" height="70" fill="#fff"/>
      <rect x="214" y="166" width="16" height="70" fill="#fff"/>
      <text x="160" y="276" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#1F3A73">Not a state</text>
    `),
    "n-oceans": () => card("n-oceans", "#D7F0FA", "#B7DFF2", `
      <circle cx="160" cy="150" r="80" fill="#2E86C1"/>
      <path d="M120 120 H160 V160 H140 V190 H110 Z" fill="#D9C08A"/>
      <path d="M180 130 H210 V170 H180 Z" fill="#C7B07A"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="42" font-weight="800" fill="#1A5276">5</text>
    `),
    "n-congress": () => card("n-congress", "#EAF0FA", "#D5DEEF", `
      <rect x="60" y="120" width="90" height="110" rx="8" fill="#1F3A73"/>
      <rect x="170" y="120" width="90" height="110" rx="8" fill="#C0392B"/>
      <text x="105" y="175" text-anchor="middle" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#fff">100</text>
      <text x="215" y="175" text-anchor="middle" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#fff">435</text>
    `),
    "n-pacific": () => card("n-pacific", "#D4EEF8", "#B5DDF0", `
      <circle cx="160" cy="150" r="86" fill="#1A5276"/>
      <path d="M70 140 Q120 100 150 150 Q130 190 80 180 Z" fill="#E6D3A3"/>
      <text x="190" y="156" font-family="Nunito, sans-serif" font-size="20" font-weight="800" fill="#fff">Pacific</text>
    `),
    "n-vote": () => card("n-vote", "#F4F7FF", "#E0E7FA", `
      <rect x="90" y="70" width="140" height="170" rx="12" fill="#fff" stroke="#1F3A73" stroke-width="4"/>
      <path d="M120 140 L150 170 L210 100" fill="none" stroke="#2E9B4A" stroke-width="12" stroke-linecap="round"/>
      <text x="160" y="276" text-anchor="middle" font-family="Nunito, sans-serif" font-size="32" font-weight="800" fill="#1F3A73">Age 18</text>
    `),
    "n-water": () => card("n-water", "#E5F6FF", "#C5E7F8", `
      <circle cx="160" cy="140" r="80" fill="#1A5276"/>
      <path d="M110 120 H150 V150 H130 V180 H100 Z" fill="#F4E1B0"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="40" font-weight="800" fill="#1A5276">71%</text>
    `),
    "n-anthem": () => card("n-anthem", "#1C3358", "#121E36", `
      <path d="M70 200 L160 70 L250 200 Z" fill="#C0392B"/>
      <circle cx="160" cy="150" r="16" fill="#F6D56A"/>
      <text x="160" y="260" text-anchor="middle" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#fff">1814</text>
    `),
    "n-trench": () => card("n-trench", "#D6EEF6", "#9FD0E4", `
      <path d="M40 80 H280 V140 H40 Z" fill="#5DADE2"/>
      <path d="M40 140 H280 L240 260 H80 Z" fill="#1A5276"/>
      <text x="160" y="200" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#fff">36,000 ft</text>
    `),
    "n-rushmore": () => card("n-rushmore", "#E7F0E4", "#D5E2CC", `
      <path d="M40 240 L100 80 L160 150 L210 70 L280 240 Z" fill="#8D97A3"/>
      <circle cx="120" cy="150" r="16" fill="#D5D8DE"/>
      <circle cx="160" cy="160" r="16" fill="#D5D8DE"/>
      <circle cx="198" cy="150" r="16" fill="#D5D8DE"/>
      <circle cx="230" cy="168" r="14" fill="#D5D8DE"/>
    `),
    "n-continents": () => card("n-continents", "#E7F6FF", "#D0ECF8", `
      <circle cx="160" cy="150" r="84" fill="#5DADE2"/>
      <circle cx="120" cy="130" r="18" fill="#7DCEA0"/>
      <circle cx="180" cy="120" r="22" fill="#F6D56A"/>
      <circle cx="200" cy="170" r="14" fill="#F0A07A"/>
      <circle cx="130" cy="180" r="16" fill="#C9B6F5"/>
      <text x="160" y="272" text-anchor="middle" font-family="Nunito, sans-serif" font-size="42" font-weight="800" fill="#1A5276">7</text>
    `),
    "n-king": () => card("n-king", "#F8EFE6", "#F0D9C8", `
      <circle cx="160" cy="120" r="40" fill="#8B5A3C"/>
      <rect x="112" y="168" width="96" height="70" rx="16" fill="#1F3A73"/>
      <path d="M70 80 H250" stroke="#C0392B" stroke-width="8"/>
      <text x="160" y="276" text-anchor="middle" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#1F3A73">1963</text>
    `),
    "n-africa": () => card("n-africa", "#FBF6E8", "#F0E2C0", `
      <path d="M150 50 C200 60 230 100 220 150 C230 200 190 260 150 250 C110 240 90 190 100 140 C90 90 110 60 150 50Z" fill="#E2B15A"/>
      <circle cx="150" cy="150" r="22" fill="#C0392B"/>
      <circle cx="142" cy="146" r="3" fill="#2C2834"/>
    `),
    "n-parks": () => card("n-parks", "#F6EFE8", "#EADCCE", `
      <rect x="70" y="150" width="180" height="50" rx="10" fill="#F2C14E"/>
      <circle cx="100" cy="200" r="16" fill="#2C2834"/>
      <circle cx="220" cy="200" r="16" fill="#2C2834"/>
      <circle cx="160" cy="110" r="36" fill="#8B5A3C"/>
      <rect x="130" y="140" width="60" height="30" fill="#1F3A73"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="24" font-weight="800" fill="#3A2A22">1955</text>
    `),
    "n-antarctica": () => card("n-antarctica", "#EAF6FF", "#D5EAF8", `
      <path d="M40 200 H280 L240 120 H80 Z" fill="#fff"/>
      <circle cx="160" cy="170" r="16" fill="#2C2834"/>
      <text x="160" y="260" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#1F3A73">Coldest</text>
    `),
    "n-apollo": () => card("n-apollo", "#101A30", "#1C2C4E", `
      <circle cx="210" cy="120" r="50" fill="#F4E2B4"/>
      <path d="M70 230 L110 150 L130 230 Z" fill="#ddd"/>
      <circle cx="110" cy="150" r="8" fill="#C0392B"/>
      <text x="160" y="280" text-anchor="middle" font-family="Nunito, sans-serif" font-size="24" font-weight="800" fill="#fff">1969</text>
    `),
    "n-asia": () => card("n-asia", "#F3F7EA", "#E0EBD0", `
      <path d="M60 180 C100 60 240 70 270 160 C240 230 100 240 60 180Z" fill="#7DCEA0"/>
      <circle cx="180" cy="140" r="28" fill="#fff"/>
      <circle cx="168" cy="136" r="4" fill="#2C2834"/>
      <circle cx="190" cy="136" r="4" fill="#2C2834"/>
      <ellipse cx="180" cy="150" rx="8" ry="5" fill="#2C2834"/>
    `),
    "n-juneteenth": () => card("n-juneteenth", "#1C3358", "#121E36", `
      <rect x="70" y="70" width="180" height="120" fill="#C0392B"/>
      <path d="M160 90 L172 120 H204 L178 138 L188 170 L160 152 L132 170 L142 138 L116 120 H148 Z" fill="#F6D56A"/>
      <text x="160" y="250" text-anchor="middle" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#fff">June 19</text>
    `),
    "n-australia": () => card("n-australia", "#E9F6FF", "#D4ECF8", `
      <path d="M90 150 Q140 90 220 130 Q250 180 190 210 Q120 220 90 150Z" fill="#E2B15A"/>
      <ellipse cx="150" cy="175" rx="28" ry="18" fill="#8B5A3C"/>
      <path d="M176 168 Q210 150 190 190" fill="none" stroke="#8B5A3C" stroke-width="6"/>
      <circle cx="200" cy="200" r="10" fill="#C4A574"/>
    `),
    "n-veterans": () => card("n-veterans", "#E8EEF6", "#D5DEEC", `
      <path d="M160 60 L190 140 H250 L200 180 L220 250 L160 210 L100 250 L120 180 L70 140 H130 Z" fill="#1F3A73"/>
      <text x="160" y="286" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#1F3A73">Nov 11</text>
    `),
    "n-europe": () => card("n-europe", "#F4F8EA", "#E3EECF", `
      <ellipse cx="160" cy="180" rx="70" ry="40" fill="#8B6B4A"/>
      <path d="M100 160 L90 120 M130 150 L120 110 M190 150 L200 110 M220 164 L240 130" stroke="#6B4423" stroke-width="6" stroke-linecap="round"/>
      <circle cx="150" cy="170" r="4" fill="#2C2834"/>
      <circle cx="176" cy="170" r="4" fill="#2C2834"/>
    `),
    "n-memorial": () => card("n-memorial", "#F7F4EE", "#E7E0D4", `
      <path d="M100 200 Q160 80 220 200" fill="none" stroke="#2E9B4A" stroke-width="16"/>
      <rect x="146" y="150" width="28" height="70" fill="#1F3A73"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#1F3A73">Last Monday</text>
    `),
    "n-bison": () => card("n-bison", "#F8F1E0", "#EAD7B4", `
      <ellipse cx="170" cy="180" rx="80" ry="46" fill="#6B4423"/>
      <circle cx="230" cy="150" r="30" fill="#6B4423"/>
      <path d="M210 130 Q200 90 230 100" fill="none" stroke="#3A2A22" stroke-width="6"/>
      <rect x="120" y="200" width="12" height="30" fill="#3A2A22"/>
      <rect x="180" y="206" width="12" height="28" fill="#3A2A22"/>
    `),
    "n-term": () => card("n-term", "#EEF3FB", "#D9E3F4", `
      <circle cx="160" cy="150" r="70" fill="#fff" stroke="#1F3A73" stroke-width="8"/>
      <text x="160" y="166" text-anchor="middle" font-family="Nunito, sans-serif" font-size="48" font-weight="800" fill="#1F3A73">4</text>
    `),
    "n-jaguar": () => card("n-jaguar", "#F8F3E6", "#EFE0C4", `
      <ellipse cx="160" cy="180" rx="90" ry="40" fill="#E2B15A"/>
      <circle cx="230" cy="150" r="28" fill="#E2B15A"/>
      <circle cx="150" cy="170" r="8" fill="#2C2834"/>
      <circle cx="180" cy="186" r="8" fill="#2C2834"/>
      <circle cx="120" cy="176" r="7" fill="#2C2834"/>
      <circle cx="240" cy="144" r="4" fill="#2C2834"/>
    `),
    "n-court": () => card("n-court", "#F7F5F0", "#E7E2D8", `
      <rect x="90" y="80" width="140" height="150" rx="8" fill="#fff" stroke="#1F3A73" stroke-width="4"/>
      <path d="M120 150 H200 M160 120 V190" stroke="#1F3A73" stroke-width="6"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="36" font-weight="800" fill="#1F3A73">9</text>
    `),
    "n-cycle": () => card("n-cycle", "#E7F6FF", "#D4EEF8", `
      <circle cx="220" cy="80" r="26" fill="#F6D56A"/>
      <path d="M70 190 Q120 120 180 150 Q220 170 190 210 Q120 230 70 190Z" fill="#5DADE2"/>
      <path d="M150 150 C170 100 200 110 190 80" fill="none" stroke="#7F8C8D" stroke-width="4"/>
      <path d="M180 70 L170 110" stroke="#5DADE2" stroke-width="4"/>
    `),
    "n-yellowstone": () => card("n-yellowstone", "#E7F6EA", "#D5EED8", `
      <path d="M40 220 H280 L240 120 H80 Z" fill="#3E8F4A"/>
      <path d="M150 200 Q160 120 180 80" fill="none" stroke="#AED6F1" stroke-width="8"/>
      <circle cx="186" cy="70" r="10" fill="#D6EAF8"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="#1E6B38">1872</text>
    `),
    "n-spin": () => card("n-spin", "#102038", "#1B334F", `
      <circle cx="70" cy="160" r="28" fill="#F6D56A"/>
      <circle cx="190" cy="160" r="50" fill="#2E86C1"/>
      <path d="M190 110 A50 50 0 0 1 190 210" fill="#0E3A5A"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="24" font-weight="800" fill="#fff">24 hours</text>
    `),
    "n-hawaii": () => card("n-hawaii", "#E5F6FF", "#D0EEF8", `
      <circle cx="120" cy="170" r="28" fill="#2E9B4A"/>
      <circle cx="170" cy="150" r="20" fill="#3E8F4A"/>
      <circle cx="210" cy="176" r="16" fill="#2E9B4A"/>
      <path d="M60 80 L90 50 H150" fill="none" stroke="#1A5276" stroke-width="8"/>
      <text x="160" y="250" text-anchor="middle" font-family="Nunito, sans-serif" font-size="24" font-weight="800" fill="#1A5276">50th</text>
    `),
    "n-tilt": () => card("n-tilt", "#102038", "#243B5C", `
      <circle cx="70" cy="200" r="24" fill="#F6D56A"/>
      <ellipse cx="190" cy="140" rx="36" ry="70" fill="#2E86C1" transform="rotate(23 190 140)"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="24" font-weight="800" fill="#fff">23.5°</text>
    `),
    "n-california": () => card("n-california", "#FFF6E0", "#F8E4B0", `
      <path d="M140 50 L180 80 L170 140 L200 200 L150 260 L120 180 L110 100 Z" fill="#E2B15A"/>
      <text x="160" y="300" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#6E5010">39 million</text>
    `),
    "n-year": () => card("n-year", "#102038", "#1C3354", `
      <circle cx="160" cy="160" r="24" fill="#F6D56A"/>
      <ellipse cx="160" cy="160" rx="110" ry="46" fill="none" stroke="#7EB6FF" stroke-width="4"/>
      <circle cx="268" cy="160" r="10" fill="#2E86C1"/>
      <text x="160" y="250" text-anchor="middle" font-family="Nunito, sans-serif" font-size="24" font-weight="800" fill="#fff">365 days</text>
    `),
    "n-rhode": () => card("n-rhode", "#EAF2FF", "#D5E2F8", `
      <rect x="40" y="80" width="150" height="120" rx="8" fill="#F4E2B4" stroke="#1F3A73" stroke-width="3"/>
      <rect x="210" y="120" width="28" height="24" fill="#C0392B"/>
      <text x="160" y="250" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#1F3A73">Smallest</text>
    `),
    "n-moon": () => card("n-moon", "#101A30", "#1C2C4E", `
      <circle cx="70" cy="160" r="28" fill="#F4E2B4"/>
      <circle cx="150" cy="160" r="28" fill="#F4E2B4"/>
      <path d="M150 132 A28 28 0 1 0 150 188 A18 18 0 1 1 150 132" fill="#101A30"/>
      <circle cx="240" cy="160" r="28" fill="#F4E2B4"/>
      <text x="160" y="250" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#fff">29.5 days</text>
    `),
    "n-revere": () => card("n-revere", "#2C3E50", "#1B2836", `
      <ellipse cx="120" cy="190" rx="50" ry="16" fill="#6B4423"/>
      <circle cx="150" cy="150" r="16" fill="#F3C7A3"/>
      <path d="M170 160 H250" stroke="#F6D56A" stroke-width="4"/>
      <text x="160" y="250" text-anchor="middle" font-family="Nunito, sans-serif" font-size="24" font-weight="800" fill="#fff">1775</text>
    `),
    "n-planets": () => card("n-planets", "#101A30", "#1B2C4A", `
      <circle cx="160" cy="160" r="28" fill="#F6D56A"/>
      <circle cx="70" cy="120" r="8" fill="#C0392B"/>
      <circle cx="100" cy="210" r="10" fill="#E2B15A"/>
      <circle cx="230" cy="100" r="12" fill="#5DADE2"/>
      <circle cx="250" cy="190" r="14" fill="#E67E22"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="36" font-weight="800" fill="#fff">8</text>
    `),
    "n-eagle": () => card("n-eagle", "#EAF3FF", "#D5E4F6", `
      <path d="M160 150 Q80 80 40 120 Q100 130 150 160 Q90 200 70 230 Q130 200 160 170 Q190 200 250 230 Q220 130 280 120 Q240 80 160 150Z" fill="#5D6D7E"/>
      <circle cx="160" cy="150" r="14" fill="#fff"/>
      <path d="M154 150 L166 150 L160 160 Z" fill="#F2A35A"/>
    `),
    "n-sun": () => card("n-sun", "#102038", "#24385C", `
      <circle cx="80" cy="160" r="36" fill="#F6D56A"/>
      <circle cx="230" cy="160" r="18" fill="#2E86C1"/>
      <path d="M120 160 H200" stroke="#F8E7A0" stroke-width="4" stroke-dasharray="6 6"/>
      <text x="160" y="250" text-anchor="middle" font-family="Nunito, sans-serif" font-size="20" font-weight="800" fill="#fff">93 million mi</text>
    `),
    "n-hall": () => card("n-hall", "#F6F0E6", "#E7DCC8", `
      <rect x="70" y="120" width="180" height="110" fill="#F4E2B4"/>
      <rect x="130" y="70" width="60" height="60" fill="#E6D3A3"/>
      <rect x="145" y="160" width="30" height="70" fill="#8B5A3C"/>
      <rect x="90" y="150" width="24" height="36" fill="#7EB6FF"/>
      <rect x="206" y="150" width="24" height="36" fill="#7EB6FF"/>
    `),
    "n-dinosaurs": () => card("n-dinosaurs", "#E9F6EA", "#D4EED4", `
      <path d="M70 200 L110 120 L140 160 L180 90 L210 150 L250 130 L230 210 Z" fill="#3E8F4A"/>
      <circle cx="214" cy="118" r="10" fill="#2C2834"/>
      <path d="M40 230 Q80 180 120 220" fill="none" stroke="#5D6D7E" stroke-width="4"/>
      <text x="160" y="270" text-anchor="middle" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="#1E6B38">66 million</text>
    `),
  };

  CynthiaArt.add(pictures);
})();
