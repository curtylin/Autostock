import * as React from "react"
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CommentDialog from "./commentDialog";
import Comments from "./comments";
import { useState, useEffect } from "react";


const Threads = ({
  id,
  threadTitle,
  threadDescription,
  threadCreator
}: any) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    getCommentsDB(id)
  }, [])

  const submitComment = () => {
    console.log("SAVED")
    console.log(newComment)

  }

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
        setComments(result)
      })
  }

  return (
    <div>
        <Accordion sx={{mb:2, boxShadow: 2}} > 
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
            <Typography fontSize="16px" fontWeight="300" variant="h5" component="div">
              {threadDescription}
            </Typography>        
          </AccordionDetails>
          {/* COMMENTS */}
          {comments.map((comment: any, index: number) => {
            let commentProps = {
              id: comment.id,
              commentText: comment.commentText,
              commentUser: comment.userID
            }
            return(
              <Comments key={index} {...commentProps}/>   
            )
          })}    
          <AccordionDetails>
            <TextField 
              fullWidth 
              label="Enter your comment">
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewComment(e.target.value)
              }}
            </TextField>

          </AccordionDetails>  
          <AccordionDetails>
            {/* <Button onClick={handleClickOpen} size="small" startIcon={<AddIcon/>} style={{textTransform:"none"}} variant="contained">
              Comment
            </Button> */}
            <Button onClick={submitComment} size="small" startIcon={<AddIcon/>} style={{textTransform:"none"}} variant="contained">
              Comment
            </Button>
          </AccordionDetails>   
        </Accordion>
        {/* <CommentDialog
          open={open}
          onClose={handleClose}
          selectedValue="lol"
          /> */}

    
    </div>
  )
}
export default Threads