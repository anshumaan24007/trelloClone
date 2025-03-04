import React, { useState } from "react";
import Modal from "react-modal";
import { X, Trash2, Save, Plus } from "lucide-react";

const CardModal = ({
  isOpen,
  onClose,
  mode,
  listId,
  card,
  lists,
  setLists,
  onDelete,
}) => {
  const isEditing = mode === "edit";
  const [title, setTitle] = useState(card?.title || "");
  const [description, setDescription] = useState(card?.description || "");
  const [dueDate, setDueDate] = useState(card?.dueDate || "");

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: isEditing
            ? list.cards.map((c) =>
                c.id === card.id ? { ...c, title, description, dueDate } : c
              )
            : [
                ...list.cards,
                { id: Date.now().toString(), title, description, dueDate },
              ],
        };
      }
      return list;
    });

    setLists(updatedLists);
    onClose();
  };

  console.log("Deleting card:", card);
  console.log("onDelete function:", onDelete);

  const handleDelete = () => {
    if (card) {
      onDelete(listId, card.id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-lg shadow-lg p-6 w-96"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {isEditing ? "Edit Card" : "Add New Card"}
        </h2>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title:
        </label>
        <input
          type="text"
          className="w-full border rounded p-2 mt-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mt-3">
          Description:
        </label>
        <textarea
          className="w-full border rounded p-2 mt-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mt-3">
          Due Date:
        </label>
        <input
          type="date"
          className="w-full border rounded p-2 mt-1"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="flex gap-2 justify-between">
          <button
            className="w-fit flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
            onClick={handleSave}
          >
            {isEditing ? <Save size={16} /> : <Plus size={16} />}
            {isEditing ? "Save Changes" : "Add Card"}
          </button>
          {isEditing ? (
            <button
              className="w-fit flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded mt-4 hover:bg-red-700"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
              Delete Card
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;
