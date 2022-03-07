function checkLogin() {
  const info = JSON.parse(localStorage.getItem('calf-user-info'))
  return info.name === 'admin'
}

export { checkLogin }
