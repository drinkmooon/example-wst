import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

import CarList from './CarList';
import MySider from './MySider';
const { Header, Content, Footer, Sider } = Layout;

export default function HomePage() {
    return (
        <div>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">Popular Vehicles</Menu.Item>
                        <Menu.Item key="2">Vehicle Ranking</Menu.Item>
                        <Menu.Item key="3">Latest Vehicles</Menu.Item>
                    </Menu>
                </Header>
                <Layout className="layout">
                    <Sider width={180} className="site-layout-background">
                        <MySider />
                    </Sider>
                    <Layout>
                        <Content className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}>
                            <CarList />
                        </Content>
                    </Layout>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Homework Example</Footer>
            </Layout></div>
    )
}
