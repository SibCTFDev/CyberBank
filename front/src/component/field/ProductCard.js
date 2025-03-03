import {Grid2 as Grid} from "@mui/material";


function ProductCard(props) {
    const {product, image_id, description, price, selectProduct, openModal} = props;

    const selectProductHandler = () => {
        selectProduct(product);
        openModal();
    };

    return (
        <Grid 
            item
            sx={{
                bgcolor: "color.background",
                padding: "12px",
                margin: "12px",
                width: "200px",
                minWidth: "200px",
                height: "280px",
                
            }}
            onClick={selectProductHandler} 
        >
            <Grid
                container
                direction="column"
                justifyContent="center"
                spacing="12px"
                alignItems="center"
            >
                <Grid item>
                    <img src={"/product.png"} alt={image_id} width={150}/>
                </Grid>
                <Grid item>
                    {description}
                </Grid>
                <Grid item>
                    {`${price} $`}
                </Grid>
            </Grid>
        </Grid>
        
    );
}

export default ProductCard;