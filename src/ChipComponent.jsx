import React, { useState, useEffect } from "react";
import "./Chip.css";

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([
    { name: "Marina Augustine", email: "m.augustine@example.com" },
    { name: "Nick Giannopoulos", email: "n.giannopoulos@example.com" },
    { name: "Narayana Garner", email: "n.garner@example.com" },
    { name: "Anita Gros", email: "a.gros@example.com" },
    { name: "Megan Smith", email: "m.smith@example.com" },
    // Add more items as needed
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isBackspacePressed, setIsBackspacePressed] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setItems(items.filter((i) => i !== item));
    setInputValue("");
  };

  const handleChipRemove = (removedItem) => {
    setSelectedItems(selectedItems.filter((item) => item !== removedItem));
    setItems([...items, removedItem]);
  };

  const handleBackspace = (e) => {
    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedItems.length > 0
    ) {
      if (isBackspacePressed) {
        const lastChip = selectedItems[selectedItems.length - 1];
        handleChipRemove(lastChip);
        setIsBackspacePressed(false);
      } else {
        setIsBackspacePressed(true);
        const timeoutId = setTimeout(() => {
          setIsBackspacePressed(false);
          clearTimeout(timeoutId);
        }, 500);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleBackspace);
    return () => {
      document.removeEventListener("keydown", handleBackspace);
    };
  }, [inputValue, selectedItems, isBackspacePressed]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignSelf: "center" }}
    >
      <h1>Pick Users</h1>
      <div
        style={{
          marginBottom: "10px",
          width: "50%",
          alignSelf: "center",
          marginRight: "40px",
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add new user..."
          style={{ padding: "8px", fontSize: "16px" }}
          className="inputBox"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "10px",
        }}
      >
        {selectedItems.map((item, index) => (
          <div
            key={item.email}
            className="chip"
            style={{
              marginLeft: "0px",
              padding: "8px",
              borderRadius: "20px",
              background:
                isBackspacePressed && selectedItems.length - 1 === index
                  ? "#FFD700"
                  : "#e0e0e0",
            }}
          >
            <img src="https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face.png"></img>
            {item.name}{" "}
            <span
              onClick={() => handleChipRemove(item)}
              style={{ cursor: "pointer" }}
            >
              &times;
            </span>
          </div>
        ))}
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((item) => (
            <li
              key={item.email}
              onClick={() => handleItemClick(item)}
              style={{
                border: "none",
                marginBottom: "20px",
                cursor: "pointer",
                padding: "8px",
                //borderBottom: "1px solid #ccc",
              }}
            >
              <div className="name">
                <img src="https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face.png"></img>
                <span style={{ marginRight: "10px" }}>{item.name}</span>
                <span>{item.email}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChipComponent;
