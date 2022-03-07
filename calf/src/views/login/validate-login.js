function validateLogin() {
  const info = {
    name: 'admin'
  }
  localStorage.setItem('calf-user-info', JSON.stringify(info))
  return true
}

export default validateLogin
