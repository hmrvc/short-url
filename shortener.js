function generateUrl(num) {
  const CHARLIST = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const CHARNUM = CHARLIST.length

  let result = ''
  for (let i = 0; i < num; i++) {
    let choosenIndex = Math.floor(Math.random() * CHARNUM)
    let choosenChar = CHARLIST[choosenIndex]
    result += choosenChar
  }
  return result 
}

module.exports = generateUrl