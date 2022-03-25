import * as React from "react"
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CommentDialog from "./commentDialog";


const Threads = ({ id }: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <div>
        <Accordion> 
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography fontSize="20px" fontWeight="400" variant="h5" component="div">
            <span className="dis_UserName">[User2]</span> Other Thread Title.... [disc.Title]
          </Typography>          
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize="14px" fontWeight="300" variant="h5" component="div">
              I think that GME is really cool actually.... [disc.Description]
            </Typography>        
          </AccordionDetails>
          <AccordionDetails>
            <Typography fontSize="14px" fontWeight="300" variant="h5" component="div">
              .....<span className="dis_UserName">[User3]</span> I think that GME is bad.... [disc.comments[0]]
            </Typography>           
          </AccordionDetails>
          <AccordionDetails>
            <Typography fontSize="14px" fontWeight="300" variant="h5" component="div">
              .....<span className="dis_UserName">[User4]</span> I think that GME is the new DOGE....  [disc.comments[1]]
            </Typography>    
            <Button onClick={handleClickOpen} size="small" startIcon={<AddIcon/>} style={{textTransform:"none"}} sx={{mt:3}} variant="contained">
              Comment
            </Button>          
          </AccordionDetails>
        </Accordion>

        <CommentDialog
          open={open}
          onClose={handleClose}
          selectedValue="lol"
        />
    </div>
  )
}
export default Threads