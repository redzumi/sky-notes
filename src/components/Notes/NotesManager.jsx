import React from 'react';

import {
  Tabs, Spin, Divider, Button,
} from 'antd';
import NotesList from './NotesList';
import CreateNoteForm from './CreateNoteForm';
import APIClient from '../../helpers/apiClient';
import { Levels } from '../../helpers/constants';

const { TabPane } = Tabs;

const API = new APIClient({
  host: 'localhost',
  port: 3001,
});

class NotesManager extends React.Component {
  state = {
    notes:
      window && window.__INITIAL_STATE__ ? window.__INITIAL_STATE__.notes : [],
    fetching: !(window && window.__INITIAL_STATE__),
    creating: false,
  };

  componentDidMount() {
    if (!window.__INITIAL_STATE__ || !window.__INITIAL_STATE__.notes) {
      this.fetchNotes();
    }
  }

  fetchNotes = async () => {
    const notes = await API.getNotes();
    this.setState({ notes, fetching: false });
  };

  toggleCreatingForm = () => {
    const { creating } = this.state;
    this.setState({ creating: !creating });
  };

  createNote = async (note) => {
    const { notes } = this.state;
    this.setState({ fetching: true, creating: false });
    await API.saveNote(note);
    this.setState({ notes: [...notes, note], fetching: false });
  };

  deleteNote = async (note) => {
    const { notes } = this.state;
    const newNotes = notes.slice();
    newNotes.splice(newNotes.indexOf(note), 1);
    this.setState({ fetching: true });
    await API.deleteNote(note);
    this.setState({ notes: newNotes, fetching: false });
  };

  renderLevelNotes = (level) => {
    const { notes, fetching } = this.state;
    const levelNotes = notes.filter(note => parseInt(note.level) === level);
    return (
      <Spin spinning={fetching} delay={500}>
        <NotesList notes={levelNotes} onNoteDelete={this.deleteNote} />
      </Spin>
    );
  };

  render() {
    const { notes, creating } = this.state;

    if (!notes || typeof notes !== 'object') {
      return <span>Ooops, something went wrong....</span>;
    }

    return (
      <React.Fragment>
        <Button
          icon={creating ? 'rollback' : 'plus'}
          type={creating ? 'danger' : 'dashed'}
          onClick={this.toggleCreatingForm}
        >
          {creating ? 'Cancel' : 'Create new'}
        </Button>
        <Divider />
        {creating ? (
          <CreateNoteForm
            onNoteCreated={this.createNote}
            onCreationCanceled={this.toggleCreatingForm}
          />
        ) : (
          <Tabs defaultActiveKey='1'>
            <TabPane tab='High' key='1'>
              {this.renderLevelNotes(Levels.HIGH)}
            </TabPane>
            <TabPane tab='Middle' key='2'>
              {this.renderLevelNotes(Levels.MIDDLE)}
            </TabPane>
            <TabPane tab='Low' key='3'>
              {this.renderLevelNotes(Levels.LOW)}
            </TabPane>
          </Tabs>
        )}
      </React.Fragment>
    );
  }
}

export default NotesManager;
