// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { useTheme } from '../context/ThemeContext';
// import { red } from '@mui/material/colors';

// import '../styles/Modal.modules.css';

// function BasicModal({ open, setOpen, eventTime, eventTitle }) {
//   const {isDarkMode} = useTheme()
//   console.log(isDarkMode);
//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     // bgcolor: isDarkMode ? 'background.red' : 'background.black',
//     bgcolor: 'grey',
//     border: '1px solid #000',
//     borderRadius: '15px',
//     boxShadow: 24,
//     p: 4,
//   };
//   // const [open, setOpen] = React.useState(false);
//   // const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleRegister = () => {};
//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby='modal-modal-title'
//         aria-describedby='modal-modal-description'
//         // date-theme='dracula'
//       >
//         <Box sx={style}>
//           <Typography id='modal-modal-title' variant='h6' component='h2'>
//             {eventTitle}
//           </Typography>
//           <Typography id='modal-modal-description' sx={{ mt: 2 }}>
//             {eventTime}
//           </Typography>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleRegister}>Register</Button>
//         </Box>
//       </Modal>
//     </div>
//     // <div className='myModal'>
//     //   <h1>{eventTime}</h1>

//     // </div>
//   );
// }
// export default BasicModal;
function BasicModal({ open, setOpen, eventTime, eventTitle }) {
  return (
    <>
      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='font-bold'>
            Would you like to register to a tour?
          </h3>
          <p className='py-4 font-bold text-lg'>{eventTitle}</p>
          <p>{eventTime}</p>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <div className='flex gap-2'>
                <button className='btn btn-error'>Cancel</button>
                <button className='btn btn-success font-bold'>Register</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default BasicModal;
