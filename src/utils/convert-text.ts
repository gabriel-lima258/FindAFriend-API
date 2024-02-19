export function convertText(text: string) {
  const words = text.toLowerCase().split(' ')

  for (let x = 0; x < words.length; x++) {
    const w = words[x]
    words[x] = w[0].toUpperCase() + w.slice(1)
  }

  return words
    .join(' ')
    .normalize('NFC')
    .replace(/[\u0300-\u036f]/g, '')
}
