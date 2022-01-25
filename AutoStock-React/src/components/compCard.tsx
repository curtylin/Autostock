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
  description,
}: any) => {
  return (
    <Card sx={{ minWidth: 275 }}>
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
        <Typography variant="body2">
          {compDeadline}
          <br />
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default CompCard
