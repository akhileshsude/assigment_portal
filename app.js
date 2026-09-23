const express = require('express');
const pool = require('./db');

const PORT = 3000;

const app = express();

app.use(express.json())

app.post('/assignments', async (req,res) => {
    try{
        const { title, deadline } = req.body;
        let result = await pool.query(
            `INSERT INTO assignments(title, deadline)
                VALUES($1, $2)
                RETURNING *`,
                [title, deadline]
        );
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            errorMessage: 'Server Failed'
        });2
    }
});

app.get('/assignments', async(req, res)=>{
    try{
        let result = await pool.query(`SELECT * FROM assignments ORDER BY id desc`)
        res.status(200).json(result.rows)
    }catch(err){
        console.log(err)
        res.status(500).json({err:"Server Failed"})
    }
})

app.listen(PORT, () => {
    console.log('Server running on port 3000');
})