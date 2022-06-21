export const isALink = (string) => {
  if(string.toString().includes('http')){
    return `<a href="${string}" title="Visit ${string}" target="_blank" />${string}</a>`
  } else {
    return string
  }
}