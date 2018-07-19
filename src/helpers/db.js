const localStorage = global.window ? window.localStorage : {
  getItem: () => {},
  setItem: () => {},
}
export const getNotes = () => {
  const rawNotes = localStorage.getItem('notes')
  return rawNotes ? JSON.parse(rawNotes) : []
}

export const saveNotes = data => {
  localStorage.setItem('notes', JSON.stringify(data))
}