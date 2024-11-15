import React from "react";
import { Menu } from "antd";

const DropdownMenu: React.FC = () => {
    return (
        <Menu>
            <Menu.Item>
                <a rel="noopener noreferrer" href="/">Home</a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="/console">Console</a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="/settings">Settings</a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="/templates">Templates</a>
            </Menu.Item>
        </Menu>
    );
};

export default DropdownMenu;
