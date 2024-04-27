import { Request, Response } from "express";
import { connection } from "../dbconfig.js";

export const viewGroceryItems = (req: Request, res: Response) => {
  try {
    //retrieve and send the list of available grocery items to the user
    const query = "SELECT * FROM grocery_items";
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ error: "Failed to retrieve grocery items" });
        return;
      }
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(100).json("NO record found");
      }
    });
  } catch (error) {
    res.status(100).json(error);
  }
};

export const bookItems = async (req: Request, res: Response) => {
  const { userId, items } = req.body;

  // Validate request payload
  if (!userId || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "Invalid request payload." });
    return;
  }

  try {
    const insertPromises = items.map(async (item: any) => {
      const { itemId, quantity } = item;
      connection.query(
        "SELECT itemId FROM grocery_items WHERE itemId = ?",
        [itemId],
        (error, results) => {
          if (error) {
            res.status(500).json({ error: "Failed to retrieve grocery items" });
            return;
          }
          if (results.length > 0) {
            //Insert booked item into the booked_items table with the user ID
            connection.query(
              "INSERT INTO booked_items (userId, itemId, quantity) VALUES (?, ?, ?)",
              [userId, itemId, quantity],
              (error, results) => {
                if (error) {
                  res
                    .status(500)
                    .json({ error: "Failed to retrieve grocery items" });
                  return;
                }

                if (results.affectedRows > 0) {
                  //Update inventory level in the grocery_items table
                  connection.query(
                    "UPDATE grocery_items SET inventory = inventory - ? WHERE itemId = ?",
                    [quantity, itemId],
                    (error, results) => {
                      if (error) {
                        res
                          .status(500)
                          .json({ error: "Failed to retrieve grocery items" });
                        return;
                      } else {
                        res.status(200).json({
                          message: "Grocery items booked successfully",
                        });
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.status(100).json("NO record found");
          }
        }
      );
    });

    // Wait for all insert and update operations to complete
    await Promise.all(insertPromises);
  } catch (error) {
    console.error("Error booking grocery items:", error);
    res.status(500).json({ error: "Failed to book grocery items" });
  }
};
