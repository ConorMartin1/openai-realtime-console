import React from 'react';
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import avatarImage from '../../assets/AvatarStill.png';

const Banner2 = () => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            className="aspect-square rounded-full hover:scale-105 transition-transform"
                            src={avatarImage}
                            alt="Spark logo"
                            style={{
                                objectFit: 'cover',
                                width: '40px',
                                height: '40px',
                                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)'
                            }}
                        />
                    </div>

                    <Dropdown overlay={<DropdownMenu />}>
                        <a className="ant-dropdown-link dropdownLink" href="#">
                            Pages <DownOutlined style={{ color: 'black' }} />
                        </a>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
};

export default Banner2;