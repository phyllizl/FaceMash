import React, { useEffect, useState } from "react";


const getRandomNum = (max) => {
    return (Math.floor(Math.random() * max))
}

const Generate2 = (prop) => {

        const url = "https://polar-stream-40791.herokuapp.com/mps/";

        let everyone = prop.props;

        //generate random number
        let getRandom1 = getRandomNum(everyone.length);
        let getRandom2 = getRandomNum(everyone.length);
        while (getRandom1 === getRandom2) {
            getRandom2 = getRandomNum(everyone.length);
            console.log('while loop triggered')
        }

        const [random, setRandom] = useState(getRandom1);
        const [random2, setRandom2] = useState(getRandom2);
        
        //get your random people
        let person1 = everyone[random];
        let person2 = everyone[random2];

        //Call the elo function on onClick -> (1) calculate new rank (2) call update function (put request) to update the rank in database
        //elo rating function -> If user chooses a
        const elo = (a, b) => {
        //console.log("1: original rankings: ", a.name, a.rank, b.name, b.rank)
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

        //get new random numbers
        getRandom1 = getRandomNum(everyone.length);
        getRandom2 = getRandomNum(everyone.length);
        while (getRandom1 === getRandom2) {
            getRandom2 = getRandomNum(everyone.length);
            console.log('while loop triggered')
        }

        //call the update function to update database
        update(a);
        update(b);
        setRandom(getRandom1);
        setRandom2(getRandom2);
    }

    //Function to edit mp ranking on selection
    const update = async (person) => {
        const response = await fetch(url + person.id + "/", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({rank: person.rank}),
        });
    }

    //We are going to try and hardcode this first. So this function will handle a situation when b is chosen. 
    //elo rating function -> If user chooses a
    const elo2 = (a, b) => {
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

        //get new random numbers
        getRandom1 = getRandomNum(everyone.length);
        getRandom2 = getRandomNum(everyone.length);
        while (getRandom1 === getRandom2) {
            getRandom2 = getRandomNum(everyone.length);
            console.log('while loop triggered')
        }

        //call the update function to update database
        update(a);
        update(b);
        setRandom(getRandom1);
        setRandom2(getRandom2);
    }
        
        return(
            <>
                    <div className="column"> 
                        <div className="image-box">
                            <img src={person1.image} alt={`${person1.name}`} onClick={() => elo(person1, person2)}/>
                        </div>
                        <p className="title is-4 mt-4">{person1.name}</p>
                        <a href={person1.url} target="_blank" className="title is-5 mt-4">Check Me Out!</a>
                    </div>

                    <h1 className="title is-3">OR</h1>

                    <div className="column">
                        <div className="image-box">
                            <img src={person2.image} alt={`${person2.name}`} onClick={() => elo2(person1, person2)}/>
                        </div>
                        <p className="title is-4 mt-4">{person2.name}</p>
                        <a href={person2.url} target="_blank" className="title is-5 mt-4">Check Me Out!</a>
                    </div> 
            </>
        )
        
}

export default Generate2;