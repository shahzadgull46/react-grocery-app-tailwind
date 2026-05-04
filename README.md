

# 🛒 React Grocery App with Search & Shimmer UI## Screenshots

### Home Page
![Home Page](./assets/home-page.png)

### Search Results
![Search Results](./assets/search-results.png)

### Shimmer Loading
![Shimmer Loading](./assets/shimmer-loading.png) 

## 📌 Concepts Covered
- Monolith vs Microservices
- useEffect Hook
- API Fetching
- CORS Issue
- Shimmer UI
- Conditional Rendering
- useState vs useRef
- Search Filtering

## ⚙️ Tech Stack
- React
- JavaScript
- CSS

## 🚀 Features
-- Real-time product search with instant filtering
- API-driven product listing
- Shimmer UI for better user experience during loading
- Optimized rendering using React hooks

## 🧠 Key Learnings
- useEffect runs after render
- State triggers re-render
- Controlled inputs require onChange
- Separation of concerns in architecture

## 🔍 Search Functionality

This app includes a dynamic search feature:

- Users can type in the search bar
- Input is controlled using React state
- Products are filtered in real-time based on user input
- Filtering is case-insensitive

### 🧠 Implementation Details

- Used `useState` to store search text
- Used `onChange` to update input value
- Applied `.filter()` on product list
- Used `.includes()` for matching titles
## ⚠️ Challenges Faced

- Handling CORS issues while fetching API
- Managing state updates efficiently
- Avoiding unnecessary re-renders

### 💡 Code Snippet

```jsx
const [searchText, setSearchText] = useState("");

<input
  type="text"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
/>

const filteredProducts = productList.filter((res) =>
  res.title.toLowerCase().includes(searchText.toLowerCase())
);

                          ### Vidoe 6: Exploring the world:

# Part 1:

### Monolith & Microservice architecture:

1. Monolith:

Earlier we use to  have a big project. suppose we have building an app. 

We have Api in the project . Ui in the same project. also Database , SMS handling in the same project. All the code in the same project. if we have to make any changes like edit the button we have to compile the whole project and deploy the whole project. This is monolith architecture. All big compaines preferring microservice architecture.

1. Microservices:

In microservice architercture we have different services for different job like we have service like backend servie , Ui project, service which connect to database which maintain database, service for sms sending or email sending. These are microservices. All these services combined to make a big app. We have separate projects for separate things , This is known as (**separation of concerns**).  

It follows single responsibility principle. With these all teams work and maintains its own work.

How are services deployed ?

Assume our project is Ui microservice and it is written in react. One more advantage of microservice architecture is we can right our microservice archirtecture in any language we want like Ui in react , Database in python. 

### One more thing is how these services interact with each other?

There are different types of connections between services. 

All the services are run on their specific port . On different ports we can deploy different services. 

Example:

like assume our project host: port 5173 =⇒ for Ui service

                                   port 1000 =⇒ for sms service  

How they interact: =⇒ They make call to different Urls 

# Part 2:

Best approach (When web page loads =⇒ render =⇒ fetch Api =⇒ re render)

useEffect is best for this purpose and we fetch data in useEffect.

### useEffect hook:

useEffect comes from react library and imported as name import. 

In useEffect we have to pass two parameters one is callback function and other is dependency to add.

Syntax:

```jsx

useEffect(()=>{},[])

```

The important question is which is called first our component or callback function  

look:

```jsx

useEffect(()=>{
  console.log("after rendering all stuff useEffect is  called")
},[])
console.log("First body component will be called")
```

Working:

When we write this function in our body component first our body component code will be rendered and when render cycle is finished then useEffect callback function will be called. 

### If you have to do something after rendering the component you have to write inside useEffect. (This is the purpose of useEffect)

Pratical look:

Go to inspect and go to sources and and put 2 debuggers on following given lines

1. console.log("useEffect called") 
2. <div className="body">

now pause when we rendered our bod component we saw the skeleton  and now check console you dont saw the called message 

now pause again and you see the message we write in console.

conslusion is =⇒ first component will be rendered then useEffect call back function will be called.

We use fetch function for fetching data and this feature is given us by the browser

What fetch returns =⇒ it returns a promise. how we get this by try cath method or by async await mehtod. use async await for better experience. 

so our code is :

```jsx
const fetchData=async()=>{
  const data = await fetch("https://world.openfoodfacts.org/api/v2/search?search_terms=milk&page_size=5",
      { headers: { "User-Agent": "grocerryApp/1.0 (shahzadgull@5059gmail.com)" } }
    );
    const json= await data.json()
    console.log(json)
 
}

useEffect(()=>{
  fetchData();
},[])

```

When we check console we saw cors error. 

Access to fetch at 'https://world.openfoodfacts.org/api/v2/search?search_terms=milk&page_size=5' from origin '[http://localhost:5173](http://localhost:5173/)' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

To solve this problem we have to install core chrome extension. we can also on off from options.

Now saw our console and we saw our fetched data.

We fetched the data now we have to re render it 

for updating our list and ui :

setproductList(json.products);

### The problem we are facing is that we have not a good free api, We learned the method how to fetch data instead of using real api now lets switch to dummy api

```jsx
const data = await fetch(
      "https://dummyjson.com/products/category/groceries",
    );
```

Now our Ui is updated when we refresh our browser page we saw our old products for one second. This is because we are using groProduct list which is also dummy data. lets remove it. 

Also del mockdata file we no longer need this.

```jsx
// optional chaining
    setproductList(json?.products);
```

When we refresh our web page we saw blank page for less than one second 

Lets show some like loading .. for this time period.

```jsx
if(productList.length===0){
    return <h3>loading.....</h3>
  }
```

but is showing a loading spinner is good way ? Answer is NO:

Lets work with industry standard :

### Concept of Shimmer Ui :

What is Shimmer Ui? 

It resembels the page as actual Ui. like it laods the fake page until we get actual data from the api. 

Instead of showing loading we can show a fake skeleton. like we can show fake cards till the data is gotten.

Pratical look =⇒ Go to any web and refresh the page you will saw the shimmer ui for a second

 This is much better user experience. 

Youtube also uses this Ui. 

### Always when you are building an app and your api taking some time load a shimmer Ui quickly.

Lets build a simple shimmer Ui for our web:

Shimmer component:

```jsx
const Shimmer = () => {
  const cards = [];
  for (let i = 0; i < 30; i++) {
    cards.push(<div key={i} className="shimmer-card"></div>);
  }

  return <div className="shimmer-container">{cards}</div>;
};
export default Shimmer;

```

In body component:

```jsx
 if(productList.length===0){
    return <Shimmer/>
  }
```

This is simple Ui we can make it more fancy. 

### Part 5 of video:

### Conditional rendering

For displaying shimmer effect we wrote a condition which is given above also 

Rendering on the basis of condition is called conditional rendering. 

We can also write this codition and club our code by using **ternary operator.**

 little code as demo. So if we have to merge them both we will use ternary operator

```
if(productList.length===0){
    return <Shimmer/>
  }
  return (
    <div className="body">
```

Lets see how to do this:

```jsx
return productList.length===0 ? <Shimmer/>
     : 
      (
    <div className="body"> ....... next code lines..
```

### Dev are confused about useState , like we have normal var why we create and even need useState var:

Dev don’t know that why we use local state variable. and what is the ability of local state var that normal javascript variable do not have?

### Why we use useState var ?

To understand better lets learn with example. 

lets build a little feature in our app of login/logout. When we click on button our login turns to logout and when we again click on button our logout turns into login. Lets do it. 

 lets add a button in our header:

<button className="login-btn">login</button>

So when we write code for this logic We will saw an error that we can not access the value after rendering the component.

```jsx
const Header = () => {
  let btnName = "Login"
  return (
  <div className="nav-items">
  <ul>
  
  <button className="login-btn" onClick={()=>{btnName="Logout"}}>{btnName}</button>
   </ul>
   </div>
   );
};

export default Header;
```

Now we have an error which states following lines:

Error: Cannot reassign variable after render completes

Reassigning `btnName` after render has completed can cause inconsistent behavior on subsequent renders. Consider using state instead.

### To solve this problem and also don’t use useState the solution is useRef:

### useRef:

It is also a hook. we have to import it from react as named import. 

useRef stores the values but not changes the Ui like no re render

`useRef` does NOT trigger re-render

If our goal is just to store value then we will use useRef. 

### How to use It:

When we write:

const btnName = useRef("Login");

when we use useRef react does not give us the normal variable it gives us an **object** like this:

```
{
current:"Login"
}
```

So:

- `btnName` = the whole object
- `btnName.current` = the actual value

## Why `.current` exists

React needs a way to:

- Store a value
- Keep it **persistent between renders**
- Without causing re-render

So it wraps your value inside an object → `current`

Now use useRef in our code:

```jsx
import{useRef} from "react"
const Header = () => {
 let btnName = useRef("Login")
  return (
  <div className="nav-items">
  <ul>
  
 <button className="login-btn" onClick={()=>{
            btnName.current="Logout"
            console.log(btnName.current)
            }}>
            login
            </button>
   </ul>
   </div>
   );
};

export default Header;
```

I know this is not a normal variable but i found this solution to store the value otherwise it gives us error becuse of react principles. 

### So don’t wasting any time we have to do this with useState

```jsx
import{useState} from "react"

const Header = () => {
  const [btnNameReact,setbtnNameReact]=useState("login");
  return (
  <div className="nav-items">
  <ul>
  
  <button className="login-btn" onClick={()=>{
            setbtnNameReact("Logout")
            console.log(btnNameReact)
          }
            }>{btnNameReact}</button>
   </ul>
   </div>
   );
};

export default Header;
```

As it is local state variable whenever 

### Whenever state variable will changed react will re render the component like in this case header component .

### Now the question is: is react refreshing our whole header component or only  refreshing the button?

Is it rendering the whole header again or just rendering the button?

When you see code in console and in elements see the button elements when we clicks on button it shows some changes on button. What you think about that react is rendering only button ?

### The answer is: react is doing whole component re render quickly.

Prove:

lets write console statment in our header component:

  console.log("Header rendered")

now see in console we will saw this message. now click on login button and see console it will show again this message 

It means whole component is re rendered quickly.

### Another question is: Is this is const variable how the value changes ? how the value is updated?

```jsx

  const [btnNameReact,setbtnNameReact]=useState("login");
```

is btnNameReact is constant varibale then how can we constant variable?

The Answer is:

Whenever we update the btnNameReact variable react is updating this variable and it is calling this header function once again(rendering the function once again) but this time when you envoke header function this btnNameReact variable is new variable. This variable is different than the older variable and when new variable is created it is not created by default value it is created by updated value.

Now lets make our button to toggle button:

```jsx
<button className="login-btn" onClick={()=>{
            btnNameReact === "Login" ?setbtnNameReact("Logout"):setbtnNameReact("Login")
            console.log(btnNameReact)
          }
            }>{btnNameReact}</button>
```

### Part 6 of video:

if search === “” then re render my all cards again

Lets add a search feature. 

To get data from input box we need to take value and bind the input box to local state var. 

So we will create one more state var(searchText) and bind it with input box

```jsx
const Body = () => {
  
  const [searchText,setsearchText] = useState("");

<div className="filter">

        <div className="search-container">
          <input type="text" className="search-box" value={searchText} />
          <button className="search-btn" onClick={()=>{
            // filter products and update ui 
            
             console.log(searchText)
            
          }}>Search</button>
        </div>
        };
```

Now check is it working or not. When we will go to search and give any input our search box is not getting the input and also we will saw an error in console:

Error :

You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
checkControlledValueProps @ react-dom_client.js?v=48de0e50:1187Understand this error

Why this is happening? 

we bind our value to the searchText state var and this variable is bind with input 

whatever is in the searchText it is in the value and when we are changing the value the value is still tight to searchText var and not changing. our searchText is not getting updated so the value will not change. searchText is empty so input box will not change unless we change the searchText 

So we have to declare onchange function which works when the input value changes onchage fun should also change the value and updates the searchText. and how we will update our searchText local state variable? (using set second parameter of useState)

```jsx
<div className="search-container">
          <input type="text" className="search-box" value={searchText} onChange={(e)=>{
           setsearchText(e.target.value)
          }}/>
```

Now we will get input in console.

### information:

Whenever we type in input box even a single word we are changing the local state variable and what happens when we change local state variable?

### Always remember when we change the local state variable react re renders the component and it is re rendering the whole component.

lets see in console is it rendering the whole component or not:

how we can see this 

write this code line in body 

console.log("body rendered")

Now go to console and refresh the page. now we will see body rendered 2 times message (why this is showing as 2 times because we are fetching the data also so after we fetch the data react re renders our component that’s why it is showing 2 times  )

Now input any word or letter when we write even one word body rendered message is showing and as we are writing this message is getting updates and increasing 

### State variable=⇒ whenever state variable update react triggers reconciliation cycle(re renders the component with the new data)

This is the beauty of react. 

### How react is so fast?

because of reconciliation algorithm (react fibers=⇒ making reacts faster) 

React has best algorithm of rendering. react is finding diff between older and newer virtual dom and it sees any small  changes  it updates it quickly

### Now we have to write the filter logic and update our Ui:

```jsx
             const filteredProducts = productList.filter((res)=>{
               return res.title.toLowerCase().includes(searchText.toLowerCase())
              })
              setproductList(filteredProducts)
            }}
```

There is one bug which is that when we search  product and after searching we again search other product our page gets blank and shows noting .

Try to solve this bug:

 For this we create one more useState var:

These lines are used for this :

```jsx
const Body = () => {
 

  const [filteredList, setfilteredList] = useState([]);
    setfilteredList(json?.products);
     setfilteredList(filteredProducts);
     <div className="super-saver">
        {filteredList.map((product) => (
          <Product key={product.id} groData={product} />
        ))}
      </div>
    </div>
  
```
### imp note: i praticed at dummy data then i realise to learn from live data then i make changes with my code according to live data 
full updated code is given below:
Now we are using live data of open food facts.
