import {createTheme} from '@mui/material/styles';


function useTheme() {
    return createTheme({
        palette: {
            color: {
                primary: " #ff2a6d",
                secondary: " #d1f7ff",
                background: " #05d9e8",
                text: " #01012b",
            }
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {background: " #05d9e8"}
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {color: "#005678"}
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {color: "#005678"}
                }
            }
        }
    });
}

export default useTheme