import "./board.css"
import Column from "../column/column";
import Navbar from "../navbar/navbar";
import { useEffect, useState } from "react";
import { useDataApi } from "../../context/ApiContext";

const Board = () => {

    // Define the different types of statuses and priorities
    const statusTypes = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
    const priorityTypes = [0, 1, 2, 3, 4];

    // Get the necessary data from the API context
    const { userData, ticketData, groupBy, updateGroupFilter, OrderBy, updateOrderFilter } = useDataApi();

    // Log the current order by filter
    console.log(OrderBy);

    useEffect(() => {
        // Do something when the groupBy filter changes
    }, [groupBy])

    // Log the current groupBy filter
    console.log(groupBy);

    return (
        <div className="board-main">
            {
                // If the groupBy filter is set to "user", display the board grouped by user
                groupBy == "user" && <div className="board">
                    {
                        userData &&
                        userData.map((item, index) => {
                            return <Column key={index} id={item.id} />
                        })
                    }
                </div>
            }
            {
                // If the groupBy filter is set to "status", display the board grouped by status
                groupBy == "status" && <div className="board">
                    {
                        userData && ticketData &&
                        statusTypes.map((item,index)=>{
                            return <Column key={index} id = {item} />
                        })
                    }
                </div>
            }
            {
                // If the groupBy filter is set to "priority", display the board grouped by priority
                groupBy == "priority" && <div className="board">
                    {
                        userData && ticketData &&
                        priorityTypes.map((item,index)=>{
                            return <Column key={index} id = {item} />
                        })
                    }
                </div>
            }
        </div>
    )
};

export default Board;