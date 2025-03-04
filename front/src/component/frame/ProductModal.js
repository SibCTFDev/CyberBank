import {Component} from "react";
import {Grid2 as Grid, Button, Paper} from "@mui/material";


class ProductModal extends Component {
    render() {
        const {product, buttonText, buttonHandler} = this.props;

        const modalContent = product == null ? null : (
            <Grid 
                container 
                justifyContent="space-between"
                alignItems="center"
                sx={{padding: "24px", height: "100%"}} 
            >
                <Grid item sx={{maxWidth: "80%"}}>
                    <Grid container spacing="24px" justifyContent="flex-start">
                        <Grid item>
                            <img src={"/product.png"} alt={product.image_id} width={220}/>
                        </Grid>
                        <Grid item sx={{maxWidth: "40%"}}>
                            <Paper elevation={0} sx={{
                                bgcolor: "color.secondary",
                                color: "color.text",
                                maxHeight: "100%",
                                padding: "12px", 
                                overflowY: "auto", 
                                boxSizing: "border-box", 
                                whiteSpace: "pre-wrap"
                            }}>
                                {product.description}
                            </Paper>
                        </Grid>
                        <Grid item>
                             <Paper elevation={0} sx={{
                                    bgcolor: "color.secondary",
                                    color: "color.text",
                                    maxHeight: "30%",
                                    padding: "12px", 
                                }}>
                                    {`Content: ${product.content}`}
                            </Paper>
                            <Paper elevation={0} sx={{
                                    bgcolor: "color.secondary",
                                    color: "color.text",
                                    marginTop: "20px",
                                    maxHeight: "10%",
                                    padding: "12px", 
                                }}>
                                    {`Seller: ${product.owner}`}
                            </Paper>
                            <Paper elevation={0} sx={{
                                    bgcolor: "color.secondary",
                                    color: "color.text",
                                    marginTop: "20px",
                                    maxHeight: "10%",
                                    padding: "12px", 
                                }}>
                                    {`Price: ${product.price} $`}
                            </Paper>
                        </Grid>
                        
                    </Grid>
                </Grid>
                <Grid item sx={{height: "100%"}}>
                    <Grid container sx={{height: "100%"}} alignItems="flex-end">
                        <Button 
                            variant="outlined"
                            sx={{maxWidth: "120px", minWidth: "120px"}}
                            onClick={buttonHandler}
                        >
                            {buttonText}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )

        return modalContent;
    }
}

export default ProductModal;
