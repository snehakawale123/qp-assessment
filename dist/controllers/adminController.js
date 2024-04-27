import { connection } from "../dbconfig.js";
export const addGroceryItem = (req, res) => {
    //add a new grocery item to the database
    const { itemName, inventory, price } = req.body;
    // Check if itemName is missing
    if (!itemName) {
        res.status(400).json({ error: "itemName is missing in the request body" });
        return;
    }
    // Check if inventory is missing
    if (!inventory) {
        res.status(400).json({ error: "inventory is missing in the request body" });
        return;
    }
    // Check if price is missing
    if (!price) {
        res.status(400).json({ error: "price is missing in the request body" });
        return;
    }
    const query = "INSERT INTO grocery_items (item_name, inventory,price) VALUES (?, ?,?)";
    const values = [itemName, inventory, price];
    connection.query(query, values, (error, results) => {
        if (error) {
            // console.error("Error adding grocery item:", error);
            res.status(500).json({ error: "Failed to add grocery item" });
            return;
        }
        if (results) {
            // console.log("Grocery item added successfully", results);
            res.status(201).json({ message: "Grocery item added successfully" });
        }
    });
};
export const getGroceryItems = (req, res) => {
    //retrieve existing grocery items from the database
    const query = "SELECT * FROM grocery_items";
    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error retrieving grocery items:", error);
            res.status(500).json({ error: "Failed to retrieve grocery items" });
            return;
        }
        if (results.length) {
            res.status(200).json(results);
        }
        else {
            res.status(201).json({ message: "No item Found" });
        }
    });
};
export const removeGroceryItem = (req, res) => {
    // remove a grocery item from the database
    const itemId = req.params.itemId;
    const query = "DELETE FROM grocery_items WHERE itemid = ?";
    connection.query(query, [itemId], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Failed to remove grocery item" });
            return;
        }
        if (results) {
            res.status(200).json({ message: "Grocery item removed successfully" });
        }
    });
};
export const updateGroceryItem = (req, res) => {
    //update details of an existing grocery item in the database
    const itemId = req.params.itemId;
    const { itemName, inventory, price } = req.body;
    // Check if itemName is missing
    if (!itemName) {
        res.status(400).json({ error: "itemName is missing in the request body" });
        return;
    }
    // Check if inventory is missing
    if (!inventory) {
        res.status(400).json({ error: "inventory is missing in the request body" });
        return;
    }
    // Check if price is missing
    if (!price) {
        res.status(400).json({ error: "price is missing in the request body" });
        return;
    }
    const query = "UPDATE grocery_items SET item_name = ?, inventory = ?, price = ? WHERE itemid = ?";
    const values = [itemName, inventory, price, itemId];
    connection.query(query, values, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Failed to update grocery item" });
            return;
        }
        if (results.affectedRows > 0) {
            res.status(200).json({ message: "Grocery item updated successfully" });
        }
        else {
            res.status(100).json({ message: "itemId not found" });
        }
    });
};
// Manage inventory  of grocery items in the database
export const manageInventory = (req, res) => {
    const itemId = req.params.itemId;
    const { inventory } = req.body;
    //Check if inventory is missing
    if (!inventory) {
        res.status(400).json({ error: "inventory is missing in the request body" });
        return;
    }
    //Check if price is missing
    if (!itemId) {
        res.status(400).json({ error: "price is missing " });
        return;
    }
    const query = "UPDATE grocery_items SET inventory = ? WHERE itemid = ?";
    const values = [inventory, itemId];
    connection.query(query, values, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Failed to manage inventory" });
            return;
        }
        if (results.affectedRows > 0) {
            res.status(200).json({ message: "Inventory managed successfully" });
        }
        else {
            res.status(100).json({ message: "itemId not found" });
        }
    });
};
//# sourceMappingURL=adminController.js.map