import {useState} from "react";
import {Grid2 as Grid, Drawer} from '@mui/material';

import ProductCard from "../field/ProductCard";
import ProductModal from "../frame/ProductModal";


function HomePage(props) {
    const {products} = props;
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);

    const toggleModal = (state) => () => {
        setModalOpened(state);
    };

    const buyProductHandler = () => {
        setModalOpened(false);
    };

    const pageContent = products === null ? null : (
        products.map(product => (
            <ProductCard
                key={product.id}
                product={product}
                selectProduct={setSelectedProduct}
                openModal={toggleModal(true)}
            />
        ))
    );
    
    return (
        <>
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            className="PageFrame"
            sx={{bgcolor: "color.secondary"}}
        >   
            {pageContent}
        </Grid>
        <Drawer
            anchor="bottom"
            open={modalOpened}
            onClose={toggleModal(false)}
            PaperProps={{
                sx: {
                    bgcolor: "color.secondary",
                    height: "40vh",
                    maxHeight: "40vh",
                }
            }}
        >
            <ProductModal
                product={selectedProduct}
                closeModal={toggleModal(false)}
                buttonText="Buy"
                buttonHandler={buyProductHandler}
            />
        </Drawer>
        </>
    );
    
}

export default HomePage;