export const isALink = (string) => {
  if(string.toString().includes('http')){
    return `<a href="${string}" style="color:blue;" title="Visit ${string}" target="_blank" />${string}</a>`
  } else {
    return string
  }
}