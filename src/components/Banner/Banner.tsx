import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { Menu, Dropdown, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Banner: React.FC = () => {
    return (
        <div className="banner">
            <Title level={1} className="bannerTitle">SpeechCraft</Title>
            <Dropdown overlay={<DropdownMenu />}>
                <a className="ant-dropdown-link dropdownLink" href="#">
                    Pages <DownOutlined />
                </a>
            </Dropdown>
        </div>
    );
};

export default Banner;