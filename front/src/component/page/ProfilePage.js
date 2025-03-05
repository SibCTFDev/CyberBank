import {useState, useEffect} from "react";
import {Grid2 as Grid, Drawer} from '@mui/material';

import ProductCard from "../field/ProductCard";
import ProductModal from "../frame/ProductModal";


function ProfilePage(props) {
    const {products, userData} = props;
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);

    const toggleModal = (state) => () => {
        setModalOpened(state);
    };

    const modalButtonHandler = () => {
        setModalOpened(false);
    };

    return (
        <>
        <Grid sx={{padding: "12px", bgcolor: "color.secondary", height: "10vh"}}>
            <Grid container spacing="36px" sx={{
                padding: "12px",
                bgcolor: "color.background",
                border: "1px solid",
                borderColor: "color.text",
                overflowY: "auto"
            }}>
                <Grid item>
                    {`User: ${userData.name}`}
                </Grid>
                <Grid item>
                    {`Balance: ${userData.balance}$`}
                </Grid>
                <Grid item>
                    {`Creation available: ${3-userData.productCount}`}
                </Grid>
            </Grid>
        </Grid>
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            className="PageFrame"
            sx={{bgcolor: "color.secondary", height: "80vh"}}
        >   
            {products.filter(
                (products) => products.seller === userData.name
            ).map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    image_id={product.image_id}
                    description={product.description}
                    price={product.price}
                    selectProduct={setSelectedProduct}
                    openModal={toggleModal(true)}
                />
                ))}
        </Grid>
        <Drawer
            anchor="bottom"
            open={modalOpened}
            onClose={toggleModal(false)}
            PaperProps={{
                sx: {
                    bgcolor: "color.secondary",
                    height: "40vh",
                }
            }}
        >
            <ProductModal
                product={selectedProduct}
                closeModal={toggleModal(false)}
                buttonText="Ok"
                buttonHandler={modalButtonHandler}
            />
        </Drawer>
        </>
    );
}

export default ProfilePage;