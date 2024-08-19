
import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home as HomeIcon, HomeOutlined as HomeOutlinedIcon, AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon, AddCircleOutlined as AddCircleOutlinedIcon, PersonOutlineOutlined as PersonOutlineOutlinedIcon, Person as PersonIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavigationBar() {
    const location = useLocation();
    const navigate = useNavigate();

    const regularModeObj ={
        backForEdit:false,
        bgColor:'#9274B2',
        inpCssId: 'inpRequestDiscription',
        btnCssId: 'btnCreateNewRequest',
        btnText: '!יאלה, לעזור',
        color:'white'
    };
    const handleNavigation = (path, obj) => {
        if (path === '/NewRequest') {
            obj = regularModeObj;  // Ensure regular mode object is used
        }
        navigate(path, { state: obj });
    };

    return (
        <BottomNavigation showLabels={false} sx={{ backgroundColor: '#bda8dd', borderTop: '1px solid #9274B2',width:'100vw',marginLeft:'-4vw' }}>
            <BottomNavigationAction
                // icon={<HomeIcon sx={{ fontSize: '2rem' }} />}
                icon={location.pathname === '/Home' ? <HomeIcon sx={{ fontSize: '1.9rem' }} /> : <HomeOutlinedIcon sx={{ fontSize: '1.9rem' }} />}
                onClick={() => handleNavigation('/Home',null)}
                selected={location.pathname === '/Home'}
            />
            <BottomNavigationAction
                icon={location.pathname === '/NewRequest' ? <AddCircleOutlinedIcon sx={{ fontSize: '1.9rem' }} /> : <AddCircleOutlineOutlinedIcon sx={{ fontSize: '1.9rem' }} />}
                onClick={() => handleNavigation('/NewRequest',regularModeObj)}
                selected={location.pathname === '/NewRequest'}
            />
            <BottomNavigationAction
                icon={location.pathname === '/Profile' ? <PersonIcon sx={{ fontSize: '1.9rem' }} /> : <PersonOutlineOutlinedIcon sx={{ fontSize: '1.9rem' }} />}
                onClick={() => handleNavigation('/Profile',null)}
                selected={location.pathname === '/Profile'}
            />
        </BottomNavigation>
    );
};


