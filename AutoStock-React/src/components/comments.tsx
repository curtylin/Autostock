import * as React from "react"
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CommentDialog from "./commentDialog";
import { useState, useEffect } from "react";


const Comments = ({
    id,
    commentText,
    commentUser
}: any) => {  
  const [users, setUsers] = useState(new Map<string, string>())

  useEffect(() => {
    getUsersDB()
  }, [])

  const getUsersDB = () => {
    //fetch post to localhost
    fetch("http://localhost:5000/list-user", {
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
        for(let i = 0; i < result.length; i++){
          setUsers(prev => new Map([...prev, [result[i].userID, result[i].username]]))
        }
      })
  }

  return (
    <div>
        <AccordionDetails sx={{ml:3}}>            
          <Typography fontSize="16px" fontWeight="300" variant="h5" component="div">
            <span className="dis_UserName">{users.get(commentUser) == "" || !users.has(commentUser) ? "Anonymous" : users.get(commentUser)} </span>{commentText}
          </Typography>  
        </AccordionDetails>
    </div>
  )
}
export default Comments