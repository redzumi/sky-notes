
import React from 'react'
import PropTypes from 'prop-types'

const NAME = 'Evgeny'
const LOGIN = '@redzumi'
const TIME = Date.now()

const Note = ({ data, onNoteDelete }) => {
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <div className="level">
            <p>
              <strong>{NAME}</strong> <small>{LOGIN}</small>
              <br/>
              {data.text}
            </p>
            </div>
            <div className="level">
              <button className="button" onClick={onNoteDelete}>
                <span><i className="fas fa-trash"></i> Delete</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

Note.propTypes = {
  data: PropTypes.object,
  onNoteDelete: PropTypes.func,
}

export default Note