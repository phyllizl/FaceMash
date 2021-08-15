import React, { useState } from "react";


const getRandomNum = (max) => {
    return (Math.floor(Math.random() * max))
}

const Generate2 = (prop) => {

        const url = "https://polar-stream-40791.herokuapp.com/mps/";

        let everyone = prop.props;
        //console.log(everyone)
        const [random, setRandom] = useState(getRandomNum(everyone.length));
        const [random2, setRandom2] = useState(getRandomNum(everyone.length));
        if (random2 === random) {
            console.log('if loop triggered');
            setRandom2(getRandomNum(everyone.length));
        }
        console.log(random, random2)

        let person1 = everyone[random];
        let person2 = everyone[random2];
        console.log("persons", person1, person2)

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

        //call the update function to update database
        update(a);
        update(b);
        setRandom(getRandomNum(everyone.length));
        setRandom2(getRandomNum(everyone.length));
        //console.log("2: ", a.name, a.rank, b.name, b.rank);
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
        //getEveryone();

    }

    //We are going to try and hardcode this first. So this function will handle a situation when b is chosen. 
    //elo rating function -> If user chooses a
    const elo2 = (a, b) => {
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

        //new ranking for a if b wins
        a.rank = (Math.round(a.rank + (ak * (0 - aEstimated))));
        //new ranking for b if b wins
        b.rank = (Math.round(b.rank + (bk * (1 - bEstimated))));

        //console.log("2: ", a.name, a.rank, b.name, b.rank);

        //call the update function to update database
        update(a);
        update(b);
        setRandom(getRandomNum(everyone.length));
        setRandom2(getRandomNum(everyone.length));
    }
        
        return(
            <>
                    <div className="column">
                        <img src={person1.image} alt="image" className="image" onClick={() => elo(person1, person2)}/> 
                        <p className="title is-4 mt-4">{person1.name}</p>
                        <a href={person1.url} target="_blank" className="title is-5 mt-4">Check Me Out!</a>
                    </div>

                    <h1 className="title is-3">OR</h1>

                    <div className="column">
                        <img src={person2.image} alt="image" className="image" onClick={() => elo2(person1, person2)}/>
                        <p className="title is-4 mt-4">{person2.name}</p>
                        <a href={person2.url} target="_blank" className="title is-5 mt-4">Check Me Out!</a>
                    </div> 
            </>
        )
        
}

export default Generate2;