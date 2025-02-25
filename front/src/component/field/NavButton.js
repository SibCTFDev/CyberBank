import {Grid2 as Grid, Button, Divider} from "@mui/material";


function NavButton(props) {
    const {text, handler, disableDivider} = props;

    const divider = disableDivider ? null : (
        <Divider 
            orientation="vertical" 
            variant="middle" 
            sx={{bgcolor: "#01012b", height:"25px", marginTop:"15px"}}
            flexItem 
        />
    )

    return (
        <Grid
            container
            alignItems="center"
        >
            <Button sx={{color: "#01012b"}} onClick={handler}>{text}</Button>
            {divider}
        </Grid>
    );
}

export default NavButton;