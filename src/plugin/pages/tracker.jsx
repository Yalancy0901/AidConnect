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

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
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

          const status = c.status ? c.status.toLowerCase() : "unassigned";

          if (!updatedBoard[status]) {
            updatedBoard["unassigned"].items.push(c);
            return;
          }

          updatedBoard[status].items.push({
            id: c._id,
            title: c.description,
            village: c.location,
            description: c.description,
            deadline: new Date(c.createdAt)
              .toISOString()
              .split("T")[0],
          });

        });

        setBoard(updatedBoard);

      } catch (error) {
        console.error(error);
      }
    };

    fetchComplaints();

  }, []);

  const handleDragEnd = async (result) => {

  if (!result.destination) return;

  const { source, destination } = result;

  const sourceCol = board[source.droppableId];
  const destCol = board[destination.droppableId];

  const sourceItems = Array.from(sourceCol.items);
  const [moved] = sourceItems.splice(source.index, 1);

  moved.status = destination.droppableId;

  if (source.droppableId === destination.droppableId) {

    sourceItems.splice(destination.index, 0, moved);

    setBoard({
      ...board,
      [source.droppableId]: { ...sourceCol, items: sourceItems },
    });

  } else {

    const destItems = Array.from(destCol.items);
    destItems.splice(destination.index, 0, moved);

    setBoard({
      ...board,
      [source.droppableId]: { ...sourceCol, items: sourceItems },
      [destination.droppableId]: { ...destCol, items: destItems },
    });

  }

  // UPDATE DATABASE
  try {

    await axios.put(
      `http://localhost:5000/api/requests/${moved.id}/status`,
      { status: destination.droppableId }
    );

  } catch (error) {

    console.error("Status update failed", error);

  }

};

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-green-400">
          Complaint Tracker
        </h1>
      </div>

      {/* BOARD */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">

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
                          className="bg-black rounded-lg p-4 mb-4 border border-zinc-800 cursor-pointer hover:border-green-400 transition"
                        >

                          <h3 className="font-semibold text-sm truncate">
                            {item.title}
                          </h3>

                          {item.village && (
                            <p className="text-xs text-gray-400 mt-1 truncate">
                              📍 {item.village}
                            </p>
                          )}

                          {item.deadline && (
                            <p className="text-xs text-gray-500 mt-1">
                              ⏳ {item.deadline}
                            </p>
                          )}

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

      {/* VIEW MODAL */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-zinc-900 rounded-xl w-full max-w-lg p-6 relative">

            <button
              onClick={() => setViewItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-green-400 mb-2">
              {viewItem.title}
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              📍 {viewItem.village}
            </p>

            <p className="text-gray-300">
              {viewItem.description}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}