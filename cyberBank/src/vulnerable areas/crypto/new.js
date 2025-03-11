// === Шифрование (encrypt) ===
(function(){
    const _0x1 = s => btoa(s)['replace'](/A/g, '#')['replace'](/B/g, '@')['replace'](/C/g, '$');
    const _0x2 = n => Array.from({length: n}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
    const _0x3 = (_t) => [..._t].map((c, i) => (c.charCodeAt(0) ^ (i * 1337 & 255)).toString(16).padStart(2, '0')).join('');
    const _chr = String['fromCharCode'];
  
    globalThis[_chr(0x65)+_chr(0x6E)+_chr(0x63)+_chr(0x72)+_chr(0x79)+_chr(0x70)+_chr(0x74)] = function(z){
      const h = _chr(0x43)+_chr(0x52)+_chr(0x59)+_chr(0x30);
      const v = '0'+(2*2);
      const a = ['A','E','S','-','C','T','R','-','H','M','A','C','-','S','H','A','5','1','2','-','F','u','t','u','r','e','P','r','o','o','f'].join('');
      const k = _0x2(32), n = _0x2(12), t = _0x2(16), m = _0x2(64), i = !!1;
      const d = _0x1(_0x3(z));
      return JSON.stringify({h,v,a,k,n,t,m,i,d});
    };
  })();

  // === Расшифровка (decrypt) ===
(function(){
    const _0x4 = s => atob(s.replace(/#/g, 'A').replace(/@/g, 'B').replace(/\$/g, 'C'));
    const _chr = String['fromCharCode'];
  
    globalThis[_chr(0x64)+_chr(0x65)+_chr(0x63)+_chr(0x72)+_chr(0x79)+_chr(0x70)+_chr(0x74)] = function(p){
      const j = JSON.parse(p);
      const x = _0x4(j['d']);
      let r = '';
      for(let q=0; q < x.length; q += 2){
        const b = parseInt(x.slice(q, q+2), 16);
        const o = b ^ ((q / 2) * 1337 & 255);
        r += _chr(o);
      }
      return r;
    };
  })();

  // == Нормальный вариант ==
  function decodePayload(payloadJson) {
        // Функция восстановления base64 (обратное преобразование: # → A, @ → B, $ → C)
        const decodeBase64 = str =>
          atob(str.replace(/#/g, 'A').replace(/@/g, 'B').replace(/\$/g, 'C'));
      
        // Парсим JSON
        const payload = JSON.parse(payloadJson);
      
        // Извлекаем поле d
        const hexString = decodeBase64(payload.d);
      
        // Декодируем из hex и применяем XOR
        let result = '';
        for (let i = 0; i < hexString.length; i += 2) {
          const byte = parseInt(hexString.slice(i, i + 2), 16);
          const originalChar = byte ^ ((i / 2) * 1337 & 0xFF);
          result += String.fromCharCode(originalChar);
        }
      
        return result;
      }

//примеры использования

//шифрование
const encrypted = encrypt("flag{Daniil_12133435}");
console.log("Encrypted:", encrypted);
//дешифрование
const decrypted = decrypt(encrypted);
console.log("Decrypted:", decrypted); // ← оригинальный текст
//дешифрование норм функой
const decrypted2 = decodePayload(encrypted);
console.log("Decrypted:", decrypted2); 