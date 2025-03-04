import React from "react";
import { Droppable } from "react-beautiful-dnd";
import List from "./List";
import { ListPlus } from "lucide-react";

const Board = ({ lists, setLists }) => {
  const handleAddList = () => {
    const title = prompt("Enter list title:");
    if (title?.trim()) {
      setLists([...lists, { id: Date.now().toString(), title, cards: [] }]);
    }
  };

  const handleDeleteCard = (listId, cardId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) }
          : list
      )
    );
  };

  return (
    <div className="board-container relative w-full">
      <button
        onClick={handleAddList}
        className="add-list-button flex gap-2 items-center p-4 text-white"
      >
        <ListPlus size={24} />{" "}
        {lists.length > 0 ? "Add another list" : "Add a list"}
      </button>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="list-wrapper min-h-screen  overflow-x-auto p-4 pb-6"
            style={{ scrollbarGutter: "stable" }}
          >
            <div className="flex gap-4 mb-48">
              {lists.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                  lists={lists}
                  setLists={setLists}
                  onDeleteCard={handleDeleteCard}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Board;
