import "./board.css"
import Column from "../column/column";
import Navbar from "../navbar/navbar";
import { useEffect, useState } from "react";
import { useDataApi } from "../../context/ApiContext";

const Board = () => {

    const statusTypes = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
    const priorityTypes = [0, 1, 2, 3, 4];

    const { userData, ticketData, groupBy, updateGroupFilter, OrderBy, updateOrderFilter } = useDataApi();
    console.log(OrderBy);

    useEffect(() => {

    }, [groupBy])


    console.log(groupBy);
    return (
        <>
            {
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
                groupBy == "priority" && <div className="board">
                    {
                        userData && ticketData &&
                        priorityTypes.map((item,index)=>{
                            return <Column key={index} id = {item} />
                        })
                    }
                </div>
            }
        </>
    )
};

export default Board;