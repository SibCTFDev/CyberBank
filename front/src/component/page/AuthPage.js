import { useState } from 'react';
import {Button, Grid2 as Grid, TextField, CircularProgress} from '@mui/material';
import { postLogin } from '../../requests';


function AuthPage (props) {
    const {setAuthorized} = props;

    const [userInput, setUserInput] = useState({
        login: '',
        password: '',
        error: ''
    });
    const [loading, setLoading] = useState(false);

    const changeUserInput = (data, value) => 
        setUserInput({...userInput, [data]: value});

    const loginChangeHandler = (event) => 
        changeUserInput('login', event.target.value);

    const passwordChangeHandler = (event) => 
        changeUserInput('password', event.target.value);

    const login = () => {
        setLoading(true); 
        postLogin({
            data: userInput,
            handler: () => {
                setAuthorized(true);
                setLoading(false);
            },
            excHandler: (err) => {
                if (err.response.status !== 200) {
                    changeUserInput('error', err.response.data.detail);
                    setLoading(false);
                };
            }
        });
    };

    const loadingVisible = loading ? "visible" : "hidden";

    return (
        <Grid
            container
            spacing="12px"
            className="AuthPageGrid"
            direction="column"
            sx={{bgcolor: "color.secondary"}}
        >
            <Grid item>
                <img src={"/logo.png"} alt="Logo" width={120}/>
            </Grid>
            <Grid className="AuthLabel" item sx={{color: "color.text"}}>
                SIGN IN TO CYBERBANK
            </Grid>
            <Grid
                className="AuthTextGrid"
                item
                sx={{
                    position: "relative",
                    bgcolor: "color.background",
                    border: 1,
                    borderColor: "color.text"
                }}
            >
                <Grid 
                    container 
                    direction="column"
                    alignItems="flex-end"
                >
                    <Grid item className="AuthGridField">
                        <TextField
                            onChange={loginChangeHandler}
                            label={"Name"}
                            value={userInput.login}
                            size="small"
                            fullWidth
                        />
                    </Grid>
                    <Grid item className="AuthGridField">
                        <TextField
                            onChange={passwordChangeHandler}
                            label={"Password"}
                            value={userInput.password}
                            helperText={userInput.error}
                            type="password"
                            size="small"
                            fullWidth
                        />
                    </Grid>
                    <Grid item className="AuthGridField">
                        <Button
                            variant="outlined"
                            onClick={()=> {setAuthorized(true)}}
                            fullWidth
                        >
                            Sign in
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            className="SignUpButton"
                            variant="outlined"
                            onClick={()=> {setAuthorized(true)}}
                        >
                            Sign up
                        </Button>
                    </Grid>
                </Grid>
                
                <Grid
                    className="AuthLoading"
                    sx={{visibility: loadingVisible}}
                >
                    <CircularProgress 
                        size={50} 
                        sx={{
                            color: 'text.medium',
                            marginBottom: "20px",
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AuthPage;