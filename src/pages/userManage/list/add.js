import React from 'react'


import './list.scss'

import { Button, Modal, Form, Input, Radio } from 'antd';

import {findUser,signUp } from '../../../api/userApi'

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    state={
      gender:1
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="请填写新增的数据"
          okText="确定"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="用户名">
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '请输入用户名' },
                  {type:'email',message:'请输入正确用户名(格式:***@***.com)'}
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码' },
                  {min:6, message:'最少六位数'},
                  {max:12,message:'最大12位数'}
                ],
              })(<Input />)}
            </Form.Item>
            
            <Form.Item label='请选择性别'>
            {getFieldDecorator('gender', {
              rules: [
                { required: true, message: '请选择性别' },
              ],
              initialValue:this.state.gender
            })(
              <Radio.Group >
              <Radio value={1} style={{color:"#1890ff"}}>男</Radio>
              <Radio value={2} style={{color:"#1890ff"}}>女</Radio>
            </Radio.Group>
            )}

          </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });

  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      signUp(values).then((res)=>{
          findUser().then((response)=>{
          this.props.add(response.data)
        })
      })

      
      console.log('Received values of form: ', values);


      form.resetFields();
      this.setState({ visible: false });
    });
  };

  

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal} icon="plus" block>
        新增用户
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage