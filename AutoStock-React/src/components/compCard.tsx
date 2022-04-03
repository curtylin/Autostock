import * as React from "react"
import {navigate} from "@reach/router"
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea
} from "@mui/material"

const CompCard = ({
  compLength,
  compTicker,
  compStartingVal,
  compDeadline,
  description,
  id,
}: any) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea id={id}
                        onClick={event => {navigate(`/app/competition`, 
                        {
                          state: {id},
                        }
                          )
                          }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`Competition Length: ${compLength}`}
          </Typography>
          <Typography variant="h5" component="div">
            {compTicker}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {compStartingVal}
          </Typography>
          
          <Typography  sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            }}
            variant="body2">
            {compDeadline}
            <br />
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small"
                        id={id}
                        onClick={event => {navigate(`/app/competition`, 
                        {
                          state: {id},
                        }
                          )
                          }}> Learn More

                </Button>
      </CardActions>
    </Card>
  )
}

export default CompCard
