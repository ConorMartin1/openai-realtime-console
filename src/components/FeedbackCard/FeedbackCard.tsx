import React from "react";
import { Card, Typography } from "antd";
import { CheckCircleOutlined, WarningOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface FeedbackCardProps {
    title: string;
    value: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ title, value }) => {
    let IconComponent = null;
    const status = typeof value === "string" ? value.split(":")[0].trim() : "";
    if (status === "Great") {
        IconComponent = <CheckCircleOutlined style={{ fontSize: "24px", color: "#52c41a" }} />;
    } else if (status === "Good") {
        IconComponent = <WarningOutlined style={{ fontSize: "24px", color: "#faad14" }} />;
    } else {
        IconComponent = <CloseCircleOutlined style={{ fontSize: "24px", color: "#ff4d4f" }} />;
    }

    let prefix = '';
    let trimmedPrefix = '';
    try {
        if (value.startsWith('Great: ')) {
            prefix = 'Great: ';
            trimmedPrefix = 'Great';
        } else if (value.startsWith('Good: ')) {
            prefix = 'Good: ';
            trimmedPrefix = 'Good';
        } else if (value.startsWith('Could be better: ')) {
            prefix = 'Could be better: ';
            trimmedPrefix = 'Could be better';
        }
    
        // Remove the prefix from the main paragraph
        value = value.replace(prefix, '');
    } catch (error) {
        console.error('An error occurred while processing the value:', error);
    }
    

    return (
        <Card
            bordered={false}
            style={{
                background: "#f6f6f6",
                padding: "16px",
                borderRadius: 16,
                width: "100%", 
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
                height: "100%",
            }}
        >
            {/* Icon above the title */}
            <div style={{ marginBottom: "8px" }}>{IconComponent}</div>
            {/* Title */}
            <Title level={5} style={{ marginBottom: 8 }}>
                {title}
            </Title>
            {/* Feedback Value */}
            <Text style={{ fontWeight: "bold" }}>{trimmedPrefix}</Text><br />
            <Text>{value}</Text>
        </Card>
    );
};

export default FeedbackCard;
