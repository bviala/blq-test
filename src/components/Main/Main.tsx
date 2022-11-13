import { useState } from 'react'
import ReactModal from 'react-modal'
import InviteRequestModal from '../InviteRequestModal/InviteRequestModal'
import SuccessModal from '../SuccessModal/SuccessModal'
import classes from './Main.module.css'

const Main = () => {
    const [isInviteRequestModalOpen, setInviteRequestModalOpen] = useState(false)
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false)

    const onRequestSuccess = () => {
        setInviteRequestModalOpen(false)
        setSuccessModalOpen(true)
    }

    return (
        <main className={classes.main}>
            <h1 className='primary--text'>A better way <br/>to enjoy every day.</h1>
            <p>Be the first to know when we launch</p>
            <button onClick={() => setInviteRequestModalOpen(true)}>Request an invite</button>
            <ReactModal
                isOpen={isInviteRequestModalOpen}
                onRequestClose={() => setInviteRequestModalOpen(false)}
                className={'modal-content'}
                overlayClassName={'modal-bg'}
            >
                <InviteRequestModal onRequestSuccess={onRequestSuccess} />
            </ReactModal>
            <ReactModal
                isOpen={isSuccessModalOpen}
                onRequestClose={() => setSuccessModalOpen(false)}
                className={'modal-content'}
                overlayClassName={'modal-bg'}
            >
                <SuccessModal onClose={() => setSuccessModalOpen(false)} />
            </ReactModal>
        </main>
    )
}

export default Main