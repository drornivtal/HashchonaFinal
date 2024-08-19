
import * as yup from 'yup';
import dayjs from 'dayjs';
import { isFutureDateTime } from './FunctionsUtilities';

const MINIMUM_AGE = 16;
const MAXIMUM_AGE = 120;

const MINIMUM_MINUTES = 30;

// Calculate the minimum and maximum allowed dates:
const minimumAllowedDate = dayjs().subtract(MINIMUM_AGE, 'years');
const maximumAllowedDate = dayjs().subtract(MAXIMUM_AGE, 'years');


export const loginSchema = yup.object({
    community: yup.number().required("שדה זה הינו חובה"),
    phoneNumber: yup.string()
        .required("שדה זה הינו חובה")
        .min(10, "אופס! נראה שפספסת ספרות")
        .matches(/^05\d+$/, 'המספר אינו תקין'),
    password: yup.string()
        .required("שדה זה הינו חובה")
        .min(6, 'הסיסמא אינה תקינה')
        .matches(/^(?=.*[a-z])(?=.*[A-Z]).+$/, 'הסיסמא אינה תקינה')
});

export const registerSchema = yup.object({

    imageUri: yup.string().required("יש להעלות תמונת פרופיל"),
    firstName: yup.string().required("שדה זה הינו חובה").min(2, "יש לכתוב לפחות 2 תווים").matches(/^[\p{L} ]+$/u, 'יש להזין אותיות בלבד'),
    lastName: yup.string().required("שדה זה הינו חובה").min(2, "יש לכתוב לפחות 2 תווים").matches(/^[\p{L} ]+$/u, 'יש להזין אותיות בלבד'),
    gender: yup.string().required('יש לבחור ערך מהרשימה'),

    birthDate: yup.date().required("שדה זה הינו חובה")
        .min(maximumAllowedDate, `הגיל המינימלי לשימוש הינו ${MAXIMUM_AGE}`)
        .max(minimumAllowedDate, `הגיל המינימלי לשימוש הינו ${MINIMUM_AGE}`),

    phoneNumber: yup.string()
        .required("שדה זה הינו חובה")
        .matches(/^05\d+$/, 'המספר חייב להתחיל ב: 05')
        .min(10, "אופס! נראה שפספסת ספרות"),

    password: yup.string().required("שדה זה הינו חובה").min(6, 'יש להזין לפחות 6 תווים').matches(/^(?=.*[a-z])(?=.*[A-Z]).+$/, "הסיסמא חייבת להכיל לפחות אות גדולה ואות קטנה אחת"),
    city: yup.string().required('יש לבחור ערך מהרשימה'),
    street: yup.string().required("שדה זה הינו חובה").min(2, "יש לכתוב לפחות 2 תווים").matches(/^[\p{L} ]+$/u, 'יש להזין אותיות בלבד'),
    homeNumber: yup.string().required("שדה זה הינו חובה")
        .matches(/^[1-9][0-9]*$/, 'השדה אינו תקין'),
    about: yup.string().min(10, 'יש להזין לפחות 10 תווים'),
});

export const newCommunitySchema = yup.object({

    imageUri: yup.string().required("יש להעלות תמונת קהילה"),
    communityName: yup.string().required("שדה זה הינו חובה").min(2, "יש לכתוב לפחות 2 תווים").matches(/^[\p{L} ]+$/u, 'יש להזין אותיות בלבד'),
    city: yup.string().required('יש לבחור ערך מהרשימה'),
    street: yup.string().required("שדה זה הינו חובה").min(2, "יש לכתוב לפחות 2 תווים").matches(/^[\p{L} ]+$/u, 'יש להזין אותיות בלבד'),
    description: yup.string().min(10, 'יש להזין לפחות 10 תווים')
});

export const newRequestSchema = yup.object({   
    category: yup.number().required("יש לבחור קטגוריה לסיוע"),
    dueDate: yup.date().required('יש להזין תאריך יעד'),
    dueTime: yup.date().required('יש להזין שעת יעד'),
    description: yup.string()
        .required('יש לתאר בקצרה את הסיוע המתבקש')
        .min(10, 'יש להזין לפחות 10 תווים')
});


