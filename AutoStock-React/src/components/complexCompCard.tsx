import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { CardActionArea } from '@mui/material';
import '../components/complexCompCard.css';
import { Link, navigate } from '@reach/router';
import Button from "@mui/material/Button";

const subheaders = ""
const ComplexCompCard = ({
    compLength,
    compTicker,
    compStartingVal,
    compDeadline,
    description,
    id,
}: any) => {
    return (
        <Card variant="outlined" className="compCard" sx={{  maxWidth: 500 }}>
            <CardActionArea> {/*CHANGE THIS TO CORRESPONDING COMP*/}
                <CardHeader
                className="compHeader"
                title={compTicker}

                subheader={compLength.length > 2 ? compLength : `Competition Length: ${compLength} days`}
                />
                <CardMedia
                component="img"
                height="194"
                // maybe scrape for an image using the ticker
                image="https://images.unsplash.com/photo-1601382270349-49c15bddf738?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Paella dish"
                sx={{mb:0}}
                />
                <CardContent>
                <Typography sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                    }}
                    variant="body2"
                    color="text.secondary">
                    {description}
                </Typography>
                <Button className="mdc-button mdc-button--raised"
                        id={id}
                        onClick={event => {navigate(`/app/competition`, 
                        {
                          state: {id},
                        }
                          )
                          }}> Learn More

                </Button>
                </CardContent>
                {/* <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                </CardActions> */}
                {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                    aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                    stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and
                    peppers, and cook without stirring, until most of the liquid is absorbed,
                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                    mussels, tucking them down into the rice, and cook again without
                    stirring, until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
                </Collapse> */}
         </CardActionArea>

    </Card>
  )
}
export default ComplexCompCard


// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function RecipeReviewCard() {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
    
// }