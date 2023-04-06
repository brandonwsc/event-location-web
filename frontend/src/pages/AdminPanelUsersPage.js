import AdminPanelEventPage from "./AdminPanelEventPage";
import AdminNavBar from "../components/AdminNavBar";
import React, {useEffect, useState} from "react";
import AdminUsersCard from "../components/AdminUsersCard";
import {backendUrl} from "../variables";
import CreateNewUserCard from "../components/CreateNewUserCard";
import {useLocation} from "react-router-dom";

function AdminPanelUsersPage() {
    const [users, setUsers] = useState([]);
    const [userIdSelected, setUserIdSelected] = useState(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [name, setName] = useState("");

    function getUsers() {
        fetch(`${backendUrl}/admin/getalluser`)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            });
    }

    function createNewUser(username, password) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);
        urlencoded.append("isAdmin", false);

        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
            credentials: 'same-origin',
        };
        fetch(`${backendUrl}/admin/createuser`, requestOptions)
            .then(() => {
                reload();
                setIsCreatingUser(false);
            });

    }

    function updateUser(userId, username, password) {
        console.log(username)
        console.log(password)
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("userId", userId);
        urlencoded.append("username", username);
        urlencoded.append("password", password);

        let requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
            credentials: 'same-origin',
        };
        fetch(`${backendUrl}/admin/updateuser`, requestOptions)
            .then(() => {
                reload();
            });

    }

    function reload() {
        getUsers();
    }

    function deleteUser() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("userId", userIdSelected);

        let requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
            credentials: 'same-origin',
        };
        fetch(`${backendUrl}/admin/deleteuser`, requestOptions)
            .then(() => {
                reload();
            });
    }

    useEffect(() => {
        getUsers();
        let username = sessionStorage.getItem("username");
        setName(username);
    }, [])
    return (
        <div>
            <AdminNavBar/>
            <div className="row">
                <section className="col-6 p-1">
                    <button onClick={() => {
                        setIsCreatingUser(!isCreatingUser)
                    }}
                            type="button"
                            className="btn btn-outline-light bg-transparent d-flex align-content-center justify-content-center w-100">
                        <i className="fa fa-circle-plus color-green fa-2x"></i>
                        <div className='color-green'>Create</div>
                    </button>
                </section>


                <section className="col-6 p-1">
                    <button type="button"
                            className="btn btn-outline-light bg-transparent d-flex align-content-center justify-content-center w-100"
                            onClick={deleteUser}
                    >
                        <i className="fas fa-trash-alt color-red fa-2x"></i>
                        <div className='color-red'>Delete</div>
                    </button>
                </section>
            </div>
            <div className="container">
                {
                    isCreatingUser &&
                    <div className="d-flex flex-row justify-content-center">
                        <CreateNewUserCard createNewUser={createNewUser}/>
                    </div>
                }

                <div className="row">
                    {
                        users && users.map((user, index) => {
                            return (
                                <AdminUsersCard key={index} userId={user.UserId} username={user.username}
                                                password={user.password} setUserIdSelected={setUserIdSelected}
                                                isSelected={userIdSelected === user.UserId} updateUser={updateUser}/>
                            )
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default AdminPanelUsersPage;