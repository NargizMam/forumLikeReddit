import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CommentsForm from "../../../features/comments/components/CommentsForm.tsx";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {isShowModal, selectShowModal} from "../../../features/comments/commentsSlice.ts";

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

const ModalWindow = () => {
    const dispatch = useAppDispatch();
    const showModal = useAppSelector(selectShowModal);

    return (
        <Modal
            open={showModal}
            onClose={() => dispatch(isShowModal())}
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
