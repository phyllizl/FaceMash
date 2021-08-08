import React, { useEffect, useState } from "react";

const HomePage = () => {

    //our api
    //const url = "https://polar-stream-40791.herokuapp.com/mps/";
    const url = "http://localhost:8000/mps/";

    //set state to store all MPs
    const [everyone, setEveryone] = useState([]);

    //fetch our data from our database
    const getEveryone = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setEveryone(data)
        //console.log(everyone);
    }
    
    //get our database
    useEffect(() => {
        getEveryone();
    }, [])

    //get 2 random indexes
    const get2 = () => {
        let randomArray = [];
        if (everyone.length > 0) {
            let random = Math.floor(Math.random() * everyone.length)
            let random2 = Math.floor(Math.random() * everyone.length)
            while ( random2 === random ) {
                random2 = Math.floor(Math.random() * everyone.length);
            }
            let firstCandidate = everyone[random];
            let secondCandidate = everyone[random2];
            randomArray.push(firstCandidate, secondCandidate);
            return(randomArray);
        }
    }
    let chosen = get2(); //-> chosen = an array of 2 objects {name, url, image, rank}
    //console.log("chosen", chosen)

    //Call the elo function on onClick -> (1) calculate new rank (2) call update function (put request) to update the rank in database
    //elo rating function -> If user chooses a
    const elo = (a, b) => {
        console.log("1: original rankings: ", a.name, a.rank, b.name, b.rank)
        let aEstimated = 1/(1 + 10**((b.rank - a.rank)/400));
        let bEstimated = 1/(1 + 10**((a.rank - b.rank)/400));
        let ak = 0;
        let bk = 0;

        //calculate k value for a
        if (a.rank < 2100) {
            ak = 32;
        } else if (a.rank > 2100 && a.rank < 2400) {
            ak = 24;
        } else {
            ak = 16
        }
        //calculate k value for b
        if (b.rank < 2100) {
            bk = 32;
        } else if (b.rank > 2100 && b.rank < 2400) {
            bk = 24;
        } else {
            bk = 16
        }

        //new ranking for a if a wins
        a.rank = (Math.round(a.rank + (ak * (1 - aEstimated))));
        //new ranking for b if a wins
        b.rank = (Math.round(b.rank + (bk * (0 - bEstimated))));

        //call the update function to update database
        update(a);
        update(b);

        console.log("2: ", a.name, a.rank, b.name, b.rank);
    }

    //Function to edit mp ranking on selection
    const update = async (person) => {
        console.log("updated ranks: ", person)
        const response = await fetch(url + person.id + "/", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({rank: person.rank}),
        });
        getEveryone();
    }

    //We are going to try and hardcode this first. So this function will handle a situation when b is chosen. 
    //elo rating function -> If user chooses a
    const elo2 = (a, b) => {
        console.log("1: original rankings: ", a.name, a.rank, b.name, b.rank)
        let aEstimated = 1/(1 + 10**((b.rank - a.rank)/400));
        let bEstimated = 1/(1 + 10**((a.rank - b.rank)/400));
        let ak = 0;
        let bk = 0;

        //calculate k value for a
        if (a.rank < 2100) {
            ak = 32;
        } else if (a.rank > 2100 && a.rank < 2400) {
            ak = 24;
        } else {
            ak = 16
        }
        //calculate k value for b
        if (b.rank < 2100) {
            bk = 32;
        } else if (b.rank > 2100 && b.rank < 2400) {
            bk = 24;
        } else {
            bk = 16
        }

        //new ranking for a if b wins
        a.rank = (Math.round(a.rank + (ak * (0 - aEstimated))));
        //new ranking for b if b wins
        b.rank = (Math.round(b.rank + (bk * (1 - bEstimated))));

        console.log("2: ", a.name, a.rank, b.name, b.rank);

        //call the update function to update database
        update(a);
        update(b);
    }

    return (
        <>
            <h1> Who's more Likeable? Click to Choose</h1>
            <div>
                <img src={chosen?.[0].image} onClick={() => elo(chosen?.[0], chosen?.[1])}/>
                <p>{chosen?.[0].name}</p>
            </div>
            <div>
                <img src={chosen?.[1].image} onClick={() => elo2(chosen?.[0], chosen?.[1])}/>
                <p>{chosen?.[1].name}</p>
            </div>
        </>
    )
}

export default HomePage;

