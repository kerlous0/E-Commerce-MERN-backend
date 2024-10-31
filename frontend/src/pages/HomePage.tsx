import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { fetchProduct } from "../api/api";
import { product } from "../types/product";

function HomePage() {
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    fetchProduct().then((data) => setProducts(data));
  }, []);
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => {
          return (
            <Grid size={{ xs: 12, md: 4 }} key={p._id}>
              <ProductCard {...p} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default HomePage;
