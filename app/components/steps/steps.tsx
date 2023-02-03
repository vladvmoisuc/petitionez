import { useState, useEffect } from "react";

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import Template from "~/components/template";

import { getText } from "~/utils/functions";

import type {
  Templates as StepsType,
  CurryiedChangeHandler,
  User,
} from "~/utils/types";

type Props = {
  steps: StepsType;
  user: User | undefined;
  isMobile: boolean;
  onError: (value: boolean) => void;
  children: any;
};

export default function Steps({
  steps,
  user,
  children,
  isMobile,
  onError,
}: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [openFormAlert, setOpenFormAlert] = useState(false);
  const [openClipboardAlert, setOpenClipboardAlert] = useState(false);

  const handleClose = () => {
    setOpenFormAlert(false);
  };

  const handleNext = () => {
    if (!activeStep && (!user?.name || !user?.address)) {
      setOpenFormAlert(true);
      onError(true);

      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClipboard: CurryiedChangeHandler = (message) => () => {
    navigator.clipboard.writeText(message ? message : window.location.href);

    setOpenClipboardAlert(true);
  };

  const handleClipboardAlertClose = () => {
    setOpenClipboardAlert(false);
  };

  useEffect(() => {
    if (!activeStep && user?.name && user?.address && !isMobile) {
      setActiveStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isMobile]);

  return (
    <Box sx={{ mt: 3 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key="default">
          <StepLabel>{getText("campain.steps.title")}</StepLabel>
          <StepContent>
            <Typography variant="body2" color="text.secondary">
              {getText("campain.steps.description")}
            </Typography>
            {isMobile && children}
            <Button
              variant="outlined"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              {getText("buttons.next")}
            </Button>
          </StepContent>
        </Step>
        {steps.map((step, index) => (
          <Step key={step.title}>
            <StepLabel>{step.title}</StepLabel>
            <StepContent>
              <Template user={user} {...step} onCopy={handleClipboard} />
              <Box>
                <Button
                  variant="outlined"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {getText(
                    `buttons.${index === steps.length - 1 ? "finish" : "next"}`
                  )}
                </Button>
                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  {getText("buttons.back")}
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length + 1 && (
        <Box sx={{ p: 3 }}>
          <Typography>{getText("campain.completion-message")}</Typography>
          <Button
            variant="contained"
            onClick={handleClipboard()}
            sx={{ mt: 1, mr: 1 }}
          >
            {getText("buttons.copy")}
          </Button>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            {getText("buttons.reset")}
          </Button>
        </Box>
      )}
      <Snackbar
        open={openFormAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {getText("campain.alerts.user-details")}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openClipboardAlert}
        autoHideDuration={1000}
        onClose={handleClipboardAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClipboardAlertClose} severity="info">
          {getText("globals.alerts.clipboard")}
        </Alert>
      </Snackbar>
    </Box>
  );
}
