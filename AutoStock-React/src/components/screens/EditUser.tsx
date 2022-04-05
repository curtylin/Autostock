//template from https://mui.com/getting-started/templates/
import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { getUser } from "../../services/auth"
import { navigate } from "gatsby"
import Layout from "../layout"
import Seo from "../seo"
import Tooltip from "@mui/material/Tooltip"

const EditUser = () => {
  const [username, setUsername] = React.useState("")
  const [usernameInDB, setUsernameInDB] = React.useState(false)

  useEffect(() => {
    getUserDB()
    console.log("username: " + username)
  }, [])

  const getUserDB = () => {
    //fetch post to localhost
    fetch(`http://localhost:5000/get-user/${getUser().uid}`, {
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
        try {
          setUsername(result.username)
          setUsernameInDB(true)
        } catch (e) {
          setUsername("")
          setUsernameInDB(false)
        }
      })
  }

  const handleSubmit = (event: any) => {
    console.log("Saving user")
    fetch(`http://localhost:5000/check-user/${username}`, {
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
        if (result.dupe == true) {
          alert("Username already exists")
        } else {
          let body = `{
            "username": "${username}",
            "userID": "${getUser().uid}"
            }
            `
          const headers = new Headers()
          headers.append("content-type", "application/json")
          let init = {
            method: "POST",
            headers,
            body,
          }
          fetch(`http://127.0.0.1:5000/create-user`, init)
            .then(response => {
              return response.json() // or .text() or .blob() ...
            })
            .then(text => {
              // text is the response body
            })
            .catch(e => {
              // error in e.message
            })
          event.preventDefault()
          setUsernameInDB(true)
          navigate("/app/home")
        }
      })
  }

  const handleUpdateUser = (event: any) => {
    fetch(`http://localhost:5000/check-user/${username}`, {
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
        if (result.dupe == true) {
          alert("Username already exists")
          return
        } else {
          let body = `{
            "username": "${username}"
            }
            `
          const headers = new Headers()
          headers.append("content-type", "application/json")
          let init = {
            method: "POST",
            headers,
            body,
          }
          fetch(`http://127.0.0.1:5000/update-user/${getUser().uid}`, init)
            .then(response => {
              return response.json() // or .text() or .blob() ...
            })
            .then(text => {
              // text is the response body
              console.log(text)
            })
            .catch(e => {
              // error in e.message
            })
          event.preventDefault()
          navigate("/app/home")
        }
      })
  }

  let submitButton
  if (usernameInDB == false) {
    submitButton = (
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        {" "}
        Save Information{" "}
      </Button>
    )
  } else {
    submitButton = (
      <Button type="submit" variant="contained" onClick={handleUpdateUser}>
        {" "}
        Update Information{" "}
      </Button>
    )
  }

  return (
    <Layout>
      <Seo title="AutoStock" />
      <h1>Edit Account Information</h1>
      {/*  User Name */}
      <FormControl sx={{ my: 2, mr: 5, minWidth: 300 }}>
        <Tooltip title="What do you want to be called?" placement="left" arrow>
          <TextField
            required
            onChange={e => {
              setUsername(e.target.value)
            }}
            sx={{ my: 2, mr: 5, minWidth: 300, maxWidth: 300 }}
            id="outlined-search"
            value={username}
            label="User Name"
            type="search"
          />
        </Tooltip>
      </FormControl>
      <div>
        <FormControl sx={{ my: 2, mr: 5, minWidth: 300 }}>
          {submitButton}
        </FormControl>
      </div>
    </Layout>
  )
}

export default EditUser
