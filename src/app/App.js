import { useEffect, useState } from "react";
import "./app.css";

let counter = null;

function App() {
  const [data, setData] = useState([]);
  const itemPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [endingPage, setEndingPage] = useState(0);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setEndingPage(Math.ceil(json.length / itemPerPage));
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

      <div>
        <div className="uList">
          <button
            disabled={currentPage >= endingPage}
            className={"eachList"}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            Next
          </button>
          {[...Array(endingPage)].map((_val, index) => {
            const render = (
              <div key={index}>
                {Math.abs(endingPage - index - currentPage) <= 3 ? (
                  <button
                    className={"eachList"}
                    style={{
                      backgroundColor:
                        currentPage === endingPage - index ? "#908e8e" : "",
                    }}
                    onClick={() => {
                      setCurrentPage(endingPage - index);
                    }}
                  >
                    <p style={{ display: "none" }}>{(counter = index)}</p>
                    {endingPage - index}
                  </button>
                ) : (
                  <div>
                    {index === 0 || index === endingPage - 1 ? (
                      <button
                        className="eachList"
                        style={{
                          backgroundColor:
                            currentPage === endingPage - index ? "#908e8e" : "",
                        }}
                        onClick={() => {
                          setCurrentPage(endingPage - index);
                        }}
                      >
                        <p style={{ display: "none" }}>{(counter = index)}</p>
                        {endingPage - index}
                      </button>
                    ) : (
                      <>
                        {counter + 1 === index && (
                          <button
                            className="eachList"
                            style={{
                              backgroundColor:
                                currentPage === endingPage - index
                                  ? "#908e8e"
                                  : "",
                            }}
                            onClick={() => {
                              setCurrentPage(endingPage - index);
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
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            className="eachList"
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
