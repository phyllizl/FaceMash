import React from 'react';

const RankingList = ({everyone, url}) => {
   
    
    return (
        <div className="section">
            <h1 className="title is-2">Favourite Politicians Based on Your Votes</h1>
            <div className="columns is-centered">
            <table className="table">
                <thead>
                    <th><abbr title="Position">Pos</abbr></th>
                    <th><abbr title="Name">Name</abbr></th>
                    <th><abbr title="Image">Picture</abbr></th>
                </thead>

                <tbody>
                    {everyone.length > 0 ? 
                    everyone.map((ele) => {
                        return(
                            <tr key={ele.id}>
                                <td></td>
                                <td><a href={ele.url} target="_blank">{ele.name}</a></td>
                                <td> <img src={ele.image} alt={`${ele.name}`} className="mb-6 image is-64x64 smallpicture" /></td>
                            </tr>
                        )
                    }) : null}
                </tbody>

            </table>
            </div>
        </div>
    )
}

export default RankingList;