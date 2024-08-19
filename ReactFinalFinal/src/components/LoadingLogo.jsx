

import React from 'react';
import { Box, keyframes } from '@mui/material';
import LogoHashcuna_Black from './LogoHashcuna_Black';

// Define the animation for the dots
const jumpDots = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const LoadingLogo = () => {
  const dotColor = '#BAA1D4'; // Single color for all dots

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    {/* Logo Svg Box */}
  <Box
  sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '20vh',
  }}>
  <LogoHashcuna_Black  sx={{height:'20vh', width: '60vw'}} />
</Box> 

      {/* Dots container */}
      <Box sx={{ display: 'flex', mt: 2 }}>
        {[...Array(3)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              backgroundColor: dotColor,
              borderRadius: '50%',
              marginX: 0.5,
              animation: `${jumpDots} 1.1s ease-in-out infinite`, // Adjusted animation speed
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LoadingLogo;

  