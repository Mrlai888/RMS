import React from 'react'


import './list.scss'

import { Button, Modal, Form, Input, Radio } from 'antd';

import { findUser} from '../../../api/userApi';


import { changeUsr } from '../../../api/userApi'

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
          title="请写入修改的数据"
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
      let getId = this.props._id.id
      console.log(getId)
      changeUsr(getId,{
        username:values.username,
        gender:values.gender
      }).then((response)=>{

        findUser().then((res)=>{
          this.props.fn(res.data)
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
        <Button type="primary" onClick={this.showModal} icon="edit">
          编辑
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