export const state = () => ({
  cAlert: {
    color: '',
    isVisible: false,
    text: '',
  },
  unreadNotifications: 0,
})

export const mutations = {
  showAlert(state, value) {
    state.cAlert.isVisible = value.isVisible
    state.cAlert.color = value.color
    state.cAlert.text = value.text
  },
  changeUnreadNotifications(state, value) {
    state.unreadNotifications = value
  },
}
