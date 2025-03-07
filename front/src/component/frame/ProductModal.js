import {useState} from "react";
import {Grid2 as Grid, Button, Paper, Tooltip, Snackbar, Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { getBuy } from "../../requests";


function ProductModal(props) {
    const {product, userName, closeModal, refreshInfo} = props;
    const [snackOpen, setSnackOpen] = useState(false);
    const [error, setError] = useState('');

    const closeSnackHandler = () => setSnackOpen(false);
    const closeModalHandler = () => closeModal();
    const navigate = useNavigate();

    const buyProductHandler = () => {
        setError('');
        
        getBuy({
            pid: product.id, 
            handler: () => {
                 closeModal();
                 if (refreshInfo) refreshInfo();
                 navigate('/profile/');
            },
            excHandler: (err) => {
                setError(err.response.data);
                setSnackOpen(true);
            }
        });
    };

    const modalContent = product == null ? null : (
        <Grid 
            container 
            justifyContent="space-between"
            alignItems="center"
            sx={{padding: "24px", height: "100%"}} 
        >
            <Grid item sx={{maxWidth: "80vw", minWidth: "80vw", width: "80vw"}}>
                <Grid container spacing="24px" justifyContent="flex-start">
                    <Grid item>
                        <img src={"/product.png"} alt={product.imageId} width={220}/>
                    </Grid>
                    <Grid item sx={{maxWidth: "22%", minWidth: "22%"}}>
                        <Tooltip 
                            disableHoverListener={product.content.length < 8}
                            title={product.content} 
                            arrow
                        >
                            <Paper elevation={0} className="ModalField" sx={{
                                bgcolor: "color.secondary",
                                color: "color.text",
                                paddingTop: "12px",
                            }}>
                                {`Content: ${product.content}`}
                            </Paper>
                        </Tooltip>
                        <Tooltip 
                            disableHoverListener={product.seller.length < 8}
                            title={product.seller} 
                            arrow
                        >
                            <Paper elevation={0} className="ModalField" sx={{
                                    bgcolor: "color.secondary",
                                    color: "color.text",
                                    marginTop: "20px",
                                }}>
                                    {`Seller: ${product.seller}`}
                            </Paper>
                        </Tooltip>
                        <Paper elevation={0} className="ModalField" sx={{
                                bgcolor: "color.secondary",
                                color: "color.text",
                                marginTop: "20px",
                            }}>
                                {`Price: ${product.price}$`}
                        </Paper>
                    </Grid>
                    <Grid item className="ModalDescriptionGrid">
                        <Paper elevation={0} className="ModalDescription" sx={{
                            bgcolor: "color.secondary",
                            color: "color.text",
                        }}>
                            {product.description}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className="ModalButtonGrid">
                <Grid container sx={{height: "100%", width: "100%"}} alignItems="flex-end">
                    <Grid item>
                        <Button 
                            variant="outlined"
                            sx={{maxWidth: "120px", minWidth: "120px"}}
                            onClick={
                                userName === product.seller ? 
                                closeModalHandler : 
                                buyProductHandler
                            }
                        >
                            {userName === product.seller ? "Ok" : "Buy"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                open={snackOpen} 
                autoHideDuration={6000} 
                onClose={closeSnackHandler}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
                <Alert
                    onClose={closeSnackHandler}
                    severity="error"
                    variant="filled"
                    sx={{ 
                        width: "100%",
                        maxWidth: "100%",
                        color: 'color.text', 
                        bgcolor: 'color.primary'
                    }}
                >
                    <Grid className="ModalSnackBar">{error}</Grid>
                </Alert>
            </Snackbar>
        </Grid>
    )

    return modalContent;
}

export default ProductModal;
