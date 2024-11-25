import React from "react";
import { Card, Typography } from "antd";
import { CheckCircleOutlined, WarningOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface FeedbackCardProps {
  title: string;
  value: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ title, value }) => {
  // Determine the icon based on the feedback value
  let IconComponent = null;
  const status = typeof value === "string" ? value.split(":")[0].trim() : "";
  if (status === "Great") {
    IconComponent = <CheckCircleOutlined style={{ fontSize: "24px", color: "#52c41a" }} />;
  } else if (status === "Good") {
    IconComponent = <WarningOutlined style={{ fontSize: "24px", color: "#faad14" }} />;
  } else {
    IconComponent = <CloseCircleOutlined style={{ fontSize: "24px", color: "#ff4d4f" }} />;
  }

  return (
    <Card
      bordered={false}
      style={{
        background: "#f6f6f6",
        padding: "16px",
        borderRadius: 16,
        width: "100%", // Ensures the card takes the full width of the column
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Keeps content evenly spaced
        textAlign: "center", // Centers the content
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
      <Text>{value}</Text>
    </Card>
  );
};

export default FeedbackCard;
