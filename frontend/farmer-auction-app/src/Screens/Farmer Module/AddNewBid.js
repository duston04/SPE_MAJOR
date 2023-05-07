import React, { useState } from "react";
import classes from "./AddNewBid.module.css";

const AddNewBid = () => {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setItem("");
  };

  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category:", category);
    console.log("Item:", item);
    console.log("Amount:", amount);
    // You can add code here to submit the form data to your backend or do something else with it
  };

  return (
    <div className={classes.add_new_bid}>
      <h2>Add New Bid</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
        </select>

        {category === "fruit" && (
          <div>
            <label htmlFor="fruit">Fruit:</label>
            <select id="fruit" value={item} onChange={handleItemChange}>
              <option value="">Select a fruit</option>
              <option value="banana">Banana</option>
              <option value="grapes">Grapes</option>
              <option value="mango">Mango</option>
            </select>
          </div>
        )}

        {category === "vegetable" && (
          <div>
            <label htmlFor="vegetable">Vegetable:</label>
            <select id="vegetable" value={item} onChange={handleItemChange}>
              <option value="">Select a vegetable</option>
              <option value="potato">Potato</option>
              <option value="onion">Onion</option>
              <option value="tomato">Tomato</option>
            </select>
          </div>
        )}

        <label htmlFor="amount">Amount for 1 kg:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddNewBid;
