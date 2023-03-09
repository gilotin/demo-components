import { Fragment } from "react";
import { DeleteUser } from "./components/DeleteUser";
import { EditCreate } from "./components/Edit";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Pagination } from "./components/Pagination";
import { Search } from "./components/Search";
import { Table } from "./components/Table";
import { UserDetails } from "./components/UserDetails";

// import "./App.css";

function App() {
    return (
        <Fragment>
            <body>
                <Header />
                <main class="main">
                    <section class="card users-container">
                        <Search />

                        <Table />

                        <button class="btn-add btn">Add new user</button>

                        <Pagination />
                    </section>

                    {/* <!-- User details component  --> */}
                    {/* <UserDetails/> */}

                    {/* <!-- Create/Edit Form component  -->*/}
                    {/* <EditCreate/> */}
                          

                    {/* <!-- Delete user component  -->*/}
                      {/* <DeleteUser/> */}

                </main>
                  <Footer/>
            </body>
        </Fragment>
    );
}

export default App;
