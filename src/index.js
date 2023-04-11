import {ThemeProvider} from "@mui/material";
import {SnackbarProvider} from "notistack";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {IdProvider} from "react-use-id-hook";
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import dotenv from 'dotenv'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
dotenv.config()
/*
 * This is a document meant to contain any palette variables for things like primary colours or whatever.
 * */
import { createTheme, adaptV4Theme } from "@mui/material/styles";
import { yellow, green, lightGreen, grey } from "@mui/material/colors";

const LogoColour = "#82c926";

/**
 * Primary or main theme colour
 * @type {{light: string, dark: string, main: string, text: string}}
 */
const Primary = {
    main: lightGreen[500],
    dark: "#5a9216",
    light: "#bef67a",
    text: "#333333",
};
/**
 * Secondary or accent colour
 * @type {{light: string, dark: string, main: string, text: string}}
 */
const Secondary = {
    main: "#26c6da",
    dark: "#0095a8",
    light: "#6ff9ff",
    text: "#000000",
};
 const ButtonStateColours = {
    Warning: {
        main: yellow["800"],
        dark: "#c17900",
        light: "#ffd95a",
        text: "#000000",
    },
    Error: {
        main: "#b00020",
        dark: "#790000",
        light: "#e94948",
        text: "#FFFFFF",
    },
    Engaged: {
        main: green[700],
        dark: "#00600f",
        light: "#6abf69",
        text: "#000000",
    },
    StandBy: Primary,
    Sleep: {
        main: lightGreen[300],
        dark: "#7da453",
        light: "#e1ffb1",
        text: "#000000",
    },
    Disabled: {
        main: grey[400],
        dark: "#8d8d8d",
        light: "#efefef",
        text: "#000000",
    },
    Off: {
        main: grey[700],
        dark: "#373737",
        light: "#8e8e8e",
        text: "#FFFFFF",
    },
    Unknown: {
        main: grey[400],
        dark: "#8d8d8d",
        light: "#efefef",
        text: "#000000",
    },
};

const MUItheme = createTheme({
    palette: {
        primary: Primary,
        secondary: Secondary,
        warning: ButtonStateColours.Warning,
        info: {
            main: "#e0e0e0",
            dark: "#8d8d8d",
            light: "#efefef",
            text: "#000000",
        },
        dark: {
            main: "#373737",
            dark: "#1c1c1c",
            light: "#8d8d8d",
            text: "#ffffff",
        },
    },
    typography: {
        h1: {
            fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
            fontWeight: 300,
            fontSize: "2.8rem",
            lineHeight: 1.167,
            letterSpacing: "-0.015em",
        },
        h2: {
            fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
            fontWeight: 300,
            fontSize: "1.7rem",
            lineHeight: 1.1,
            letterSpacing: "0.0015em",
        },
        h3: {
            fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
            fontWeight: 500,
            fontSize: "1.5rem",
            lineHeight: 1.15,
            letterSpacing: "0.0015em",
        },
        h4: {
            fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
            fontWeight: 500,
            fontSize: "1.25rem",
            lineHeight: 1.2,
            letterSpacing: "0.0075em",
        },
        h5: {
            fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
            fontWeight: 400,
            fontSize: "1.25rem",
            lineHeight: 1.2,
            letterSpacing: "0.0075em",
        },
        h6: {
            fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.2,
            opacity: 0.9,
            letterSpacing: "0.0075em",
        },
        overline: {
            fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
            fontWeight: 800,
            fontSize: "0.8rem",
            opacity: 0.95,
            letterSpacing: "0.11em",
        },
    },
    spacing: (factor) => `${0.25 * factor}rem`,
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    paddingLeft: "0.7rem",
                    paddingRight: "0.7rem",
                }
            },
        },
    },
});


ReactDOM.render(
    <Router>
        <ThemeProvider theme={MUItheme}>
            <DndProvider backend={HTML5Backend}>
                <SnackbarProvider maxSnack={3}>
                    <IdProvider>
                        <App title={"My Title"}/>
                    </IdProvider >
                </SnackbarProvider>
            </DndProvider>
        </ThemeProvider>
    </Router>,
    document.getElementById('root')
);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
