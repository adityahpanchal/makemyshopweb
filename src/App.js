import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "./Backend";

const App = () => {
  const userState = useSelector(state => state.auth)
  const dispatch = useDispatch()
  // useEffect(async() =>{
      
  // }, [])

  

  const getUser = () =>{
    return fetch(`${API}/getuser/${userState.userID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userState.token}`
      }
      }).then((data) => {
        return data.json()
      }).then((data) => {
        return data
      })
  }

  const gstt = async() =>{
    const re = await getUser()
    console.log(re)
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={gstt}>Getter</button>
    </div>
  );
}

export default App

{/* <div class="form-group col-md">
				<label>Select size</label>
				<div class="mt-2">
					<label class="custom-control custom-radio custom-control-inline">
					  <input type="radio" name="select_size" checked="" class="custom-control-input">
					  <div class="custom-control-label">Small</div>
					</label>

					<label class="custom-control custom-radio custom-control-inline">
					  <input type="radio" name="select_size" class="custom-control-input">
					  <div class="custom-control-label">Medium</div>
					</label>

					<label class="custom-control custom-radio custom-control-inline">
					  <input type="radio" name="select_size" class="custom-control-input">
					  <div class="custom-control-label">Large</div>
					</label>

				</div>
		</div> */}