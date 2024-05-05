interface ModalDeleteProps {
    showModal: boolean
    setShowModal: (show: boolean) => void
    onDelete: (id?: number) => void
    idDraft: number
}

export default ModalDeleteProps