import { Grid } from '@mui/material'
import Title from '../shared/Title'
import Header from './Header'
import React from 'react'

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Title />
        <Header />

        <Grid container height={"calc(100vh - 4rem)"}>

          <Grid item height={"100%"} sm={4} md={3} sx={{
            display: { xs: "none", sm: "block" }
          }} > first </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid item md={4} lg={3} sx={{
            display: {xs: "none", md:"block"}
          }} height={"100%"}> second</Grid>

        </Grid>


        <div>Footer</div>
      </>
    )
  }
}

export default AppLayout