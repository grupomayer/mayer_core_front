import DefaultModal from "../DefaultModal/default_modal";

function LoadingModal() {
  return (
    <DefaultModal
      title="Carregando..."
      size="sm"
      onClose={false}
    >Aguarde um minuto...</DefaultModal>
  )
}

export default LoadingModal;