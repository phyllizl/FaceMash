import React, { useEffect, useState } from 'react';

const RankingList = () => {

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


    return (
        <>
            <h1>Favourite Politicians Based on Your Votes</h1>
            {everyone.map((ele) => {
                return(
                    <>
                        <img src={ele.image} />
                        <h1>{ele.name}</h1>
                    </>
                )
            })}
        </>
    )
}

export default RankingList;