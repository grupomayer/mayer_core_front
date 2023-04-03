import styles from "./show_loading.module.scss";

interface IShowLoadingProps {
  loading: boolean
}

function ShowLoading({ loading }: IShowLoadingProps) {
  return (
    <>
      {loading && (
        <section className={styles.background}>
          <div className={styles.box}>
            <h1 className={styles.loading}>
              Carregando...
            </h1>
          </div>
        </section>
      )}
    </>
  )
}

export default ShowLoading