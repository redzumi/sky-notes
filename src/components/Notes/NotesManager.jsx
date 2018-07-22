import React from 'react'

import NotesList from '../Notes/NotesList'
import CreateNoteForm from '../Notes/CreateNoteForm'
import APIClient from '../../helpers/apiClient'
import { Levels } from '../../helpers/constants'

require('./styles.css')

const API = new APIClient({
  host: 'localhost',
  port: 3001,
})

class NotesManager extends React.Component {
  state = {
    notes: (window && window.__INITIAL_STATE__) ? window.__INITIAL_STATE__.notes : [],
    isFetching: (window && window.__INITIAL_STATE__) ? false : true,
    currentLevel: Levels.HIGH,
    showNoteForm: false,
  }

  componentDidMount() {
    if (!window.__INITIAL_STATE__ || !window.__INITIAL_STATE__.notes) {
      this.fetchNotes()
    }
  }

  fetchNotes = async () => {
    const notes = await API.getNotes()
    this.setState({ notes: notes, isFetching: false })
  }

  handleNoteCreate = async (note) => {
    const newNotes = [ ...this.state.notes, note ]
    this.setState({ isFetching: true })
    await API.saveNote(note)
    this.setState({ notes: newNotes, isFetching: false })
  }

  filterNotesByLevel = (notes, level) => {
    return notes.filter(note => note.level == level)
  }

  createLevelTab = (level, text) => {
    const className = this.state.currentLevel == level ? 'is-active' : '';
    return (
      <li className={className} onClick={() => this.handleLevelChange(level)}>
        <a>{text}</a>
      </li>
    )
  }

  handleLevelChange = (level) => {
    this.setState({ currentLevel: level })
  }

  handleToggleNoteForm = () => {
    this.setState({ showNoteForm: !this.state.showNoteForm })
  }

  handleNoteDelete = async (note) => {
    const newNotes = this.state.notes.slice()
    newNotes.splice(newNotes.indexOf(note), 1)
    this.setState({ isFetching: true })
    await API.deleteNote(note)
    this.setState({ notes: newNotes, isFetching: false })
  }

  saveToJSON = () => {
    window.prompt('Copy your JSON:', JSON.stringify(this.state.notes));
  }

  loadFromJSON = () => {
    const loadedJSON = window.prompt('Your JSON:');
    if (loadedJSON) {
      const notes = JSON.parse(loadedJSON);
      this.setState({ notes: notes })
      // TODO: Save new notes state
    }
  }

  render () {
    const { notes, currentLevel } = this.state

    if (!notes || typeof notes !== 'object') {
      return (<span>Ooops, something went wrong....</span>)
    }

    const filteredNotes = this.filterNotesByLevel(notes, currentLevel)
    
    return(
      <div>
        <div className="level">
          <div className="level-left">
            <button
              className="button" 
              onClick={this.handleToggleNoteForm}
            >{this.state.showNoteForm ? 'Cancel' : 'Add'}</button>
          </div>
          <div className="level-right">
            <button
              className="button level-item" 
              onClick={this.loadFromJSON}
            >Load</button>
            <button
              className="button level-item" 
              onClick={this.saveToJSON}
            >Save</button>
          </div>
        </div>
        {(this.state.showNoteForm) && (
          <CreateNoteForm 
            onNoteCreated={this.handleNoteCreate}
            onCreationCanceled={this.handleToggleNoteForm}
          />
        )}
        <div className="tabs is-centered">
          <ul>
            {this.createLevelTab(Levels.HIGH, 'High')}
            {this.createLevelTab(Levels.MIDDLE, 'Middle')}
            {this.createLevelTab(Levels.LOW, 'Low')}
          </ul>
        </div>
        {
          (this.state.isFetching)
          ? <span>Loading...</span>
          : <NotesList notes={filteredNotes} onNoteDelete={this.handleNoteDelete}/>
        }
      </div>
    )
  }
}

export default NotesManager