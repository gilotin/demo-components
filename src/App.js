import * as userService from "./services/userService";

import { Fragment, useEffect, useState } from "react";
import { DeleteUser } from "./components/DeleteUser";
import { EditCreate } from "./components/Edit";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Pagination } from "./components/Pagination";
import { Search } from "./components/Search";
import { Table } from "./components/table/Table";
import { UserDetails } from "./components/UserDetails";
import "./App.css";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService
            .getAll()
            .then((users) => {
                setUsers(users);
            })
            .catch((err) => {
                console.log("Error" + err);
            });
    }, []);

    return (
        <Fragment>
            <Header />
            <main className="main">
                <section className="card users-container">
                    <Search />

                    <Table users = {users}/>

                    <button className="btn-add btn">Add new user</button>

                    <Pagination />
                </section>

                {/* <!-- User details component  --> */}
                {/* <UserDetails/> */}

                {/* <!-- Create/Edit Form component  -->*/}
                {/* <EditCreate/> */}

                {/* <!-- Delete user component  -->*/}
                {/* <DeleteUser/> */}
            </main>
            <Footer />
        </Fragment>
    );
}

export default App;
