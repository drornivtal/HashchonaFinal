
// ~~ dates functions: ~~

import { Alert, Snackbar } from "@mui/material";
import dayjs from "dayjs";
import { date } from "yup";

const daysOfWeekInHebrew = [
    "יום א'",
    "יום ב'",
    "יום ג'",
    "יום ד'",
    "יום ה'",
    "יום ו'",
    "יום ש'"
 ];

export const formatPostDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
 };
export const formatDueDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
 };
export const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
 };

export const getDayOfWeekInHebrew = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return daysOfWeekInHebrew[dayOfWeek];
 };

export const isFutureDateTime = (dueDate) => {
    const currentDateTime = new Date();
    console.log('curent: ',currentDateTime);
    const targetDateTime = new Date(dueDate);
    console.log('target: ',targetDateTime);
    // Compare the adjusted targetDateTime with the currentDateTime
    console.log(targetDateTime > currentDateTime);
    return targetDateTime > currentDateTime;
  };

  export const isAtLeast30MinutesAhead = (targetDateTime) => {
    const currentDateTime = new Date();

     const isDifferentDate = !(
      targetDateTime.getFullYear() === currentDateTime.getFullYear() &&
      targetDateTime.getMonth() === currentDateTime.getMonth() &&
      targetDateTime.getDate() === currentDateTime.getDate()
    );
  
    // If different date, return true directly
    if (isDifferentDate) {
      return true;
    }
  
    // Calculate time difference in minutes
    const timeDifferenceInMilliseconds = targetDateTime.getTime() - currentDateTime.getTime();
    const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60); // Convert milliseconds to minutes
  
    // Check if current time is at least 30 minutes ahead of target time
    return timeDifferenceInMinutes >= 30;
  };

  export const calculateAge = (dobString) => {
    const dob = new Date(dobString.split('T')[0]);
    const today = new Date();
  
    const age = today.getFullYear() - dob.getFullYear();
    const isBirthdayPassed = 
      today.getMonth() > dob.getMonth() || 
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  
    return isBirthdayPassed ? age : age - 1;
  };


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// ~~ CommunitiesMap functions: ~~ 
export async function geocodeAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.length > 0) {
            const { lat, lon } = data[0];
            return {
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
            };
        } else {
            throw new Error('Address not found');
        }
    } catch (error) {
        console.error('Error geocoding address:', error);
        throw error;
    }
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// ~~ create url from image file: ~~
export const handleFileChange = (file, setFieldValue) => {
    if (!file) {
        setFieldValue("imageUri", "");
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        setFieldValue("imageUri", reader.result);
        console.log(reader.result);
    };
    reader.onerror = () => {
        console.error("Failed to read file");
        setFieldValue("imageUri", "");
    };
    reader.readAsDataURL(file);
};

export const handleFileChangeGeneral = (file, setStateFunction) => {
    if (!file) {
      setStateFunction(null);
        return;
   }
    const reader = new FileReader();
    reader.onload = () => {
        setStateFunction(reader.result);
        console.log(reader.result);
    };
    reader.onerror = () => {
        console.error("Failed to read file");
        setStateFunction(null);
    };
    reader.readAsDataURL(file);
 };

//~~ General display Functions: ~~
export const createSnackbar = ({ open, message, severity, onClose, autoHideDuration = 4000,
                                 anchorOrigin = { vertical: 'top', horizontal: 'center' } }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
        >
            <Alert onClose={onClose} 
                   severity={severity}>
                   {message}
            </Alert>
        </Snackbar>
    );
};

