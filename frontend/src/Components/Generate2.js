import React, { useState } from "react";
import { motion } from "framer-motion";

const getRandomNum = (max) => {
    return (Math.floor(Math.random() * max))
}

const variants = {
    // transition={bounceTransition}
    // animate={{y:["20%", "-20%"]}}
    clicked: {
        y:["5%", "-5%"],
    },
    notClicked: {y:['0%','0%']},
}  

const Generate2 = ({everyone, next}) => {

        const url = "https://polar-stream-40791.herokuapp.com/mps/";
        //const url = "http://localhost:8000/mps/";

        //generate random number
        let getRandom1 = getRandomNum(everyone.length);
        let getRandom2 = getRandomNum(everyone.length);
        while (getRandom1 === getRandom2) {
            getRandom2 = getRandomNum(everyone.length);
            console.log('while loop triggered')
        }

        const [random, setRandom] = useState(getRandom1);
        const [random2, setRandom2] = useState(getRandom2);
        const [isClicked, setIsClicked] = useState(false);
        
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
        setIsClicked(false);
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
        return response;
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

        //update -> put request
        update(a);
        update(b);
        //get 2 new random numbers
        setRandom(getRandom1);
        setRandom2(getRandom2);
    }

    //function to setState of Next, Random and Random2
    const nextFunction = () => {
        next();
        setRandom(getRandom1);
        setRandom2(getRandom2);
    }

    //Bounce
    const bounceTransition = {
        y: {
            duration: 0.1,
            yoyo: Infinity,
            ease: "easeOut"
        }
    }

    const call2 = (person1, person2) => {
        setIsClicked(!isClicked);
        setTimeout(() => {elo(person1, person2)}, 1000);
    }

    const call2Second = (person1, person2) => {
        setIsClicked(!isClicked);
        setTimeout(() => {elo2(person1, person2)}, 1000);
    }
        
        return(
            <>   
                <div className="container bigdiv"> 
                <div className="card">
                    <div className="card-image">
                    <motion.figure 
                        className="image-box"
                        animate={isClicked ? "clicked" : "notClicked"}
                        variants={variants}
                        transition={bounceTransition}
                        >
                            <img src={person1.image} alt={`${person1.name}`} onClick={() => call2(person1, person2)}/>
                        </motion.figure>
                    </div>
                    <div className="card-content">
                        <p className="title">{person1.name}</p>
                    </div>
                    <div className="content is-6 snippet">
                        {person1.snippet}
                    </div>
                    <div className="content is-size-7 is-italic wiki">
                        {person1.wiki}
                    </div>
                    <a href={person1.url} target="_blank" className="title is-5 mt-4">Check Me Out!</a>
                </div>

                <div className="card">
                    <div className="card-image">
                    <motion.figure 
                        className="image-box"
                        animate={isClicked ? "clicked" : "notClicked"}
                        variants={variants}
                        transition={bounceTransition}
                        >
                            <img src={person2.image} alt={`${person2.name}`} onClick={() => call2Second(person1, person2)}/>
                        </motion.figure>
                    </div>
                    <div className="card-content">
                        <p className="title">{person2.name}</p>
                    </div>
                    <div className="content is-6">
                        {person2.snippet}
                    </div>
                    <div className="content is-size-7 is-italic wiki">
                        {person2.wiki}
                    </div>

                    
                    <div className="modal" id="modal2">
                        <div className="modal-background"></div>
                        <div className="modal-content">
                            <div className="box">
                                <iframe src={person1.url} title="Check Me Out">
                                </iframe>
                            </div> 
                        </div>
                        <button className="modal-close is-large" onClick={()=> document.getElementById("modal2").classList.toggle("is-active")}></button>
                    </div>
                    <button onClick={()=> document.getElementById("modal2").classList.toggle("is-active")}>Check Me Out</button>
                    <a href={person2.url} target="_blank" className="title is-5 mt-4"></a>
                </div>
                </div>
                


                        {/* image */}
                        {/* <motion.figure 
                        className="image-box column is-half"
                        animate={isClicked ? "clicked" : "notClicked"}
                        variants={variants}
                        transition={bounceTransition}
                        >
                            <img src={person1.image} alt={`${person1.name}`} onClick={() => call2(person1, person2)}/>
                        </motion.figure>
                        <div className="image-box column is-half">
                            <img 
                            src={person2.image} 
                            alt={`${person2.name}`} 
                            onClick={() => elo2(person1, person2)}
                            
                            />
                        </div>

                        {/* name */}
                        {/* <div className="title column is-half">
                            {person1.name}
                        </div>
                        <div className="title column is-half">
                            {person2.name}
                        </div> */}

                        {/* snippet */}
                        {/* <div className=" is-6 column is-half">
                            {person1.snippet}   
                        </div>
                        <div className=" is-6 column is-half">
                            {person2.snippet}   
                        </div> */}

                        {/* wiki */}
                        {/* <div className=" is-size-7 is-italic column is-half">
                            {person1.wiki}   
                        </div>
                        <div className="is-size-7 is-italic column is-half">
                            {person2.wiki}    */}
                        {/* </div> */}
                        
                        {/* href */}
                        {/* // <div className="column is-half">
                        //     <a href={person1.url} target="_blank" className="title is-5 mt-4">Check Me Out!</a>
                        // </div>
                        // <div className="column is-half">
                        //     <a href={person2.url} target="_blank" className="title is-5 mt-4">Check Me Out!</a>
                        // </div> */}
          

                    <button className="button" onClick={nextFunction}>Next</button>
            
            </>
           
     
        )
        
}

export default Generate2;