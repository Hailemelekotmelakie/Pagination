import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./app.css";
let counter = null;

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(new URLSearchParams(useLocation().search).get("page"))
  );

  let itemPerPage =
    parseInt(new URLSearchParams(useLocation().search).get("offset")) || 4;
  let nameNext = "";
  let namePrevious = "";
  let numberOfPagesToLeftAndRightFromSelected = 2;
  let lastPage = Math.ceil(data.length / itemPerPage);
  let start = (currentPage - 1) * itemPerPage;
  let end = (currentPage - 1) * itemPerPage + itemPerPage;

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
        data.slice(start, end).map((val) => {
          return (
            <div key={val.id}>
              <p>{val.email}</p>
              <p>{val.id}</p>
            </div>
          );
        })}
      <div>
        {currentPage && (
          <div className="uList">
            <Link to={`/?offset=${itemPerPage}&page=${currentPage - 1}`}>
              <button
                disabled={currentPage <= 1}
                className="eachList"
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
                style={{ cursor: currentPage <= 1 ? "not-allowed" : "pointer" }}
              >
                {namePrevious ? namePrevious : <>&lsaquo;</>}
              </button>
            </Link>
            {[...Array(lastPage)].map((_val, index) => {
              index = index + 1;
              const render = (
                <div key={index}>
                  {Math.abs(index - currentPage) <=
                  numberOfPagesToLeftAndRightFromSelected ? (
                    <Link to={`/?offset=${itemPerPage}&page=${index}`}>
                      <button
                        className="eachList"
                        style={{
                          backgroundColor:
                            parseInt(currentPage) === parseInt(index)
                              ? "#a3b2b1"
                              : "",
                          cursor:
                            currentPage === index ? "not-allowed" : "pointer",
                        }}
                        onClick={() => {
                          setCurrentPage(index);
                        }}
                      >
                        <p style={{ display: "none" }}>{(counter = index)}</p>
                        {index}
                      </button>
                    </Link>
                  ) : (
                    <div>
                      {index === 1 || index === lastPage ? (
                        <Link to={`/?offset=${itemPerPage}&page=${index}`}>
                          <button
                            className="eachList"
                            style={{
                              backgroundColor:
                                currentPage === index ? "#a3b2b1" : "",
                              cursor:
                                currentPage === index
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            onClick={() => {
                              setCurrentPage(index);
                            }}
                          >
                            <p style={{ display: "none" }}>
                              {(counter = index)}
                            </p>
                            {index}
                          </button>
                        </Link>
                      ) : (
                        <>
                          {counter + 1 === index && (
                            <Link
                              to={`/?offset=${itemPerPage}&page=${
                                index > currentPage
                                  ? Math.ceil((index + lastPage) / 2)
                                  : Math.ceil(currentPage / 2)
                              }`}
                            >
                              <button
                                className="eachList"
                                style={{
                                  backgroundColor:
                                    currentPage === index ? "#a3b2b1" : "",
                                }}
                                onClick={() => {
                                  index > currentPage
                                    ? setCurrentPage(
                                        Math.ceil((index + lastPage) / 2)
                                      )
                                    : setCurrentPage(
                                        Math.ceil(currentPage / 2)
                                      );
                                }}
                              >
                                {index > currentPage ? (
                                  <>&raquo;</>
                                ) : (
                                  <>&laquo;</>
                                )}
                              </button>
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
              return render;
            })}
            <Link to={`/?offset=${itemPerPage}&page=${currentPage + 1}`}>
              <button
                disabled={currentPage >= lastPage}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
                className="eachList"
                style={{
                  cursor: currentPage >= lastPage ? "not-allowed" : "pointer",
                }}
              >
                {nameNext ? nameNext : <>&rsaquo;</>}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
