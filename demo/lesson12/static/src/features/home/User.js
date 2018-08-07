import React, { Component } from 'react';

import { DefaultPage as SignIn } from '../sign-in/index';
import { DefaultPage as SignUp } from '../sign-up/index';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

export default class User extends Component {
  static propTypes = {};

  handleTabTileChange(key) {
    console.log(key);
  }

  render() {
    return (
      <div className="home-user">
        <Tabs
          defaultActiveKey="1"
          size="large"
          type="card"
          onChange={this.handleTabTileChange.bind(this)}
        >
          <TabPane tab="登 录" key="1">
            <SignIn />
          </TabPane>
          <TabPane tab="注 册" key="2">
            <SignUp />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
