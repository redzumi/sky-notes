import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'antd';

import styles from './styles.css';

export default class Note extends PureComponent {
  renderCardPanel = () => {
    const { onNoteDelete } = this.props;
    return (
      <React.Fragment>
        <Button
          icon='delete'
          style={{ color: '#f5222d' }}
          onClick={onNoteDelete}
        />
      </React.Fragment>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <div className={styles.note}>
        <Card
          title={data.title}
          bordered={false}
          extra={this.renderCardPanel()}
        >
          <p>{data.text}</p>
        </Card>
      </div>
    );
  }
}

Note.propTypes = {
  data: PropTypes.object.isRequired,
  onNoteDelete: PropTypes.func.isRequired,
};
