import Loader from "react-loader-spinner"

const LoaderScreen = () =>{
    return <div style={{position: "fixed", top: '50%', left: '50%', right: '50%', marginTop: '-100px', marginLeft: '-50px'}}>
        <Loader type="Circles" color='#e6490b' secondaryColor='grey' height={100} width={100} />
    </div>
}

export default LoaderScreen 


// import React, { useEffect } from "react";
// import Axios from 'axios'

// const App = () => {

//   useEffect(async() =>{
//     let data = await Axios.get('http://guamvisitor.com:3005/apiv2/question/list?formType=custom')
//     let json = JSON.parse(data.request.response)
//     console.log(json.data.slice(0, 5).map((x) => x.question))
//   }, [])

//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }

// export default App