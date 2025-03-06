import {Component} from "react";
import {Grid2 as Grid, Button, Paper, Tooltip} from "@mui/material";


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
