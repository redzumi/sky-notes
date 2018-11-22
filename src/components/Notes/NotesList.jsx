import React from 'react';
import PropTypes from 'prop-types';

import Note from './Note';

const NotesList = ({ notes, onNoteDelete }) => (notes.length > 0 ? (
  notes.map(note => (
    <Note
      key={note.id}
      data={note}
      onNoteDelete={() => {
        onNoteDelete(note);
      }}
    />
  ))
) : (
  <span>List is empty...</span>
));

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  onNoteDelete: PropTypes.func.isRequired,
};

export default NotesList;
