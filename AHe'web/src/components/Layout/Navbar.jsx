import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${props => props.theme.colors.background};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: ${props => props.theme.colors.primary};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: ${props => props.theme.colors.background};
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: ${props => props.theme.colors.text};
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: ${props => props.theme.colors.text};

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <NavbarWrapper>
      <NavContent>
        <Logo to="/">我的网站</Logo>
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </MenuButton>
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/">首页</NavLink>
          <NavLink to="/about">关于我</NavLink>
          <NavLink to="/collections">收藏</NavLink>
          <NavLink to="/guestbook">留言板</NavLink>
        </NavLinks>
        <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </ThemeToggle>
      </NavContent>
    </NavbarWrapper>
  );
};

export default Navbar; 