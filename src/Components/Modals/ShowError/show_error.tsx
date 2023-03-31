import { defaultErrorMessage, errorsData } from "./errors";
import { IError } from "./interfaces/interfaces";
import styles from "./show_error.module.scss";

interface IShowErrorProps {
  error: number | null,
  page: string,
  setError: React.Dispatch<React.SetStateAction<number | null>>
}

function ShowError({ error, page, setError }: IShowErrorProps) {

  function searchForError(error: number, component: string): string {
    const curError: IError | undefined = errorsData.find(errorData => errorData.code === error && errorData.component === component);
    return curError?.message ? curError.message : defaultErrorMessage
  }

  return (
    <>
      {error !== null && (
        <section className={styles.modal}>
          <div className={styles.box}>
            <span className={styles.close} onClick={() => setError(null)}>
              &#x274C;
            </span>
            <div className={styles.error}>
              <div className={styles.error__code}>
                {error}
              </div>
              <div className={styles.error__message}>
                <strong>
                  {searchForError(error, page)}
                </strong>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ShowError