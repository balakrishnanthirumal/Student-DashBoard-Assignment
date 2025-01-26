import React from 'react';
import { FaHome } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useLogOut from 'src/hooks/useLogOut';

const MainLayout = () => {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.user);

  if (!auth) navigate('/login');
  return (
    <>
      <div style={{ display: 'inline-flex' }}>
        {auth && <SideBar />}

        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;

const SideBar = () => {
  const { handleLogout } = useLogOut();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Styles
  const styles = {
    container: {
      height: '100vh',
      width: '60px',
      backgroundColor: '#2e3440',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px 0',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
    },
    item: {
      width: '100%',
      padding: '10px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '10px',
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#fff',
      fontSize: '12px',
      transition: 'background-color 0.3s',
      marginTop: '30px',
    },
    itemHover: {
      backgroundColor: '#3b4252',
    },
    icon: {
      fontSize: '20px',
      marginBottom: '5px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Home Link */}
      <Link
        to="/"
        style={styles.item}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = styles.itemHover.backgroundColor)
        }
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <FaHome style={styles.icon} />
        <span>Home</span>
      </Link>

      {/* Logout */}
      <div
        style={styles.item}
        onClick={handleLogoutClick}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = styles.itemHover.backgroundColor)
        }
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <MdLogout style={styles.icon} />
        <span>Logout</span>
      </div>
    </div>
  );
};
