import React from 'react'
import PropTypes from 'prop-types'

import Note from './Note'

const NotesList = ({ notes, onNoteDelete }) => {
  return (
    notes.map(note => (
      <Note 
        key={note.id} 
        data={note} 
        onNoteDelete={() => { onNoteDelete(note) }}  
      />
    ))
  )
}

NotesList.propTypes = {
  notes: PropTypes.array,
  onNoteDelete: PropTypes.func,
}

export default NotesList