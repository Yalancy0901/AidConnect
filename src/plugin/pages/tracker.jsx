import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const columns = {
 unassigned: { title: "Unassigned", items: [] },
  todo: { title: "To Do", items: [] },
  inProgress: { title: "In Progress", items: [] },
  blocked: { title: "Blocked", items: [] },
  resolved: { title: "Resolved", items: [] },
};
function IssueForm({ initialData, onClose, onSave }) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      village: "",
      description: "",
      deadline: "",
      image: null,
    }
  );

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: URL.createObjectURL(file),
      });
    }
  };


  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-green-400">
          {initialData ? "Edit Issue" : "Create Issue"}
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Issue Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 rounded bg-black border border-zinc-700"
          />

          <input
            placeholder="Village Name"
            value={form.village}
            onChange={(e) => setForm({ ...form, village: e.target.value })}
            className="w-full p-3 rounded bg-black border border-zinc-700"
          />

          <textarea
            placeholder="Description / Supporting details"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full p-3 rounded bg-black border border-zinc-700"
          />

          <input
            type="date"
            value={form.deadline}
            onChange={(e) =>
              setForm({ ...form, deadline: e.target.value })
            }
            className="w-full p-3 rounded bg-black border border-zinc-700 text-white [color-scheme:dark]"
          />

          <div>
  <input
    type="file"
    id="imageUpload"
    accept="image/*"
    onChange={handleImage}
    className="hidden"
  />

  <label
    htmlFor="imageUpload"
    className="inline-flex items-center gap-2 px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-sm"
  >
    📤 Upload Image
  </label>

  {form.image && (
    <p className="text-xs text-green-400 mt-2">
      Image selected ✔
    </p>
  )}
</div>


          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-zinc-800 text-black"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(form)}
              className="px-4 py-2 rounded bg-green-400 text-black font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



export default function Tracker() {
  const [board, setBoard] = useState(columns);

useEffect(() => {
  const fetchComplaints = async () => {
    const res = await axios.get("http://localhost:5000/api/requests");

    const complaints = res.data;

    const updatedBoard = { ...columns };

    complaints.forEach((c) => {
      updatedBoard[c.status].items.push({
        id: c._id,
        title: c.description,
        village: c.location,
        deadline: new Date(c.createdAt).toISOString().split("T")[0],
      });
    });

    setBoard(updatedBoard);
  };

  fetchComplaints();
}, []);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCol = board[source.droppableId];
    const destCol = board[destination.droppableId];

    const sourceItems = Array.from(sourceCol.items);
    const [moved] = sourceItems.splice(source.index, 1);

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
  };

  const handleSave = (data) => {
    if (editingItem) {
      const updated = { ...editingItem, ...data };
      const newBoard = { ...board };

      Object.keys(newBoard).forEach((col) => {
        newBoard[col].items = newBoard[col].items.map((i) =>
          i.id === updated.id ? updated : i
        );
      });

      setBoard(newBoard);
    } else {
      setBoard({
        ...board,
        unassigned: {
          ...board.unassigned,
          items: [
            ...board.unassigned.items,
            { ...data, id: Date.now().toString() },
          ],
        },
      });
    }

    setShowForm(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    const newBoard = { ...board };
    Object.keys(newBoard).forEach((col) => {
      newBoard[col].items = newBoard[col].items.filter((i) => i.id !== id);
    });
    setBoard(newBoard);
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-green-400">
          Complaint Tracker
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-green-500"
        >
          + New Issue
        </button>
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
                  className="bg-zinc-900 rounded-xl p-4 min-h-[500px] min-w-[253px]"
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
  {/* TITLE */}
  <h3 className="font-semibold text-sm truncate">
    {item.title}
  </h3>

  {/* VILLAGE */}
  {item.village && (
    <p className="text-xs text-gray-400 mt-1 truncate">
      📍 {item.village}
    </p>
  )}

  {/* DATE */}
  {item.deadline && (
    <p className="text-xs text-gray-500 mt-1">
      ⏳ {item.deadline}
    </p>
  )}

  {/* ACTION BUTTONS */}
  <div className="flex gap-2 mt-3">
    <button
      onClick={(e) => {
        e.stopPropagation();
        setEditingItem(item);
        setShowForm(true);
      }}
      className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-green-400 hover:text-black flex items-center justify-center"
    >
      ✏️
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDelete(item.id);
      }}
      className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-red-500 flex items-center justify-center"
    >
      🗑️
    </button>
  </div>
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

      {/* MODAL FORM */}
      {showForm && (
        <IssueForm
          initialData={editingItem}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          onSave={handleSave}
        />
      )}
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

      <p className="text-gray-300 mb-4">
        {viewItem.description || "No additional details provided."}
      </p>

      {viewItem.image && (
        <img
          src={viewItem.image}
          alt=""
          className="rounded-lg mb-4 max-h-60 w-full object-cover"
        />
      )}

      {viewItem.deadline && (
        <p className="text-sm text-gray-400">
          ⏳ Deadline: {viewItem.deadline}
        </p>
      )}
    </div>
  </div>
)}

    </div>
  );
}
