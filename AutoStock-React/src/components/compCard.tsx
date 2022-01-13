import * as React from "react"
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material"

const CompCard = ({
  compLength,
  compTicker,
  compStartingVal,
  compDeadline,
}: any) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {compLength}
        </Typography>
        <Typography variant="h5" component="div">
          {compTicker}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Starting Cost $1000
        </Typography>
        <Typography variant="body2">
          2 Days Left to Enter
          <br />
          {'"Think Different"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default CompCard
