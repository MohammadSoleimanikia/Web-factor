# Router

## define routes in routes.ts

```js
route("about","routes/About.tsx"),
```

each route needs a loader to ignore it use default export

## use params in components.

```js
// in routes.ts
route("invoice/:invoiceId", "routes/invoice.tsx");
```

```js
// Define the loader function that runs before rendering the route
// Route.LoaderArgs gives us the correct types for params, request, etc.
export async function loader({ params }: Route.LoaderArgs){

    // Get the invoiceId from the URL parameters (e.g. /invoice/123)
    const invoiceId=params.invoiceId

     // The returned object becomes "loaderData" in the component
    return {invoiceId}
}

export default function Invoice({loaderData}:Route.ComponentProps){
    return <h1>Invoice {loaderData.invoiceId}</h1>
}
```

## nested Routes

1. add routes as third argument of the parent route

```js
route("dashboard", "routes/dashboard.tsx", [
        // child
        route("finances","routes/finances.tsx"),
    ]),
```

2. add Outlet to show child routes inside of parent Route

```js
import { Outlet } from "react-router";

export default function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <Outlet />
        </>
    );
}
```

**the child path:** /dashboard/finances

## layout

if you want make a layout that does not included in URL use `layout`
for example change dashboard from nested to layout

```js
// in routes.ts
layout("routes/dashboard.tsx", [
        route("finances","routes/finances.tsx"),
        route("personal-info","routes/personalInfo.tsx"),
    ]),
```

## react-router-config

1. rendering strategy
    1. client side rendering : entire app will render on browser
       set ssr to false
       ssr is better for SEO
        - first load is slow and SEO is weak
        -

## load data inside of App:

data is fetched using the loader and the client loader function

### loader function :

- it is used to fetch data for `SSR` or `pre-rendering`
- first prepare server data then render the component
- used for private API

### clientLoader

- used for client side rendering
- browser fetch the data before the rendering
- used for browser APIs like localStorage

## action

- used for mutating data that handle post , put or delete requests.
- after action completed all the data on the page is auto reEvaluated so UI always stays sync

### clientAction

- run on the browser only

### action

- run on the server
- it removes from the client bundles

1. use Form component from react-router.

```js
<Form method="delete">
    <button type="submit">Delete</button>
</Form>
```

2. add action function

```js
export async function clientAction({ params }: Route.LoaderArgs){
    await fetch(`https://jsonplaceholder.typicode.com/posts/${params.invoiceId}`,{
        method:"DELETE"
    })
    return redirect("/")
}
```

**Note:** if we don't want the `redirect`

```js
export async function clientAction({ params }: Route.ClientActionArgs) {
    try {
        await fetch(
            `https://jsonplaceholder.typicode.com/posts/${params.invoiceId}`,
            {
                method: "DELETE",
            }
        );
        return { isDeleted: true };
    } catch (error) {
        return {isDeleted:false}
    }
}
```

then use `fetcher.Form` and `useFetcher`

```js
// useFetcher hook used to retrieve data from action
const fetcher = useFetcher();
const isDeleted = fetcher.data?.isDeleted;
return (
    <>
        {!isDeleted && (
            <>
                <h1>title: {loaderData.title}</h1>
                <p>body: {loaderData.body}</p>

                <fetcher.Form method="delete">
                    <button type="submit">Delete</button>
                </fetcher.Form>
            </>
        )}
    </>
);
```

## navigation 

1. with redirection
```js
// automatically
// this is only works in loader or action functions
return redirect("/")
```

2. with useNavigate hook 
with `useNavigate`:
```js
const navigate = useNavigate();
<button onClick={()=>navigate('/')}>home</button>
```

3. use `<link>` from react-router
```js
<Link to={"/about"}>about</Link>
```

4. use `navLink` :
it used for navigation links that need to render `active` and `pending` states 

```js
<NavLink className={({isActive})=> isActive ?"bg-red-400" :"bg-blue-400 "} to={"about"}>about</NavLink>
```