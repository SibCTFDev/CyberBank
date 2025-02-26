import {Component} from "react";
import {Button, Grid2 as Grid, TextField} from '@mui/material';


class ProductPage extends Component {
    renderText(label, multiline, handler) {
        const slotProps = multiline ? 
        { htmlInput: {
            maxLength: 200,
        }} : 
        { htmlInput: {
            maxLength: 30,
        }};

        return (
            <TextField
                label={label}
                fullWidth
                multiline={multiline}
                slotProps={{...slotProps}}
                onChange={handler}
            />
        );
    }
    
    render() {
        const createHandler = () => {
            alert("created");
        }

        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                className="PageFrame"
                sx={{bgcolor: "color.secondary"}}
            >   
                <Grid item sx={{width: "50%"}}>
                    <Grid 
                        container 
                        direction="column"
                        spacing="12px" 
                        sx={{
                            padding: "12px",
                            border: "1px solid",
                            borderColor: "color.text",
                            bgcolor: "color.background",
                        }}
                    >
                        <Grid item sx={{color: "color.text"}}>Creating Product</Grid>
                        <Grid item>
                            {this.renderText("Name", false, ()=>{console.log("test")})}
                        </Grid>
                        <Grid item>
                            {this.renderText("Description", true, ()=>{console.log("test")})}
                        </Grid>
                        <Grid item>
                            {this.renderText("Content", true, ()=>{console.log("test")})}
                        </Grid>
                        <Grid item>
                            {this.renderText("Price", false, ()=>{console.log("test")})}
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: "color.text",
                                    color: "color.text",
                                    maxWidth: "120px", 
                                    minWidth: "120px"
                                }}
                                onClick={createHandler}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default ProductPage;