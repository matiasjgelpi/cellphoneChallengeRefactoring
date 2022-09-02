import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

export default function ProductCard({ product }) {
  const navigator = useNavigate();

  const handleClick = () => {
    navigator(`/detail/${product?.id}`);
  };
  return (
    <Card className={style.card_container}>
      <CardMedia
        className={style.card_image}
        component="img"
        image={product.image_url}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" className={style.card_title}  component="div">
          {product?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: <b>$ {product?.price}</b>
        </Typography>
      </CardContent>
      <CardActions className={style.card_button_container}>
        <Button size="small"  variant="outlined"  onClick={handleClick}>
          See More
        </Button>
      </CardActions>
    </Card>
  );
}
