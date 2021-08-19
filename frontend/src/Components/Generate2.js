import React, { useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import cheers from "./cheers.mp3";
import LinkPreview from '@ashwamegh/react-link-preview';
import '@ashwamegh/react-link-preview/dist/index.css';

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
        const [isClicked2, setIsClicked2] = useState(false);
        const [showDif, setShowDif] = useState(false);
        const [A, setA] = useState(0);
        const [B, setB] = useState(0);
        
        //get your random people
        let person1 = everyone[random];
        let person2 = everyone[random2];

        //Call the elo function on onClick -> (1) calculate new rank (2) call update function (put request) to update the rank in database
        //elo rating function -> If user chooses a
        const elo = (a, b) => {
        //console.log("1: original rankings: ", a.name, a.rank, b.name, b.rank)
        let originalA = a.rank;
        let originalB = b.rank;
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
        setShowDif(!showDif);
        // setRandom(getRandom1);
        // setRandom2(getRandom2);
        //setIsClicked(false);
        let newA = a.rank;
        let newB = b.rank;

        //create preview
        let differenceA = newA - originalA; 
        let differenceB = newB - originalB;
        setA(differenceA);
        setB(differenceB);
        console.log('differences', differenceA, differenceB)

        const delayFunction = () => {
            setRandom(getRandom1);
            setRandom2(getRandom2);
            setIsClicked(false);
            setShowDif(false);
        }

        setTimeout(() => delayFunction(), 1000);
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
        let originalA = a.rank;
        let originalB = b.rank;
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
        let newA = a.rank;
        let newB = b.rank;
        setShowDif(!showDif);

        //create preview
        let differenceA = newA - originalA; 
        let differenceB = newB - originalB;
        setA(differenceA);
        setB(differenceB);
        console.log('differences', differenceA, differenceB)

        const delayFunction = () => {
            setRandom(getRandom1);
            setRandom2(getRandom2);
            setIsClicked2(false);
            setShowDif(false);
        }

        setTimeout(() => delayFunction(), 1000);
    
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
        elo(person1, person2);
        play();
    }

    const call2Second = (person1, person2) => {
        setIsClicked2(!isClicked);
        elo2(person1, person2);
        play();
    }

    //Play Sound
    const [play, stop] = useSound(cheers);

        return (
          <>
            <div className="container bigdiv">
                <div className="columns is-multiline is-mobile">
                <div className="column is-half">
              {/* FIRST PERSON */}
              {showDif ? <div className="title" style={ (A>0) ? {color:"green"} : {color:"red"}}>
                  {A} <br></br> New Elo Rating: {person1.rank}</div> 
                  : null }
              <div className="card card-equal-height">
                <div className="card-image">
                  <motion.figure
                    className="image-box"
                    animate={isClicked ? "clicked" : "notClicked"}
                    variants={variants}
                    transition={bounceTransition}
                  >
                    <img
                      src={person1.image}
                      alt={`${person1.name}`}
                      onClick={() => call2(person1, person2)}
                    />
                  </motion.figure>
                </div>
                <div className="card-content">
                  <p className="title">{person1.name}</p>
                </div>
                <div className="content is-6 snippet">{person1.snippet}</div>
                <div className="content is-size-7 is-italic wiki">
                  {person1.wiki}
                </div>
                <footer className="card-footer">
                <div className="card-footer-item">
                  <a href={person1.url} target="_blank" className="button">Check Me Out!</a>
                  </div>
                </footer>
                </div>
                </div>
             

              {/* SECOND PERSON */}
                <div className="column is-half">
                {showDif ? <div className="title" style={ (B>0) ? {color:"green"} : {color:"red"}}>{B} <br></br> New Elo Rating: {person2.rank}</div>: null }
              <div className="card card-equal-height">
                <div className="card-image">
                  <motion.figure
                    className="image-box"
                    animate={isClicked2 ? "clicked" : "notClicked"}
                    variants={variants}
                    transition={bounceTransition}
                  >
                    <img
                      src={person2.image}
                      alt={`${person2.name}`}
                      onClick={() => call2Second(person1, person2)}
                    />
                  </motion.figure>
                </div>
                <div className="card-content">
                  <p className="title">{person2.name}</p>
                </div>
                <div className="content is-6">{person2.snippet}</div>
                <div className="content is-size-7 is-italic wiki">
                  {person2.wiki}
                </div>
                <footer className="card-footer">
                <div className="card-footer-item">
                  <a href={person2.url} target="_blank" className="button">Check Me Out!</a>
                  </div>
                </footer>
              </div>
              </div>
              </div>
         
            </div>

            <button className="skip button" onClick={nextFunction}>
              Let Me Skip!
            </button>
          </>
        );
        
}

export default Generate2;