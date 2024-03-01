import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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
    p: 1,
};
interface Props extends React.PropsWithChildren {
    show: boolean;
    onClose: React.MouseEventHandler;
}
 const ModalWindow:React.FC<Props> = ({show, onClose}) => {

    return (
     <Modal
         open={show}
         onClose={onClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
     >
         <Box sx={style}>
            <CommentsForm/>
         </Box>
     </Modal>
    );
};

export default ModalWindow;
