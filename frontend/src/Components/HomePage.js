import React, { useEffect, useState } from "react";
import RankingList from "./Rankings";
import { Route, Switch } from "react-router-dom";
import Generate2 from "./Generate2";

const HomePage = () => {

    //our api
    const url = "https://polar-stream-40791.herokuapp.com/mps/";

    //set state to store all MPs
    const [everyone, setEveryone] = useState([]);

    //get our database
    useEffect(() => {
        const getEveryone = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setEveryone(data)
        }
        getEveryone();
    }, [])

    const toggle = () => {
        const navbarMenu = document.getElementById("nav-links");
        navbarMenu.classList.toggle("is-active");
    };

    
    return (
        <>
            <nav className="navbar has-shadow">
                <div className="navbar-brand">
                    <a className="navbar-item" id="logo" href="/">
                        RANK YOUR MPs
                    </a>
                    <div className="navbar-burger" id="burger" onClick={toggle}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className="navbar-menu" id="nav-links">
                    <div className="navbar-end">
                        <a href="/ilikethis" className="navbar-item">
                            Rankings
                        </a>
                    </div>
                </div>
            </nav>

           
            <Switch>
                <Route exact path="/ilikethis">
                    <RankingList everyone={everyone} url={url}/>
                </Route>

                <Route exact path='/'>
                    <p className="title is-4 my-6"> Were we let into Parliament for our looks? No. Will we be judge on them? Still No.</p>
                    <h1 className="title is-2 mb-6"> Who's more Likeable? Click to Choose</h1>

                    <div className="container">
                    <div className="columns is-mobile is-variable is-2 is-vcentered is-align-self-center">

                    {everyone.length > 0 ? <Generate2 props={everyone} /> : null}

                    </div>
                    </div>
                </Route>
            </Switch>
            
        </>
    )
}

export default HomePage;

