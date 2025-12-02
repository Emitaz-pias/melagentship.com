

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Modal,
  IconButton,
  Alert,
} from "@mui/material";
import Grid from '@mui/material/Grid';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { FaEthereum } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import PaymentNavbar from "./PaymentNavbar";
import Footer from "../../components/footer/Footer";

const PaymentPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playerId, setPlayerId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  // Dummy user data for login 03130650640
  const users = [   
    { playerId: "1112291899", password: "VTR71&7$$"},
    { playerId: "03130650640", password: "VTR72%0$$"},
    { playerId: "1113200151", password: "YUW71&7$$"},
    { playerId: "1114595255", password: "WER778$$"},
    { playerId: "1116410805", password: "TYUs791##^%"},
   { playerId: "agent1", password: "pass1" },

  ];

  // Dummy payment addresses
  const paymentOptions = [
    { name: 'USDT (TRC-20)', address: 'TXy7nywYfLxySd4iYJb6YkYEgb4FF8to5u',icon:FaDollarSign },
    { name: 'USDT (ERC-20)', address: '0xc796633743599e332469928e9dc0a1dac5b4996d',icon:FaDollarSign },
    { name: 'BTC', address: '1DetQjf7aLPxTXus36rkbTPZhuNFMD9RxA',icon:CurrencyBitcoinIcon },
    { name: 'ETH BEP-20', address: '0xc796633743599e332469928e9dc0a1dac5b4996d',icon:FaEthereum },
  ];

  // Handle login validation
  const handleLogin = () => {
    const user = users.find(
      (u) => u.playerId === playerId && u.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid Agent ID or Password");
    }
  };

  const handlePaymentClick = (address) => {
    setSelectedAddress(address);
    setOpenModal(true);
  };
  const handleSubmitClick = (address) => {
    if (!playerId.trim() || !transactionId.trim()) {
      alert("Agent ID and Transaction ID cannot be blank!");
    } else {
      alert("Successfully submitted!");    
      setPlayerId(""); // Clear the playerId field
      setTransactionId(""); // Clear the transactionId field
      setOpenModal(false);
    }
  };
  const handleCopyAddress = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(selectedAddress)
        .then(() => {
          alert("Address copied to clipboard!");
        })
        .catch((err) => {
          alert("Failed to copy address. Please copy it manually.");
          console.error("Clipboard error:", err);
        });
    } else {
      // Fallback for browsers where clipboard API is not available
      const textarea = document.createElement("textarea");
      textarea.value = selectedAddress;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        alert("Address copied to clipboard!");
      } catch (err) {
        alert("Failed to copy address. Please copy it manually.");
        console.error("Fallback clipboard error:", err);
      }
      document.body.removeChild(textarea);
    }
  };
  
  return (
    <Container height="80vh">
      <PaymentNavbar />
      {!isLoggedIn ? (
        <Box maxWidth="sm" sx={{ mt: 5, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Agent ID"
            variant="outlined"
            margin="normal"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            sx={{
              width: { lg: "30vw !important", xs: "80vw !important" },

              margin: '1em 1em',
              '& .MuiOutlinedInput-root': {
                '& .MuiInputBase-input': { color: 'gray' },
                '&.Mui-focused .MuiInputBase-input': { color: 'gray' },
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: { lg: "30vw !important", xs: "80vw !important" },
              margin: '0em 1em',
              '& .MuiOutlinedInput-root': {
                '& .MuiInputBase-input': { color: 'gray' },
                '&.Mui-focused .MuiInputBase-input': { color: 'gray' },
              },
            }}
          />
          <Button
            variant="contained"
            
            fullWidth
            onClick={handleLogin}
            style={{
              backgroundColor: '#FEBD02',
              borderRadius: '3px',
              fontWeight: 'bolder',
              fontSize: '18px',
              lineHeight: '21px',
              textAlign: 'center',
              textTransform: 'uppercase',
              color: '#000000',
              textShadow: '0 2px 0 #FFCF44',
              height: '1em',             
              margin: '0.8em',
              padding: '1em 0.2em',
              width:'16em'
            }}
          >
            Log In
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Payment Options
          </Typography>
          <Grid  container justifyContent={'center'} spacing={2}>
            {paymentOptions.map((option, index) => (
              <Grid item  xs={10} md={10} key={index} >
                <Card
                  onClick={() => handlePaymentClick(option.address)}
                  sx={{ 
                   
                    backgroundColor:'#FEBD02'  ,                    
                    fontWeight:'bolder',               
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#FFCF44" },
                  }}
                >
                  <CardContent>

                    <Typography variant="h6" sx={{color:'black !important',fontWeight:'bold'}} textAlign={'center'}>{option.name} {<Typography>{ <option.icon/>} </Typography>} </Typography>
                   
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Modal for QR Code and Address */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="payment-modal-title"
        aria-describedby="payment-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width:'80vw',
            bgcolor: "background.paper",
            boxShadow: 24,
            p:4,
            borderRadius: 2,
            backgroundColor:'#212121'
          }}
        >
          <Typography
            id="payment-modal-title"
            variant="h6"
            component="h6"
            gutterBottom
          >
            Payment Address
          </Typography>
          <Typography id="payment-modal-description" component={'p'}>
            {selectedAddress}
            <IconButton sx={{color:'white'}} onClick={handleCopyAddress}>
              <ContentCopyIcon />
            </IconButton>
          </Typography>
          <Box
          >
            <TextField
            fullWidth
            label="Agent ID"
            variant="outlined"
            margin="normal"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            sx={{
              // width: { lg: "30vw !important", xs: "80vw !important" },

              margin: '1em 1em',
              '& .MuiOutlinedInput-root': {
                '& .MuiInputBase-input': { color: 'gray' },
                '&.Mui-focused .MuiInputBase-input': { color: 'gray' },
              },
            }}
          />
          <TextField
            fullWidth
            label="Transiction ID"
            type="password"
            variant="outlined"
            margin="normal"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            sx={{
              
              margin: '0em 1em',
              '& .MuiOutlinedInput-root': {
                '& .MuiInputBase-input': { color: 'gray' },
                '&.Mui-focused .MuiInputBase-input': { color: 'gray' },
              },
            }}
          />
          <Button
            variant="contained"
            
            fullWidth
            onClick={handleSubmitClick}
            style={{
              backgroundColor: '#FEBD02',
              borderRadius: '3px',
              fontWeight: 'bolder',
              fontSize: '18px',
              lineHeight: '21px',
              textAlign: 'center',
              textTransform: 'uppercase',
              color: '#000000',
              textShadow: '0 2px 0 #FFCF44',
              height: '1em',             
              margin: '0.8em',
              padding: '1em 0.2em',
              width:'16em'
            }}
          >
           submit
          </Button>
          </Box>
        </Box>
      </Modal>
      <Footer/>
    </Container>
  );
};

export default PaymentPage;
