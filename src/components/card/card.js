import { useEffect, useState } from "react";
import "./card.css"
import noPreority from '../../assets/option.png';
import urgent from '../../assets/low-connection.png';
import high from '../../assets/signal.png';
import medium from '../../assets/signalmid.png';
import low from '../../assets/low-connection.png';
import backlog from '../../assets/backlog.png';
import todo from '../../assets/todo.png';
import process from '../../assets/process.png';
import done from '../../assets/done.png';
import cancel from '../../assets/cancel.png';
import { useDataApi } from "../../context/ApiContext";

const Card = ({ ticket }) => {

    // Get the user data from the context
    const { userData, ticketData, groupBy, updateGroupFilter, OrderBy, updateOrderFilter } = useDataApi();

    // Define the status icons
    const statusIcons = {
        0: noPreority,
        1: urgent,
        2: high,
        3: medium,
        4: low
    }

    // Define the status icons
    const statisIcons = {
        'Backlog':backlog,
        'Todo':todo,
        'In progress':process,
        'Done':done,
        'Canceled':cancel
    }

    // Define the user state
    const [user, setUser] = useState(null)

    // Get the user data
    const getUser = () => {
        const data = userData.find((x) => x.id === ticket.userId);
        setUser(data);
    }

    // Call the getUser function when the component mounts
    useEffect(() => {
        if (groupBy != 'user') {
            getUser();
        }
    }, [])

    // Render the card
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">{ticket.id}</h5>
                <div className={groupBy == 'user' ? 'hide' : 'show'}>
                    <img className="card-img" src="https://images.pexels.com/photos/2825578/pexels-photo-2825578.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                    {user && <div className={user.available ? 'status-dot-avilable' : 'status-dot-not-avilable'}></div>}
                </div>

            </div>
            <div className="card-title">
                {groupBy != 'status' && <div className="card-title-logo"><img src={statisIcons[ticket.status]}/></div>}
                <h5 className="card-title-text">{ticket.title}</h5>
            </div>


            <div className="card-body">
                <div className={groupBy == 'priority' ? 'hide' : 'show'}>
                    <div className="card-text1"><img className="card-text-img" src={statusIcons[ticket.priority]} /></div>
                </div>

                {
                    ticket.tag && <div className="card-text">{ticket.tag[0]}</div>
                }
            </div>
        </div>
    );
};

export default Card;