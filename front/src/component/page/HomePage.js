import {Component} from "react";
import {Grid2 as Grid, Button} from '@mui/material';

import ProductCard from "../field/ProductCard";


class HomePage extends Component {
    render() {
        const products = [
            {
                id: 1,
                image_id: 1,
                description: "description",
                price: 200,
            },
            {
                id: 2,
                image_id: 2,
                description: "description2",
                price: 150,
            }
        ];
        
        return (
            <Grid
                container
                sx={{
                    height: "90vh",
                }}
            >   
                {products.map(product => (
                    <Grid item key={`ProductItem_${product.id}`}>
                        <ProductCard
                            id={product.id}
                            image_id={product.image_id}
                            description={product.description}
                            price={product.price}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default HomePage;