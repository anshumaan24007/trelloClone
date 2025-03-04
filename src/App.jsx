import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "./components/Board";
import "./styles.css";
import { RotateCcw } from "lucide-react";
import Modal from "react-modal";
import { mockData } from "./utils/mockData";

import "@fontsource/inter";
import "@fontsource/inter/700.css";

Modal.setAppElement("#root");

const App = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("trelloLists"));

    if (!storedLists || storedLists.length === 0) {
      setLists(mockData);
      localStorage.setItem("trelloLists", JSON.stringify(mockData));
    } else {
      setLists(storedLists);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("trelloLists", JSON.stringify(lists));
  }, [lists]);

  const handleResetBoard = () => setLists([]);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    setLists((prevLists) => {
      let newLists = [...prevLists];

      if (type === "list") {
        const [movedList] = newLists.splice(source.index, 1);
        newLists.splice(destination.index, 0, movedList);
      } else {
        const sourceList = newLists.find(
          (list) => list.id === source.droppableId
        );
        const destList = newLists.find(
          (list) => list.id === destination.droppableId
        );

        if (!sourceList || !destList) return newLists;

        const draggedCard = sourceList.cards.find(
          (card) => card.id === draggableId
        );

        if (!draggedCard) return newLists;

        sourceList.cards = sourceList.cards.filter(
          (card) => card.id !== draggableId
        );

        destList.cards.splice(destination.index, 0, draggedCard);
      }

      return newLists;
    });
  };

  return (
    <div className="min-h-screen p-4 font-inter">
      <header className="flex justify-between items-center p-4 text-white">
        <h1 className="text-xl font-base">Trello Clone</h1>
        <button
          onClick={handleResetBoard}
          className="reset-button flex gap-2 items-center"
        >
          <RotateCcw size={16} /> Reset Board
        </button>
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Board lists={lists} setLists={setLists} />
      </DragDropContext>
    </div>
  );
};

export default App;
