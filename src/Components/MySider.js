import React, { Component } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, UserOutlined, SettingOutlined, AccountBookTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;

export default function MySider() {
    return (
        <Menu

            style={{ width: 180 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <UserOutlined />
                        <span>Account</span>
                    </span>
                }
            >
                <Menu.Item key="1">Profiles</Menu.Item>
                <Menu.Item key="2">Sign Out</Menu.Item>
                <SubMenu key="sub3" title="Orders">
                    <Menu.Item key="3">Paid</Menu.Item>
                    <Menu.Item key="4">Unpaid</Menu.Item>
                </SubMenu>
            </SubMenu>
            <SubMenu key="sub2" icon={<AccountBookTwoTone />} title="Cart">
                <Menu.Item key="5">Cart</Menu.Item>
                <Menu.Item key="6">Favorites</Menu.Item>

            </SubMenu>
            <SubMenu
                key="sub4"
                title={
                    <span>
                        <SettingOutlined />
                        <span>Settings</span>
                    </span>
                }
            >
                <Menu.Item key="7">Setting</Menu.Item>
                <Menu.Item key="8">Help</Menu.Item>
                <Menu.Item key="9">Contact Us</Menu.Item>
            </SubMenu>
        </Menu>
    )
}