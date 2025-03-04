import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import CardModal from "./CardModal";
import { Clock, Circle, CircleCheck, AlignLeft } from "lucide-react";

const Card = ({
  card,
  listId,
  index,
  lists,
  setLists,
  onDelete,
  onToggleComplete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            className="bg-white p-3 rounded-xl shadow cursor-pointer hover:border-2 border-blue-600"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setIsModalOpen(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <h3 className="font-medium  flex items-center gap-1">
              {hovered || card.completed ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    onToggleComplete(listId, card.id);
                  }}
                  className="cursor-pointer"
                >
                  {card.completed ? (
                    <CircleCheck color="#ffffff" fill="#23a06b" size={16} />
                  ) : (
                    <Circle size={15} />
                  )}
                </span>
              ) : (
                ""
              )}
              {card.title}
            </h3>

            <span className="flex gap-2 items-center">
              {card.dueDate && (
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Clock size={12} />{" "}
                  {
                    (([_, m, d, y] = new Date(card.dueDate)
                      .toDateString()
                      .split(" ")),
                    `${+d} ${m} ${y}`)
                  }
                </p>
              )}
              {card.description ? <AlignLeft size={16} /> : ""}
            </span>
          </div>
        )}
      </Draggable>

      {isModalOpen && (
        <CardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode="edit"
          listId={listId}
          card={card}
          lists={lists}
          setLists={setLists}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default Card;
