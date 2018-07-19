import React from 'react'

import NotesManager from '../Notes/NotesManager'


class Home extends React.Component {
  render () {
    return(
      <section className="section">
        <div className="container page__container">
          <NotesManager />
        </div>
      </section>
    )
  }
}

export default Home