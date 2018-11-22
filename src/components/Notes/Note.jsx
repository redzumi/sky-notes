import React from 'react';
import PropTypes from 'prop-types';

const NAME = 'Evgeny';
const LOGIN = '@redzumi';

const Note = ({ data, onNoteDelete }) => (
  <div className='box'>
    <article className='media'>
      <div className='media-content'>
        <div className='content'>
          <div className='level'>
            <p>
              <strong>{NAME} </strong>
              <small>{LOGIN}</small>
              <br />
              <b>{data.title}</b>
              <br />
              {data.text}
            </p>
          </div>
          <div className='level'>
            <button className='button' type='button' onClick={onNoteDelete}>
              <span>
                <i className='fas fa-trash' />
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
);

Note.propTypes = {
  data: PropTypes.object.isRequired,
  onNoteDelete: PropTypes.func.isRequired,
};

export default Note;
