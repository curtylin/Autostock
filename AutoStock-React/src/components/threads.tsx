import * as React from "react"
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CommentDialog from "./commentDialog";
import { useState, useEffect } from "react";


const Threads = ({
  id,
  threadTitle,
  threadDescription,
  threadCreator
}: any) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([])

  useEffect(() => {
    getCommentsDB(id)
  })

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value: string) => {
    setOpen(false);
  };

  const getCommentsDB = (id: any) => {
    fetch(`http://localhost:5000/get-comments/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(res => {
        return res.json()
      })
      .then(result => {
        console.log("comments")
        console.log(result)
        setComments(result)
      })
  }

  return (
    <div>
        <Accordion> 
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography fontSize="20px" fontWeight="400" variant="h5" component="div">
            <span className="dis_UserName">{threadCreator} </span>{threadTitle}
          </Typography>          
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize="14px" fontWeight="300" variant="h5" component="div">
              {threadDescription}
            </Typography>        
          </AccordionDetails>
          {/* COMMENTS */}
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