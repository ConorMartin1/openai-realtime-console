import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Typography, Button, Card, Space, Layout, Image, Row, Col } from 'antd';
import { Brain, Mic, FileText } from 'lucide-react';
import Banner2 from "../../components/Banner2/banner2";
import { motion, AnimatePresence } from 'framer-motion';
import avatar from '../../assets/AvatarStill.png';
import Footer from '../../components/Footer/Footer'

const { Title, Text } = Typography;
const { Content } = Layout;

interface ProductCardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonType?: "default" | "primary";
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    description,
    buttonText,
    buttonType = "default"
}) => (
    <Card
        bordered={false}
        style={{
            borderRadius: 16,
            background: '#ffffff',
            width: '400px',
            height: '200px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
        }}
        bodyStyle={{
            height: '100%',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <Space direction="vertical" size={12} style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Title level={3} style={{ margin: 0, fontSize: 24 }}>
                {title}
            </Title>
            <Text style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)' }}>
                {description}
            </Text>
            <Link to="/templates2" style={{ marginTop: 'auto', textDecoration: 'none' }}>
                <Button
                    type={buttonType}
                    size="large"
                    block
                    style={{
                        borderRadius: 8,
                        height: 48,
                        backgroundColor: buttonType === 'primary' ? '#000' : '#fff',
                    }}
                >
                    {buttonText}
                </Button>
            </Link>
        </Space>
    </Card>
);

interface FeatureCardProps {
    title: string;
    description?: string;
    icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
    <Card
        bordered={false}
        style={{
            background: '#f6f6f6',
            padding: '24px',
            borderRadius: 25,
            height: '250px',
            display: 'flex',
            flexDirection: 'column',
        }}
        bodyStyle={{
            height: '100%',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <Space direction="vertical" size={12} style={{ flex: 1 }}>
            <div style={{ fontSize: '24px', color: '#1890ff' }}>
                {icon}
            </div>
            <Title level={3} style={{ margin: '8px 0', fontSize: 24 }}>
                {title}
            </Title>
            {description && <Text style={{ color: '#666' }}>{description}</Text>}
        </Space>
    </Card>
);

const FeatureSection: React.FC = () => (
    <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Row gutter={[36, 24]}>
            <Col span={8}>
                <FeatureCard
                    icon={<Brain size={32} color="#6A6A6A" />}
                    title="Intelligent analysis"
                    description="Get advice on how to deliver your message, structure your content, and keep your audience engaged. Our recommendations are based on proven best practices for effective presentations."
                />
            </Col>
            <Col span={8}>
                <FeatureCard
                    icon={<Mic size={32} color="#6A6A6A" />}
                    title="Real-time feedback"
                    description="As you practice, our AI listens and analyses your pace, tone, and clarity in real-time. You'll get instant feedback to help you refine your delivery on the spot."
                />
            </Col>
            <Col span={8}>
                <FeatureCard
                    icon={<FileText size={32} color="#6A6A6A" />}
                    title="Upload your documents"
                    description="Simply upload your slides and files to our platform. We'll use it to create an in-depth analysis of both your content and delivery."
                />
            </Col>
        </Row>
    </div>
);

const RotatingText = () => {
    const words = ["presentation", "job interview", "conference talk", "board meeting"];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.025, delayChildren: 0.1 }
        }),
        exit: {
            opacity: 0,
            transition: { duration: 0.2 }
        }
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "tween", // Changed from spring to tween
                duration: 0.1
            },
        },
        hidden: {
            opacity: 0,
            x: -5, // Reduced movement distance
            transition: {
                type: "tween", // Changed from spring to tween
                duration: 0.1
            },
        },
    };

    return (
        <span style={{ display: 'inline-block', minWidth: '300px', position: 'relative', color: '#6A6A6A' }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[currentIndex]}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                        display: 'inline-block',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {words[currentIndex].split("").map((letter, index) => (
                        <motion.span
                            key={index}
                            variants={child}
                            style={{
                                display: 'inline-block',
                                marginRight: letter === " " ? "0.3em" : undefined
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

const HomePage2: React.FC = () => {
    const navigate = useNavigate();

    const handleAvatarClick = () => {
        navigate('/console');
    };

    return (
        <Layout style={{ background: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Banner2 />
            <Content style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Hero Section */}
                <section style={{
                    borderBottom: '1px solid #eaeaea',
                    padding: '120px 24px 96px 24px',
                    background: '#f0efea'
                }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
                        <Space direction="vertical" size={16} style={{ width: '100%' }}>
                            <div>
                                <Title level={1} style={{ fontSize: 48, marginBottom: 24 }}>
                                    AI that helps you prepare
                                    <br />for your <RotatingText />
                                </Title>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '170px'
                            }}>
                                <ProductCard
                                    title="Get started"
                                    description="Our intelligent AI model will give you feedback on what you did well and how to improve."
                                    buttonText="Talk to Spark"
                                    buttonType="primary"
                                />
                                {/* change with the alt avatar instead */}
                                <Image
                                    alt="Centered Image"
                                    src={avatar}
                                    preview={false}
                                    onClick={handleAvatarClick}
                                    style={{
                                        objectFit: 'cover',
                                        cursor: 'pointer',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                        width: '250px',
                                        height: '250px',
                                        borderRadius: '50%',
                                        transition: 'transform 0.2s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                        </Space>
                    </div>
                </section>

                {/* Features Section */}
                <section style={{
                    background: '#ffffff',
                    padding: '96px 24px',
                    marginBottom: '96px'  // Added significant margin bottom
                }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '48px'
                    }}>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '600',
                            color: '#111827',
                            marginBottom: '16px'
                        }}>
                            Features
                        </h2>
                        <p style={{
                            fontSize: '1.125rem',
                            color: '#6B7280',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Everything you need to perfect your presentation skills
                        </p>
                    </div>
                    <FeatureSection />
                </section>

                {/* Footer Section */}
                <Footer />
            </Content>
        </Layout>
    );
};

export default HomePage2;