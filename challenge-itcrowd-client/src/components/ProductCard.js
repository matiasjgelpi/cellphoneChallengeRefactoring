import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigator = useNavigate();

  const handleClick = () => {
    navigator(`/detail/${product?.id}`);
  };
  return (
    <Card sx={{ 
      height: "550px",
    width: "400px" }}>
      <CardMedia
        component="img"
        height="70%"
        object-fit="contain"
        padding="1rem"
        image={product.image_url}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: <b>$ {product?.price}</b>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>
          See More
        </Button>
      </CardActions>
    </Card>
  );
}
