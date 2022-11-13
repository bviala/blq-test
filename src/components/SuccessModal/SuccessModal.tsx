type SuccessModalProps = {
    onClose: () => void
}

const SuccessModal = ({ onClose }: SuccessModalProps) => {
    return (
        <>
            <h1>All done!</h1>
            <p>You will be one of the first to experience Broccollo & Co. when we launch!</p>
            <button style={{ width: '100%', marginTop: '2rem' }} onClick={onClose}>OK</button>
        </>
    )
}

export default SuccessModal