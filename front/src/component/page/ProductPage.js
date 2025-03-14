import {useState} from "react";
import {Button, Grid2 as Grid, TextField, Modal} from '@mui/material';
import { postCreate } from "../../requests";


function renderText(label, multiline, handler, type = "string") {
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
            type={type}
            fullWidth
            multiline={multiline}
            slotProps={{...slotProps}}
            onChange={handler}
        />
    );
}

function ProductPage() {
    const [userInput, setUserInput] = useState({
        description: '',
        content: '',
        price: '',
        error: ''
    });
    const [modalOpened, setModalOpened] = useState(false);

    const closeModal = () => setModalOpened(false);

    const changeUserInput = (data, value) => 
        setUserInput({...userInput, [data]: value});

    const createHandler = () => {
        const {error, ...productData} = userInput;
        changeUserInput('error', '');
        
        postCreate({
            data: productData,
            handler: () => setModalOpened(true),
            excHandler: (err) => {
                changeUserInput('error', err.response.data)
            }
        });
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignContent="center"
            className="PageFrame"
            sx={{bgcolor: "color.secondary"}}
        >   
            <Grid item sx={{width: "50%"}}>
                <Grid 
                    container 
                    direction="column"
                    spacing="12px" 
                    sx={{
                        marginBottom:"10vh",
                        padding: "12px",
                        border: "1px solid",
                        borderColor: "color.text",
                        bgcolor: "color.background",
                        borderRadius: "0.375rem"
                    }}
                >
                    <Grid item sx={{color: "color.text"}}>Creating Product</Grid>
                    <Grid item>
                        {renderText("Description", true, 
                            (event)=>{changeUserInput('description', event.target.value)})}
                    </Grid>
                    <Grid item>
                        {renderText("Content", true, 
                            (event)=>{changeUserInput('content', event.target.value)})}
                    </Grid>
                    <Grid item>
                        {renderText("Price", false, 
                            (event)=>{changeUserInput('price', event.target.value)}, "number")}
                    </Grid>
                    <Grid item className="ProductErrorLabel">
                        {userInput.error}
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
            <Modal open={modalOpened} onClose={closeModal}>
                <Grid 
                    container 
                    justifyContent="center" 
                    alignItems="center"
                    sx={{width: "100%", height: "100%"}}
                >
                    <Grid item sx={{
                        padding: "24px",
                        width: "30%",
                        borderRadius: "0.375rem",
                        border: "1px solid",
                        borderColor: "color.primary",
                        bgcolor: "color.secondary",
                        color: "color.text"
                    }}>
                        <Grid 
                            container 
                            justifyContent="space-between" 
                            alignItems="center"    
                            direction="column"
                        >
                            <Grid item>
                                <p>
                                    The product has been successfully created! 
                                    You can find it in the "Profile" tab
                                </p>
                            </Grid>
                            <Grid item>
                                <Button onClick={closeModal}>Ok</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>
        </Grid>
    );
}

export default ProductPage;