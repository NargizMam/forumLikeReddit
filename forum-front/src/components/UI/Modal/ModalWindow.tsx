import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CommentsForm from "../../../features/comments/components/CommentsForm.tsx";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export interface Props {
    open: boolean,
}
 const ModalWindow:React.FC<Props> = ({open}) => {
    const handleClose = () => {
        open = false;
    };
    return (
     <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
     >
         <Box sx={style}>
             <Typography id="modal-modal-title" variant="h6" component="h2">
                 Text in a modal
             </Typography>
            <CommentsForm/>
         </Box>
     </Modal>
    );
};

export default ModalWindow;
