import React from 'react'

import NotesList from '../Notes/NotesList'
import CreateNoteForm from '../Notes/CreateNoteForm'
import { getNotes, saveNotes } from '../../helpers/db'
import { Levels } from '../../helpers/constants'

import './styles.css'

class NotesManager extends React.Component {
  state = {
    notes: getNotes(),
    currentLevel: Levels.HIGH,
    showNoteForm: false,
  }

  handleNoteCreate = (note) => {
    const newNotes = [ ...this.state.notes, note ]
    this.setState({ notes: newNotes })
    saveNotes(newNotes)
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

  handleNoteDelete = (note) => {
    const newNotes = this.state.notes.slice()
    newNotes.splice(newNotes.indexOf(note), 1)
    this.setState({ notes: newNotes })
    saveNotes(newNotes)
  }

  render () {
    const { notes, currentLevel } = this.state
    const filteredNotes = this.filterNotesByLevel(notes, currentLevel)
    return(
      <div>
        <div className="level">
          <div className="level-left">
          </div>
          <div className="level-right">
            <a
            className="button" 
            onClick={this.handleToggleNoteForm}
            >{this.state.showNoteForm ? 'Cancel' : 'Add'}</a>
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
        <NotesList notes={filteredNotes} onNoteDelete={this.handleNoteDelete}/>
      </div>
    )
  }
}

export default NotesManager