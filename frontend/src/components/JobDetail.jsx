const React = require('react');
import { useState } from 'react';
function jobDetail(){
    const {job, setJob} = useState();
    function fetchJOb(){
        fetch('/api/jobs')
        .then((response) => response.json())
        .then((data) => setJob(data))
        .catch((error) => console.log(error));
    }
    function submitJob(){
        fetch('/api/jobs',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(/* Where the user input will go */)
        })
        .then((response) => response.json())
        .then((data) => setJob(data))
        .catch((error) => console.log(error));
    }
    return(
        <div>
            /* Job Info  card */
        </div>
    )
}

export default jobDetail;