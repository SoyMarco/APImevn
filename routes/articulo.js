const express = require('express');
const router = express.Router();
const mySqlCnn = require('../database');

//AGREGAR
router.post('/add', async (req, res) => {
    const { nombre, descripcion } = req.body;
    const newLink = {
    nombre,
    descripcion,
};
await mySqlCnn.query('INSERT INTO articulo set ?', [newLink], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//CONSULTAR
router.get('/query', async (req, res) => {
    const { id } = req.params; 
   await mySqlCnn.query('SELECT * FROM articulo WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });

//LISTAR
router.get('/list', async (req, res) => {
    const links = await mySqlCnn.query('SELECT * FROM articulo', (err, rows, fields) => {
        if(!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
    });  
}); 

//EDITAR
router.put('/update', async (req, res) => {
    const { id, nombre, descripcion} = req.body;
    console.log(req.body);
    console.log(req.id);
  await mySqlCnn.query("UPDATE articulo SET ? WHERE id = ?", [{nombre: nombre, descripcion: descripcion}, id], (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

//ELIMINAR
router.delete('/remove', async (req, res) => {
    const { id } = req.params;
    
   await mySqlCnn.query('DELETE FROM articulo WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'articulo Deleted'});
      } else {
        console.log(err);
      }
    });
  });

//ACTIVAR
router.put('/activar', async (req, res) => {
    const { id } = req.body;
    console.log(id);
  await mySqlCnn.query("UPDATE articulo SET ? WHERE id = ?", [{estado: 1}, id], (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

//DESACTIVAR 
router.put('/desactivar', async (req, res) => {
    const { id } = req.body;
    console.log(id);
  await mySqlCnn.query("UPDATE articulo SET ? WHERE id = ?", [{estado: 2}, id], (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      } 
    });
  });


module.exports = router;