// Importing necessary files and libraries
import "./column.css"
import Card from "../card/card";
import { useEffect, useState } from "react";
import noPreority from '../../assets/option.png';
import urgent from '../../assets/urgent.png';
import high from '../../assets/signal.png';
import medium from '../../assets/signalmid.png';
import low from '../../assets/low-connection.png';
import backlog from '../../assets/backlog.png';
import todo from '../../assets/todo.png';
import process from '../../assets/process.png';
import done from '../../assets/done.png';
import cancel from '../../assets/cancel.png';
import { useDataApi } from "../../context/ApiContext";

// Defining the Column component
const Column = ({id}) => {
    
    // Defining priority types and icons
    const priorityTypes = {
        0:'No Priority',
        1:'Urgent',
        2:'High',
        3:'Medium',
        4:'Low'
    }
    const priorityIcons = {
        0:noPreority,
        1:urgent,
        2:high,
        3:medium,
        4:low
    }
    // Defining status icons
    const statisIcons = {
        'Backlog':backlog,
        'Todo':todo,
        'In progress':process,
        'Done':done,
        'Canceled':cancel
    }
    
    // Defining state variables
    const [tickets, setTickets] = useState()
    const [title, setTitle] = useState(id);

    // Getting data from the API context
    const { userData, ticketData, groupBy, updateGroupFilter, OrderBy, updateOrderFilter } = useDataApi();

    // Filtering tickets by user
    const filterTicketsByUser= async ()=>{
        const data =await ticketData.filter(x=>{
            if(x.userId === id)
                return x;
        })
        const userDetail = await userData.find((x)=> x.id == id)
        setTitle(userDetail.name)
        setTickets(data);
    }

    // Filtering tickets by status
    const filterTicketsByStatus= ()=>{
        const data = ticketData.filter(x=>{
            if(x.status === id)
                return x;
        })
        setTickets(data);
    }

    // Filtering tickets by priority
    const filterTicketsByPriority= ()=>{
        const data = ticketData.filter(x=>{
            if(x.priority === id)
                return x;
        })
        setTitle(priorityTypes[id])
        setTickets(data);
    }

    // Updating the tickets based on the order filter
    useEffect(() => {
        if(groupBy == 'user')
            filterTicketsByUser();
        else if(groupBy == 'status')
            filterTicketsByStatus();
        else if(groupBy == 'priority')
            filterTicketsByPriority();
        console.log(OrderBy)
        if(OrderBy == 'priority' && tickets)
            setTickets(tickets.sort((a,b)=>a.priority-b.priority));
        if(OrderBy == 'title' && tickets)
            setTickets(tickets.sort((a, b) => a.title.localeCompare(b.title)))

    }, [OrderBy])
    
    // Rendering the component
    return (
        <div className="column">
            <div className="column-title">
                <div className="title-left">
                    {groupBy=='user'&& <div className="title-icon"><img src="https://images.pexels.com/photos/2825578/pexels-photo-2825578.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" /></div>}
                    {groupBy=='status' && <div className="title-icon"><img src={statisIcons[title]} /></div>}
                    {groupBy=='priority' && <div className="title-icon"><img src={priorityIcons[id]} /></div>}
                    <h3>{title}</h3>
                    <p>{tickets?tickets.length:0}</p>
                </div>
                <div className="title-right">
                    <div>+</div>
                    <div>...</div>
                </div>
            </div>
            <div className="cards">
                {
                    tickets&& userData &&
                    tickets.map((item,index)=>{
                        return <Card key = {index} ticket = {item} />
                    })
                }
            </div>
        </div>
    );
};

// Exporting the component
export default Column;