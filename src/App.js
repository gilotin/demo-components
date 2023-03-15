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
    const [formValues, setFormValues] = useState({ firstName: "", lastName: "" });
    const [formErrors, setFormErrors] = useState({ firstName: "", lastName: "" });

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

        setUsers((state) => [...state, createdUser]);
    };

    const onUserDelete = async (userId) => {
        await userService.deleteUser(userId);

        setUsers((state) => state.filter((x) => x._id !== userId));
    };

    const onUserUpdateSubmit = async (e, userId) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData);

        const updatedUser = await userService.update(userId, data);

        setUsers((state) => state.map((x) => (x._id === userId ? updatedUser : x)));
    };

    const formChangeHandler = (e) => {
        setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const formValidate = (e) => {
        const value = e.target.value;
        const errors = {};

        if (e.target.name === "firstName" && (value.length < 3 || value.length > 20)) {
            errors.firstName = "First name should be between 3 and 20 characters.";
        }

        if (e.target.name === "lastName" && (value.length < 3 || value.length > 20)) {
            errors.lastName = "Last name should be between 3 and 20 characters.";
        }
        setFormErrors(errors);
    };

    return (
        <Fragment>
            <Header />
            <main className="main">
                onUserUpdateSubmit
                <section className="card users-container">
                    <Search />

                    <Table
                        users={users}
                        onUserCreate={onUserCreate}
                        onUserUpdateSubmit={onUserUpdateSubmit}
                        onUserDelete={onUserDelete}
                        formValues={formValues}
                        formChangeHandler={formChangeHandler}
                        formErrors={formErrors}
                        formValidate={formValidate}
                    />

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
