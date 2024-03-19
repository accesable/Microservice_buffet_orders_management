import React, { useState,useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import io from 'socket.io-client';

export const CustomKanban = () => {
    const [orderdetails, setOrderDetails] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cards, setCards] = useState([]);
    useEffect(() => {
        const socket = io('http://localhost:8085');
        socket.on("connect", () => {
          console.log("Connected to server");
          socket.emit("join", "chief");
        });
        socket.on("add details", (receivedDetails) => {
          console.log("Received details:", receivedDetails);
        });
        socket.on("incomming orders", (orders) => {
          // Append the new order to the existing cards
          
          const transformedData = orders.map(item => ({
            title: `${item.itemName} - Quantity: ${item.quantity} - Table: ${item.table}`,
            id: item._id,
            column: item.status
        }));
        console.log('New Order:',transformedData);
        setCards((prevCards) => [...prevCards, ...transformedData]);
      });


        const fetchOrders = async () => {
          setIsLoading(true);
          setError(null); // Reset previous errors
          try {
            const response = await fetch('/api/orders/orderdetails');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Transforming the data
            const transformedData = data.map(item => ({
                title: `${item.itemName} - Quantity: ${item.quantity} - Table: ${item.table}`,
                id: item._id,
                column: item.status
            }));

            // Update state with transformed data
            setCards(transformedData);
            setOrderDetails(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setIsLoading(false);
          }
        };
    
         fetchOrders();
         return () => {
          // Clean up the socket connection when the component unmounts
          socket.disconnect();
      };
      }, []);
        if (isloading) {
            return <div><LoadingSpinner/></div>;
        }
        if (error) {
            return <div>Error: {error}</div>;
        }
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board cards={cards} setCards={setCards} />
    </div>
  );
};

const Board = ({cards,setCards}) => {
  const handleStatusChange = async (detailId,newStatus) => {
    try {
      const response = await fetch(`/api/orders/detail-status/${detailId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle successful response
      const data = await response.json();
      console.log('Status updated:', data);
      // Optionally, refresh the data or update the UI to reflect the change

    } catch (error) {
      console.error('Error updating status:', error);
      // Optionally, handle the error, e.g., show an error message to the user
    }finally{
        console.log('API Called');
    }
  };

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Pending"
        column="pending"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
        onUpdateCardStatus={handleStatusChange}
      />
        <Column
        title="Confirmed"
        column="confirmed"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
        onUpdateCardStatus={handleStatusChange}
      />
      <Column
        title="Is Preparing"
        column="prepare"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
        onUpdateCardStatus={handleStatusChange}
      />
      <Column
        title="Ready To Served"
        column="in_serve"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
        onUpdateCardStatus={handleStatusChange}
      />
        <Column
        title="Declined"
        column="declined"
        headingColor="text-red-300"
        cards={cards}
        setCards={setCards}
        onUpdateCardStatus={handleStatusChange}
      />
      {/* <BurnBarrel setCards={setCards} /> */}
    </div>
  );
};

const Column = ({ title, headingColor, cards, column, setCards,onUpdateCardStatus }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    
    const cardId = e.dataTransfer.getData("cardId");
    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    onUpdateCardStatus(cardId, column);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className=" flex-1">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        {/* <AddCard column={column} setCards={setCards} /> */}
      </div>
    </div>
  );
};

const Card = ({ title, id, column, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

const DEFAULT_CARDS = [
  // BACKLOG
  { title: "Fried Pork - Quantity : 2 - Table : 3", id: "1", column: "backlog" },
  { title: "Raw Dipped Beef - Quantity : 2", id: "2", column: "pending" },
  { title: "Fried Pork - Quantity : 2", id: "3", column: "pending" },
  { title: "Raw Dipped Beef - Quantity :1", id: "4", column: "backlog" },
  // TODO
  {
    title: "Mala Hotpot - Quantity : 1",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];