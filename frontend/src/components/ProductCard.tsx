import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { product } from "../types/product";

// interface props {
//   _id: string;
//   title: string;
//   image: string;
//   price: number;
//   stock: number;
// }

export default function ProductCard({
  //   id,
  title,
  image,
  price,
  stock,
}: product) {
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Price: {price} EGP
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Stock: {stock}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          Add to Card
        </Button>
      </CardActions>
    </Card>
  );
}
