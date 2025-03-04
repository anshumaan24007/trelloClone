import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import CardModal from "./CardModal";
import { Plus, X } from "lucide-react";

const List = ({ list, index, lists, setLists, onDeleteCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleComplete = (listId, cardId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map((card) =>
                card.id === cardId
                  ? { ...card, completed: !card.completed }
                  : card
              ),
            }
          : list
      )
    );
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-[#f1f2f4] p-4 rounded-lg shadow-md min-w-[280px] max-w-[280px] flex-shrink-0 h-fit max-h-96  space-y-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">{list.title}</h2>
            <button
              onClick={() => setLists(lists.filter((l) => l.id !== list.id))}
            >
              <X className="w-5 h-5 text-gray-400 hover:text-red-700" />
            </button>
          </div>
          <Droppable droppableId={list.id} type="card">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2 max-h-60 overflow-auto"
              >
                {list.cards.map((card, cardIndex) => (
                  <Card
                    key={card.id}
                    card={card}
                    listId={list.id}
                    index={cardIndex}
                    lists={lists}
                    setLists={setLists}
                    onDelete={onDeleteCard}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            className={`${
              list.cards.length
                ? "flex items-center gap-1 py-2 rounded mt-4 hover:bg-[#d0d4dc] w-full px-2"
                : "w-full h-full items-center gap-1 flex rounded-xl py-5 justify-center border-2 border-[#44546f] border-dashed"
            } `}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus color="gray" size={16} /> Add a card
          </button>

          {isModalOpen && (
            <CardModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              mode="add"
              listId={list.id}
              lists={lists}
              setLists={setLists}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default List;
