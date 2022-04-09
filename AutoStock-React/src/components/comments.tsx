import * as React from "react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import AddIcon from "@mui/icons-material/Add"
import CommentDialog from "./commentDialog"
import { useState, useEffect } from "react"

const Comments = ({ id, commentText, commentUser, allUsers }: any) => {
  const [users, setUsers] = useState(new Map<string, string>())

  useEffect(() => {
    // getUsersDB()
  }, [])

  return (
    <div>
      <AccordionDetails sx={{ ml: 3 }}>
        <Typography
          fontSize="16px"
          fontWeight="300"
          variant="h5"
          component="div"
        >
          <span className="dis_UserName">
            {allUsers.get(commentUser) == "" || !allUsers.has(commentUser)
              ? "Anonymous"
              : allUsers.get(commentUser)}{" "}
          </span>
          {commentText}
        </Typography>
      </AccordionDetails>
    </div>
  )
}
export default Comments
