import { mockData } from "./mockData";

export const loadBoard = () => {
  try {
    const data = localStorage.getItem("board");

    if (!data) {
      console.log("First-time load: Using mock data");
      saveBoard(mockData); // Save mock data to localStorage
      return mockData;
    }

    const parsedData = JSON.parse(data);

    // Ensure all cards have a `completed` property
    parsedData.lists = parsedData.lists.map((list) => ({
      ...list,
      cards: list.cards.map((card) => ({
        ...card,
        completed: card.completed || false, // Default to false if missing
      })),
    }));

    console.log("Loaded Board:", parsedData);
    return parsedData;
  } catch (error) {
    console.error("Error loading board from localStorage", error);
    return { lists: [] };
  }
};

export const saveBoard = (board) => {
  try {
    console.log("Saving Board:", board);
    localStorage.setItem("board", JSON.stringify(board));
  } catch (error) {
    console.error("Error saving board to localStorage", error);
  }
};

export const resetBoard = () => {
  try {
    localStorage.removeItem("board");
    console.log("Board reset in localStorage");
  } catch (error) {
    console.error("Error resetting board in localStorage", error);
  }
  return { lists: [] };
};
