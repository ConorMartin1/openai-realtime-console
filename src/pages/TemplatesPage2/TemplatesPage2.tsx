// Updated TemplatesPage2.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Button } from 'antd';
import { Presentation, GraduationCap, Users, Briefcase, NotebookText, ArrowRight } from 'lucide-react'
import Banner2 from "../../components/Banner2/banner2";
import Footer from '../../components/Footer/Footer';
import { BentoGrid } from '../../components/BentoGrid/BentoGrid';
import { BentoCard } from '../../components/BentoCard/BentoCard';
import { TemplateCard } from '../../components/CardContents/TemplateCard';
import HeroSection from '../../components/Hero/Hero';
import avatar from '../../assets/AvatarStill.png';

const { Title, Text } = Typography;

const TemplatesPage2 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/settings2');
  };

  return (
    <Layout style={{ background: '#f6f6f6' }}>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Banner2 />

          <HeroSection
            title="Select a template"
            description="Use our list of pre-defined templates or \ncreate your own from scratch"
            imageSrc={avatar}
          />

          <div className="p-8 max-w-6xl mx-auto">
            <div className="mt-12 mb-32">
              <BentoGrid>
                {/* First Row */}
                <BentoCard width="third" height="tall" bgColor="#cc7c5e">
                  <TemplateCard
                    icon={
                      <Presentation />
                    }
                    title="School presentation"
                    textColor="gray-600"
                  />
                </BentoCard>

                <BentoCard
                  width="third"
                  height="tall"
                  bgColor="#BFC0BB"
                >
                  <TemplateCard
                    icon={
                      <GraduationCap />
                    }
                    title="University lecture"
                    textColor="gray-600"
                  />
                </BentoCard>

                <BentoCard
                  width="third"
                  height="tall"
                  bgColor="#f5e6d3"
                >
                  <TemplateCard
                    icon={
                      <Users />
                    }
                    title="Conference talk"
                    textColor="gray-600"
                  />
                </BentoCard>

                {/* Second Row */}
                <BentoCard
                  width="half"
                  height="tall"
                  bgColor="#f5e6d3"
                >
                  <TemplateCard
                    icon={
                      <Briefcase />
                    }
                    title="Job interview"
                    textColor="gray-600"
                  />
                </BentoCard>

                <BentoCard
                  width="half"
                  height="tall"
                  bgColor="#cca484"
                >
                  <TemplateCard
                    icon={
                      <NotebookText />
                    }
                    title="Board meeting"
                  />
                </BentoCard>
              </BentoGrid>

              <div className="pt-24">
                <div className="flex justify-center">
                  <Button
                    type="primary"
                    size="large"
                    style={{ background: '#000000' }}
                    onClick={handleClick}
                  >
                    Create your own template <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="w-full">
          <Footer />
        </footer>
      </div>
    </Layout>
  );
};

export default TemplatesPage2;