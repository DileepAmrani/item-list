import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const fetchData = () => {
    axios
      .get("/data")
      .then((res) => {
        setstate(res.data);
      })
      .then((result) => {
        console.log(state);
      });
  };
  useEffect(() => {
    console.log(isEdit);
    fetchData();
  }, []);
  const [state, setstate] = useState([]);
  const [isEdit, setIsEdit] = useState();
  const [modifId, setId] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const titleDom = document.querySelector("#title");

    const title = titleDom.value;

    if (!isEdit) {
      axios
        .post("/add", {
          title: title,
        })
        .then((res) => {
          console.log(res);
          fetchData();
          titleDom.value = "";
        });
    } else {
      console.log("houssem");
      console.log(modifId);

      axios
        .put("/edit", {
          _id: modifId,
          title: title,
        })
        .then((res) => {
          fetchData();
          setIsEdit("");
          titleDom.value = "";
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete("/delete/" + id)
      .then((res) => console.log(res))
      .then((res) => {
        const updateState = state.filter((element) => {
          return element._id !== id;
        });
        setstate(updateState);
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = (_id) => {
    setIsEdit(true);
    setId(_id);
    console.log(modifId);

    const titleDom = document.querySelector("#title");
    titleDom.value = state.find((element) => {
      return element._id == _id;
    }).title;
  };
  return (
    <div>
      <h3>MY LIST</h3>
      <div className="container">
        <div>
          <h4>Add and item ...</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title"></label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="type item here"
            />
            <button class="btn-add"> {isEdit ? "Edit" : "Add"} </button>
          </form>
          <div>
            <ul>
              {state.length > 0 &&
                state.map((element) => {
                  return (
                    <li key={element._id}>
                      {" "}
                      {element.title}{" "}
                      <button
                        onClick={() => handleEdit(element._id)}
                        className="edit"
                      >
                        <i class="fas fa-edit"></i>
                      </button>{" "}
                      <button
                        onClick={() => handleDelete(element._id)}
                        className="delete"
                      >
                        <i class="fas fa-ban"></i>
                      </button>{" "}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
