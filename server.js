const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to your local MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Airtel@123', // Leave blank if you don't have a password in XAMPP/WAMP
    database: 'restaurant_db'
});
// Route to handle incoming orders and save to MySQL
app.post('/api/orders', (req, res) => {
    const { table_no, items, total_amount, payment_status } = req.body;

    // Items array ko JSON string mein convert karna taaki database mein save ho sake
    const itemsString = JSON.stringify(items);

    const query = "INSERT INTO orders (table_no, items, total_amount, payment_status) VALUES (?, ?, ?, ?)";
    
    db.query(query, [table_no, itemsString, total_amount, payment_status || 'Pending'], (err, result) => {
        if (err) {
            console.error("Error saving order:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        res.status(201).json({ 
            success: true, 
            message: "Order saved successfully!", 
            orderId: result.insertId 
        });
    });
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL successfully!');
});

// Endpoint to save orders from index.html
app.post('/api/orders', (req, res) => {
    const { table_no, items, total_amount, payment_status } = req.body;
    const query = 'INSERT INTO orders (table_no, items, total_amount, payment_status) VALUES (?, ?, ?, ?)';
    
    db.query(query, [table_no, JSON.stringify(items), total_amount, payment_status], (err, result) => {
        if (err) {
            console.error('Error saving order:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Order saved to MySQL!', orderId: result.insertId });
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});