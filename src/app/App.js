import { useEffect, useState } from "react";
import "./app.css";

let counter = null;

function App() {
  const [data, setData] = useState([]);
  let itemPerPage = 4;
  let NameNext = "Next";
  let namePrevious = "Previous";
  let numberOfPagesFromLeftAndRight = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const endingPage = Math.ceil(data.length / itemPerPage);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  return (
    <div className="app">
      {data.length &&
        data
          .slice(
            (currentPage - 1) * itemPerPage,
            (currentPage - 1) * itemPerPage + itemPerPage
          )
          .map((val) => {
            return (
              <div key={val.id}>
                <p>{val.email}</p>
                <p>{val.id}</p>
              </div>
            );
          })}
      {currentPage}
      <div>
        <div className="uList">
          <button
            disabled={currentPage <= 1}
            className={"eachList"}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            {namePrevious}
          </button>
          {[...Array(endingPage)].map((_val, index) => {
            index = index + 1;
            const render = (
              <div key={index}>
                {Math.abs(index - currentPage) <=
                numberOfPagesFromLeftAndRight ? (
                  <button
                    className={"eachList"}
                    style={{
                      backgroundColor: currentPage === index ? "#908e8e" : "",
                    }}
                    onClick={() => {
                      setCurrentPage(index);
                    }}
                  >
                    <p style={{ display: "none" }}>{(counter = index)}</p>
                    {index}
                  </button>
                ) : (
                  <div>
                    {index === 1 || index === endingPage || index === 100 ? (
                      <button
                        className="eachList"
                        style={{
                          backgroundColor:
                            currentPage === index ? "#908e8e" : "",
                        }}
                        onClick={() => {
                          setCurrentPage(index);
                        }}
                      >
                        <p style={{ display: "none" }}>{(counter = index)}</p>
                        {index}
                      </button>
                    ) : (
                      <>
                        {counter + 1 === index && (
                          <button
                            className="eachList"
                            style={{
                              backgroundColor:
                                currentPage === index ? "#908e8e" : "",
                            }}
                            onClick={() => {
                              index > currentPage
                                ? setCurrentPage(
                                    Math.ceil((index + endingPage) / 2)
                                  )
                                : setCurrentPage(Math.ceil(currentPage / 2));
                            }}
                          >
                            •••
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
            return render;
          })}
          <button
            disabled={currentPage >= endingPage}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            className="eachList"
          >
            {NameNext}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
