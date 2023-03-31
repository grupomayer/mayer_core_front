import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './table.module.scss'
import { NavigationFooterBar, RenderTrs } from './table_components'
import { Line } from './utils/classes';
import orderImg from "./src/caret_down.png";
import orderImgTop from "./src/caret_top.png";
import { formatCurrencyToNumber, formatToJSTypeDate } from 'Utils/formatters';

interface ITable {
  id?: string;
  className?: string;
  titles: Array<string>;
  lines: Array<Line>;
  pageable?: boolean;
  showAside?: boolean;
  continueOpen?: number;
}

const Table = ({
  id, // The table id
  className = '', // A custom className to the table
  titles, // The data that will be showed in the head (need to be a array of strings)
  lines, // The data that will be showed in the body (need to be a array of objects)
  pageable = true, // Create pages in the table with the lines reparted to set a max of data showing in the screen
  showAside, // If this table need a down menu when some line are clicked
  continueOpen, // It receives an id of a specific line to when the table are updated the asideMenu are not closed
}: ITable) => {
  const [curPage, setCurPage] = useState<number>(0);
  const [orderIndex, setOrderIndex] = useState<number>(0);
  const [orderSide, setOrderSide] = useState<"TOP" | "BOTTOM">("TOP");
  const [minPage, setMinPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [moreInfoAbout, setMoreInfoAbout] = useState<number | null>(null);
  const [amountPages, setAmountPages] = useState<number>(0);
  const [allPages, setAllPages] = useState<Array<Array<Line>>>([]);

  const maxNavigateButtons = 8
  const maxLinesInPage = 10;

  useEffect(() => {
    if (pageable) {
      setNewAmountPages();
    } else {
      updatePagesList();
    }
  }, [lines])

  useEffect(() => {
    updatePagesList();
  }, [amountPages])

  const setNewAmountPages = () => {
    setAmountPages(Number(Math.ceil(lines.length / maxLinesInPage).toFixed(0)));
    if (amountPages === Number(Math.ceil(lines.length / maxLinesInPage).toFixed(0))) {
      updatePagesList();
    }
  }

  const updatePagesList = () => {
    setMoreInfoAbout(null);
    let newLinesInPages: Array<Array<Line>> = [];
    transformLinesInPages(newLinesInPages, lines);
    setMaxAndMinPage(newLinesInPages);
  }

  function transformLinesInPages(newLinesInPages: Array<Array<Line>>, curLines: Array<Line>) {
    for (let i = 0; i < amountPages; i++) {
      newLinesInPages.push([]);
      for (let ii = i * maxLinesInPage; ii < i * maxLinesInPage + maxLinesInPage; ii++) {
        if (ii < curLines.length) {
          newLinesInPages[i].push(curLines[ii]);
        }
      }
    }
  }

  const setMaxAndMinPage = (allPages: Array<Array<Line>>) => {
    let lastPage = allPages.length
    let range = [0, lastPage]
    if (lastPage > maxNavigateButtons) {
      let min = curPage - maxNavigateButtons / 2
      let max = curPage + maxNavigateButtons / 2
      if (min < 0) {
        max += Math.abs(min)
        min = 0
      }
      if (max > lastPage) {
        min = lastPage - maxNavigateButtons
        max = lastPage
      }
      range = [min, max]
    }
    setMinPage(range[0])
    setMaxPage(range[1])
    setAllPages(allPages)
  }

  const tradePage = (index: number) => {
    setCurPage(index)
  }

  useEffect(() => {
    updatePagesList();
  }, [curPage])

  useEffect(() => {
    if (continueOpen) {
      setMoreInfoAbout(continueOpen)
    }
  }, [continueOpen])

  function getTrsData(index: number | undefined, orderSide: "TOP" | "BOTTOM"): Array<Line> {
    let curLines: Array<Line> = [];
    if (pageable) {
      if (allPages.length > curPage) {
        let returnValue = [...lines];
        let curPageLines: Array<Array<Line>> = [];
        if (index !== undefined) sortFunction(returnValue, index, orderSide);
        transformLinesInPages(curPageLines, returnValue);
        return curPageLines[curPage];
      } else if (curPage > 0) {
        setCurPage(curPage - 1);
      }
    } else {
      curLines = lines;
    }
    if (index !== undefined) sortFunction(curLines, index, orderSide)
    return curLines;
  }
  
  function orderBy(index: number) {
    setOrderSide(orderSide === 'BOTTOM' ? "TOP" : "BOTTOM");
    setOrderIndex(index);
  }

  function checkType(curValue: any) {
    let newValue = curValue;
    if(!isNaN(formatCurrencyToNumber(newValue))) {
      newValue = formatCurrencyToNumber(newValue);
    }else if(!isNaN(new Date(formatToJSTypeDate(newValue)).getTime())) {
      newValue = new Date(formatToJSTypeDate(newValue)).getTime();
    }
    return newValue;
  }

  function sortFunction(curLines: Array<Line>, index: number, orderSide: "TOP" | "BOTTOM") {
    curLines.sort((a: any, b: any) => {

      const propertyA = a.getValidProperties()[index];
      const propertyB = b.getValidProperties()[index];
      let valueA = a[propertyA];
      let valueB = b[propertyB];

      if(typeof(valueA) !== "object" && typeof(valueB) !== "object") {

        valueA = checkType(valueA);
        valueB = checkType(valueB);
        
        if(orderSide === 'BOTTOM') {
          if (valueA < valueB) {
            return -1;
          } else if (valueA > valueB) {
            return 1;
          }
        }else if(orderSide === "TOP") {
          if (valueB < valueA) {
            return -1;
          } else if (valueB > valueA) {
            return 1;
          }
        }
      }

      return 0;
    })
  }

  return (
    <section>
      {/* Inside of this div goes the table and his content. */}
      <div className={styles.container}>
        <table id={id} className={classNames({
          "table border": true,
          [className]: true,
          [styles.table]: true
        })}>
          {/* Mapping all the titles passed to the Table component */}
          <thead className={styles.head}>
            <tr>
              {titles.map((title, index) => (
                <th
                  className={classNames({
                    [styles.titles]: true,
                    "border text-center": true,
                  })}
                  key={title}
                >
                  <div className={styles.options}>
                    <span>{title}</span>
                    <button onClick={() => orderBy(index)} className={styles.order}>
                      {orderSide === 'BOTTOM' ? <img src={orderImg} className={styles.carret} /> : <img src={orderImgTop} className={styles.carret} />}
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Lines data go here */}
          <tbody className={styles.body}>
            <RenderTrs
              trsData={getTrsData(orderIndex, orderSide)}
              tableColumnsLength={titles.length}
              continueOpen={continueOpen}
              setMoreInfoAbout={setMoreInfoAbout}
              moreInfoAbout={moreInfoAbout}
              showAside={showAside}
            />
          </tbody>
        </table>
      </div>
      {/* Now we are creating the buttons case the table are pageable. */}
      {pageable && allPages.length > 0 && (
        <NavigationFooterBar
          showGoToFirst={allPages.length > maxNavigateButtons && minPage !== 0}
          showGoToLast={allPages.length > maxNavigateButtons && maxPage !== allPages.length}
          buttons={allPages.slice(minPage, maxPage)}
          curPage={curPage}
          minPage={minPage}
          maxPage={allPages.length - 1}
          onClick={tradePage}
        />
      )}
    </section>
  )
}

export default Table;