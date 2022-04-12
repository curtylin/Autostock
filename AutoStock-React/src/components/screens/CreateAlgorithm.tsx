import React from 'react'
import Layout from '../layout'
import Stepper from '@mui/material/Stepper'
import { StepButton, StepLabel } from "@mui/material"
import { Step } from "@mui/material"
import AlgoPanel from '../algoPanel'
import Analysis from '../Analysis'


export default function CreateAlgorithm() {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = ['Create Algorithm', 'Analysis']

  const getStepContent = (step: number) => {
    switch(step) {
      case 0:
        return <AlgoPanel />
      case 1: 
        return <Analysis />
      default: 
        return <div>Something has gone horribly wrong</div>
    }
  }



  return (
    <Layout>
        <Stepper nonLinear activeStep={activeStep} sx={{my:5}} >
        {steps.map((label, index) => (
          <Step key={label} >
            <StepButton color="inherit" onClick={() => setActiveStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
        </Stepper>
        <div>
          {getStepContent(activeStep)}
        </div>
    </Layout>
  )
}
