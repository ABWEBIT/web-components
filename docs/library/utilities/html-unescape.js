const htmlUnescapeMap = {
  '&quot;':'"',
  '&#34;':'"',
  '&amp;':'&',
  '&#39;':"'",
  '&#x27;':"'",
  '&lt;':'<',
  '&gt;':'>',
};

const htmlUnescapeRegex = /&(?:quot|#34|amp|#39|#x27|lt|gt);/g;

export const htmlUnescape = (string) => {
  const str = string == null ? '' : String(string);

  if(!str || !str.includes('&')) return str;
  return str.replace(htmlUnescapeRegex, match => htmlUnescapeMap[match] || match);
}