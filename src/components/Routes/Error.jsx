
import { useRouteError } from "react-router-dom";


const Error = ()=>{
const error = useRouteError()
console.log(error)
    return(
    <div>
        <h1>Oops!!! </h1>
        <h3>Something Went Wrong</h3>
        <h3>Check Your Network Connection</h3>
        <h3>{error.data}</h3>
        <h4>{error.statusText}</h4>
    </div>
)
}
export default Error;