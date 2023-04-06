import userIcon from "../pages/Resource/user-icon-white.jpg";
import React, {useState} from "react";

function CreateNewUserCard(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const createNewUser=()=>{
        props.createNewUser(username,password);
    }
    return (
        <div className="col-md-6 col-sm-12 mb-4 row align-items-center">
            <div className="col-11 text-start">
                <div className="border border-dark w-25 ms-5 bg-light-grey">
                    <div className="text-dark">Create User</div>
                </div>
                <div className="border border-dark w-100">
                    <div className="row align-items-center">
                        <div className="col-4">
                            <img
                                className="img-fluid ms-4"
                                src={userIcon}
                                alt="img"
                                style={{maxWidth: "80%", height: "auto"}}
                            />
                        </div>

                        <div className="col-7">
                            <div className="d-flex flex-row my-1">
                                <div className="one-line w-100">User Name</div>
                                <input className="ms-1 w-100"
                                       type="text"
                                       name="username"
                                       value={username}
                                       onChange={handleUsername}
                                       required
                                />
                            </div>
                            <div className="d-flex flex-row my-1">
                                <div className="one-line w-100">Password</div>
                                <input className="ms-1 w-100"
                                       type="password"
                                       name="password"
                                       value={password}
                                       onChange={handlePassword}
                                       required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-end mb-2">

                        <div className="col-4 me-3">
                            <button className="row align-items-center bg-transparent btn-outline-transparent"
                                    onClick={createNewUser}>
                                <i className="col-3 fa fa-circle-plus color-green fa-2x"></i>
                                <div className='col-9 color-green'>Create</div>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default CreateNewUserCard;