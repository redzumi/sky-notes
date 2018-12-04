import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import Note from './Note';

import styles from './styles.css';

const NotesList = ({ notes, onNoteDelete }) => (notes.length > 0 ? (
  <Row gutter={16}>
    {notes.map(note => (
      <Col span={8} xs={24} md={8} key={note.id}>
        <Note
          data={note}
          onNoteDelete={() => {
            onNoteDelete(note);
          }}
        />
      </Col>
    ))}
  </Row>
) : (
  <div className={styles.empty}>Nothing...</div>
));

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  onNoteDelete: PropTypes.func.isRequired,
};

export default NotesList;
