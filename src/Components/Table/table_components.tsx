import classNames from "classnames"
import styles from './tr.module.scss'
import stylesButton from './button.module.scss'
import { MouseEventHandler } from "react"
import { Line } from "./utils/classes"

interface IRenderTrs {
  trsData: Array<Line>,
  tableColumnsLength: number,
  continueOpen?: number,
  setMoreInfoAbout: React.Dispatch<React.SetStateAction<number | null>>,
  moreInfoAbout?: number | null,
  showAside?: boolean
}
export const RenderTrs = ({ trsData, tableColumnsLength, continueOpen, setMoreInfoAbout, moreInfoAbout, showAside }: IRenderTrs): JSX.Element => {
  return (
    <>
      {trsData !== undefined && trsData.length > 0 ? (
        trsData.map((line: Line, index: number) => (
          <Tr
            key={`${line.getValidProperties()[0]}`}
            line={line}
            index={index}
            continueOpen={continueOpen}
            length={tableColumnsLength}
            setMoreInfoAbout={setMoreInfoAbout}
            moreInfoAbout={moreInfoAbout}
            showAside={showAside}
          />
        ))
      ) : <AnyContentMessage length={tableColumnsLength} />}
    </>
  )
}

const executeFunctions = (
  line: Line, 
  index: number, 
  setMoreInfoAbout: React.Dispatch<React.SetStateAction<number | null>>, 
  moreInfoAbout?: number | null, 
  continueOpen?: number
) => {
  if (line.functions) {
    if (line.functions.onClick) {
      line.functions.onClick(index, continueOpen)
    }
  }
  moreInfoAbout === index ? setMoreInfoAbout(null) : setMoreInfoAbout(index)
}

interface ITr {
  line: Line;
  index: number;
  continueOpen?: number;
  moreInfoAbout?: number | null;
  setMoreInfoAbout: React.Dispatch<React.SetStateAction<number | null>>;
  length: number;
  showAside?: boolean;
}
const Tr = ({ line, index, continueOpen, moreInfoAbout, setMoreInfoAbout, length, showAside }: ITr) => {  
  return (
    <>
      <tr
        key={`${line.toString()}`}
        tabIndex={0}
        className={classNames({
          [styles.lines]: true,
          [styles["user-selected"]]: (moreInfoAbout === index || continueOpen === index) && showAside,
          [line.className ? line.className : ""]: true,
        })}
        onKeyDown={e => {
          if(e.key === "Enter") executeFunctions(line, index, setMoreInfoAbout, moreInfoAbout, continueOpen)
        }}
        onClick={() => executeFunctions(line, index, setMoreInfoAbout, moreInfoAbout, continueOpen)}
      >
        {line.getValidProperties().map((property: string, index: number) => (
          <td
            key={`${line.getValue(property)}`}
            className={classNames({
              "pt-4 pb-4 red-container border text-center": true,
              [styles.data]: true,
            })}
          >
            {line.getValue(property)}
          </td>
        ))}
      </tr>
      {/**
       * Little menu that opens when user click in
       * one item in the table.
      */}
      {showAside && (
        <tr className={classNames({
          [styles["infos-user-box"]]: moreInfoAbout === index || continueOpen === index,
          "d-none": moreInfoAbout !== index && continueOpen !== index,
          "position-relative text-white container p-3": true,
        })}>
          <td colSpan={length} className="p-0">
            <div className={classNames({
              "p-4 red-container": true,
              [styles.aside]: true,
            })}>
              {line.aside}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

interface INavigationButtonFooterBar {
  showGoToFirst: boolean;
  showGoToLast: boolean;
  buttons: Array<Array<Line>>;
  minPage: number;
  curPage: number;
  maxPage: number;
  onClick: Function;
}
export const NavigationFooterBar = ({ showGoToFirst, showGoToLast, buttons, minPage, curPage, maxPage, onClick }: INavigationButtonFooterBar) => {
  return (
    <div className={stylesButton.footer}>

      {/* Go to first page button */}
      {showGoToFirst && (
        <NavigationButton
          index={0}
          buttonText={`<<<`}
          curPage={curPage}
          onClick={() => onClick(0)}
          key={'navigate-button-footer-first'}
        />
      )}

      {/* Ten buttons between, first-cur-last buttons */}
      {buttons.map((_: any, index: number) => (
        <NavigationButton
          index={minPage + index}
          key={`navigate-button-footer`}
          buttonText={String(minPage + index + 1)}
          curPage={curPage}
          onClick={() => onClick(minPage + index)}
        />
      ))}

      {/* Go to last page button */}
      {showGoToLast && (
        <NavigationButton
          index={maxPage}
          buttonText={`>>>`}
          curPage={curPage}
          onClick={() => onClick(maxPage)}
          key={'navigate-button-footer-last'}
        />
      )}
    </div>
  )
}

interface INavigationButton {
  index: number;
  buttonText: string;
  onClick: MouseEventHandler;
  curPage: number;
}
const NavigationButton = ({ index, buttonText, onClick, curPage }: INavigationButton) => {
  return (
    <button onClick={onClick} className={classNames({
      [stylesButton["pages-button"]]: curPage !== index,
      [stylesButton["pages-button-selected"]]: curPage === index,
    })}>
      <span>{buttonText}</span>
    </button>
  )
}

interface IAnyContentMessage {
  length: number
}
const AnyContentMessage = ({ length }: IAnyContentMessage) => {
  return (
    <tr className={styles.anycontent}>
      <td colSpan={length} className={styles.anycontent}>
        Nenhum conteúdo para ser mostrado...
      </td>
    </tr>
  )
}

export function createButton(onClick: Function): JSX.Element {
  return (
    <button className={styles["view-button"]} onClick={_ => onClick()}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary bi bi-eye-fill" viewBox="0 0 16 16">
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      </svg>
    </button>
  )
}