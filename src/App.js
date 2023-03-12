import * as userService from "./services/userService";

import { Fragment, useEffect, useState } from "react";
import { DeleteUser } from "./components/DeleteUser";
import { EditCreate } from "./components/EditCreate";
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

    const onUserCreate = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData);

        const createdUser = await userService.create(data);

        setUsers(state => [...state, createdUser]);

        

    };

    return (
        <Fragment>
            <Header />
            <main className="main">
                <section className="card users-container">
                    <Search />

                    <Table users={users} onUserCreate={onUserCreate} />

                    <Pagination />
                </section>

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
