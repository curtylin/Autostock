import * as React from "react"
import { useState, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Button, CircularProgress, IconButton, Snackbar, TextField, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CommentDialog from "./commentDialog";
import Comments from "./comments";
import { getUser } from "../services/auth";



const Threads = ({
  id,
  threadTitle,
  threadDescription,
  threadCreator,
  users
}: any) => {
  const [snackOpen, setSnackOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const textInput = React.useRef(null);
  // const [users, setUsers] = useState(new Map<string, string>())
  const [openBackdrop, setOpenBackdrop] = useState(false)

  useEffect(() => {
    getCommentsDB(id)
  }, [])


  const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const submitComment = () => {
    console.log("SAVED")
    console.log(newComment)
    setSnackOpen(true)
    setOpenBackdrop(true)

    // clear the comment box
    // add comment to the web page
    // send the comment to the database
    let body = `{
      "commentText": "${newComment}",
      "date": "${new Date().toISOString()}",
      "userID": "${getUser().uid}",
      "threadID": "${id}"
    }`
    const headers = new Headers()
    headers.append("content-type", "application/json")
    let init = {
      method: "POST",
      headers,
      body,
    }
    fetch(`http://localhost:5000/add-comment`, init)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err)
      })
      .then(text => {
        setNewComment("")
        window.location.reload();
      })
      


      
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
        <Accordion square={true} sx={{mb:1, boxShadow: 2}} > 
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography fontSize="20px" fontWeight="500" variant="h4" component="div">
            <span className="dis_UserName">{users.get(threadCreator) == "" || !users.has(threadCreator) ? "Anonymous" : users.get(threadCreator)} </span>{threadTitle}
          </Typography>          
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize="16px" fontWeight="300" variant="h5" component="div">
              {threadDescription.replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t")}
            </Typography>        
          </AccordionDetails>
          {/* COMMENTS */}
          {comments.map((comment: any, index: number) => {
            let commentProps = {
              id: comment.id,
              commentText: comment.commentText,
              commentUser: comment.userID,
              allUsers: users
            }
            return(
              <Comments key={index} {...commentProps}/>   
            )
          })}    
          <AccordionDetails>
            <TextField 
              inputProps={{ maxLength: 2000 }}
              value={newComment}
              fullWidth 
              inputRef={textInput}
              label="Enter your comment"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewComment(e.target.value)
              }}
            />
          </AccordionDetails>  
          <AccordionDetails>
            <Button disabled={!newComment} onClick={submitComment} size="small" startIcon={<AddIcon/>} style={{textTransform:"none"}} variant="contained">
              Comment
            </Button>
          </AccordionDetails>   
        </Accordion>
        <Snackbar
          open={snackOpen}
          autoHideDuration={4000}
          onClose={handleSnackClose}
          message="Comment submitted!"
        />
        <Backdrop
          sx={{ color: '#fff'}}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop> 
    </div>
  )
}
export default Threads