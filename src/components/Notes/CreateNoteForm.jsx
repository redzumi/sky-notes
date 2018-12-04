import React from 'react';
import PropTypes from 'prop-types';

import {
  Form, Radio, Input, Button,
} from 'antd';
import { Levels } from '../../helpers/constants';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
    md: {
      offset: 6,
    },
  },
};

class CreateNoteForm extends React.Component {
  state = {
    title: '',
    text: '',
    level: Levels.HIGH,
  };

  handleValueChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleFormSubmit = (e) => {
    const { onNoteCreated } = this.props;
    e.preventDefault();
    onNoteCreated(this.state);
  };

  handleFormCancel = () => {
    const { onCreationCanceled } = this.props;
    onCreationCanceled();
  };

  render() {
    const { title, text, level } = this.state;
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <FormItem {...formItemLayout} label='Title'>
          <Input
            placeholder='Basic usage'
            value={title}
            name='title'
            onChange={this.handleValueChange}
          />
        </FormItem>
        <FormItem {...formItemLayout} label='Text'>
          <TextArea
            rows={4}
            value={text}
            name='text'
            onChange={this.handleValueChange}
          />
        </FormItem>
        <FormItem {...formItemLayout} label='Level'>
          <RadioGroup
            defaultValue={level}
            name='level'
            onChange={this.handleValueChange}
          >
            <RadioButton value={Levels.HIGH}>High</RadioButton>
            <RadioButton value={Levels.MIDDLE}>Middle</RadioButton>
            <RadioButton value={Levels.LOW}>Low</RadioButton>
          </RadioGroup>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </FormItem>
      </Form>
    );
  }
}

CreateNoteForm.propTypes = {
  onNoteCreated: PropTypes.func.isRequired,
  onCreationCanceled: PropTypes.func.isRequired,
};

export default CreateNoteForm;
