import React from 'react'
import PropTypes from 'prop-types'

import { Levels } from '../../helpers/constants'

class CreateNoteForm extends React.Component {
  state = {
    title: '',
    level: Levels.HIGH,
    text: ''
  }

  handleValueChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.props.onNoteCreated(this.state)
  }

  handleFormCancel = () => {
    this.props.onCreationCanceled();
  }

  render() {
    return (
      <form className="notification" onSubmit={this.handleFormSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input" 
              type="text" 
              placeholder="Title" 
              name='title'
              value={this.state.title}
              onChange={this.handleValueChange}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Level</label>
          <div className="control">
            <div className="select">
              <select name='level' onChange={this.handleValueChange}>
                <option value={Levels.HIGH}>High</option>
                <option value={Levels.MIDDLE}>Middle</option>
                <option value={Levels.LOW}>Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Text</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Text"
              name='text'
              value={this.state.text}
              onChange={this.handleValueChange}
            ></textarea>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button 
              className="button is-text"
              onClick={this.handleFormCancel}
            >Cancel</button>
          </div>
        </div>
      </form>
    )
  }
}

CreateNoteForm.propTypes = {
  onNoteCreated: PropTypes.func,
  onCreationCanceled: PropTypes.func,
}

export default CreateNoteForm