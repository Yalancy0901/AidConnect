import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const columns = {
  unassigned: { title: "Unassigned", items: [] },
  todo: { title: "To Do", items: [] },
  inProgress: { title: "In Progress", items: [] },
  blocked: { title: "Blocked", items: [] },
  resolved: { title: "Resolved", items: [] },
};

export default function Tracker() {

  const [board, setBoard] = useState(columns);
  const [viewItem, setViewItem] = useState(null);


  // FETCH COMPLAINTS
  useEffect(() => {

    const fetchComplaints = async () => {

      try {

        const res = await axios.get("http://localhost:5000/api/requests");
        const complaints = res.data;

        const updatedBoard = {
          unassigned: { title: "Unassigned", items: [] },
          todo: { title: "To Do", items: [] },
          inProgress: { title: "In Progress", items: [] },
          blocked: { title: "Blocked", items: [] },
          resolved: { title: "Resolved", items: [] },
        };

        complaints.forEach((c) => {

          const status = c.status || "unassigned";

          updatedBoard[status].items.push({
            id: c._id,
            title: c.description,
            village: c.location,
            description: c.description,
            deadline: new Date(c.createdAt).toISOString().split("T")[0],
          });

        });

        setBoard(updatedBoard);

      } catch (error) {
        console.error(error);
      }

    };

    fetchComplaints();

  }, []);



  // DRAG DROP
  const handleDragEnd = async (result) => {

    if (!result.destination) return;

    const { source, destination } = result;

    const sourceCol = board[source.droppableId];
    const destCol = board[destination.droppableId];

    const sourceItems = Array.from(sourceCol.items);
    const [moved] = sourceItems.splice(source.index, 1);

    moved.status = destination.droppableId;

    const destItems = Array.from(destCol.items);
    destItems.splice(destination.index, 0, moved);

    setBoard({
      ...board,
      [source.droppableId]: { ...sourceCol, items: sourceItems },
      [destination.droppableId]: { ...destCol, items: destItems },
    });

    try {

      await axios.put(
        `http://localhost:5000/api/requests/${moved.id}/status`,
        { status: destination.droppableId }
      );

    } catch (error) {
      console.error("Status update failed", error);
    }

  };


  // DELETE
  const handleDelete = async (id) => {

    try {

      await axios.delete(`http://localhost:5000/api/requests/${id}`);

      const newBoard = { ...board };

      Object.keys(newBoard).forEach(col => {
        newBoard[col].items = newBoard[col].items.filter(
          item => item.id !== id
        );
      });

      setBoard(newBoard);
      setViewItem(null);

    } catch (error) {
      console.error("Delete failed", error);
    }

  };


  return (

    <div className="p-6 md:p-10 min-h-screen bg-black text-white">

      <h1 className="text-3xl font-bold text-green-400 mb-8">
        Complaint Tracker
      </h1>

      <DragDropContext onDragEnd={handleDragEnd}>

        <div className="flex gap-6 overflow-x-auto">

          {Object.entries(board).map(([key, col]) => (

            <Droppable key={key} droppableId={key}>

              {(provided) => (

                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-zinc-900 rounded-xl p-4 min-h-[500px] min-w-[260px]"
                >

                  <h2 className="text-lg font-semibold mb-4">
                    {col.title}
                  </h2>

                  {col.items.map((item, index) => (

                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >

                      {(provided) => (

                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => setViewItem(item)}
                          className="bg-black rounded-lg p-4 mb-4 border border-zinc-800 cursor-pointer"
                        >

                          <h3 className="font-semibold text-sm">
                            {item.title}
                          </h3>

                          <p className="text-xs text-gray-400 mt-1">
                            📍 {item.village}
                          </p>

                        </div>

                      )}

                    </Draggable>

                  ))}

                  {provided.placeholder}

                </div>

              )}

            </Droppable>

          ))}

        </div>

      </DragDropContext>



      {/* MODAL */}
      {viewItem && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-zinc-900 rounded-xl w-full max-w-lg p-6">

            <h2 className="text-2xl font-bold text-green-400 mb-2">
              {viewItem.title}
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              📍 {viewItem.village}
            </p>

            <p className="text-gray-300">
              {viewItem.description}
            </p>

            <button
              onClick={() => handleDelete(viewItem.id)}
              className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Delete Complaint
            </button>

            <button
              onClick={() => setViewItem(null)}
              className="mt-4 ml-4 bg-gray-600 px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

}