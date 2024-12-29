import styled from '@emotion/styled';
import Navbar from './Navbar';
import Footer from './Footer';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 60px; // 为固定导航栏留出空间
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout; 