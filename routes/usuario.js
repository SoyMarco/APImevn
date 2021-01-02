const express = require('express');
const router = express.Router();
const mySqlCnn = require('../database');
const bcrypt = require('bcryptjs');

//AGREGAR
router.post('/add', async (req, res) => {
    const {
        rol,
        nombre,
        tipo_documento,
        num_documento,
        direccion,
        telefono,
        email,
        password,
    } = req.body;
    let newLink = {
        rol,
        nombre,
        tipo_documento,
        num_documento,
        direccion,
        telefono,
        email,
        password,
    }
newLink.password = await bcrypt.hash(newLink.password, 2);
await mySqlCnn.query('INSERT INTO usuario set ?', [newLink], (err, rows, fields) => {
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
   await mySqlCnn.query('SELECT * FROM usuario WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });

//LISTAR
router.get('/list', async (req, res) => {
    const links = await mySqlCnn.query('SELECT * FROM usuario', (err, rows, fields) => {
        if(!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
    });  
}); 

//EDITAR
router.put('/update', async (req, res) => {
    const newLink = {
        id,
        nombre,
        descripcion,
        password,
    };
    /* VERIFICAR SI SE CAMBIO CONTRASEÑA */
       let pas = newLink.password;
        const reg0 = await mySqlCnn.query('SELECT password FROM usuario WHERE id = ?', [newLink.id], (err, rows, fields) => {
            if (!err) {
                if (pas!=reg0){
                    newLink.password =  bcrypt.hash(newLink.password, 10)}
                     mySqlCnn.query("UPDATE usuario SET ? WHERE id = ?", [{nombre: nombre, descripcion: descripcion}, id], (err, rows, fields) => {
                        if(!err) {
                        res.json({status: 'Usuario Modificado'});
                        } else {
                        console.log(err);
                        }
                    });
            } else {
                console.log(err);
            }
        });
  }); 

//ELIMINAR
router.delete('/remove', async (req, res) => {
    const { id } = req.params;
    
   await mySqlCnn.query('DELETE FROM usuario WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'usuario Deleted'});
      } else {
        console.log(err);
      }
    });
  });

//ACTIVAR
router.put('/activar', async (req, res) => {
    const { id } = req.body;
    console.log(id);
  await mySqlCnn.query("UPDATE usuario SET ? WHERE id = ?", [{estado: 1}, id], (err, rows, fields) => {
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
  await mySqlCnn.query("UPDATE usuario SET ? WHERE id = ?", [{estado: 2}, id], (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      } 
    });
  });

//LOGIN

router.post('/login', async (req, res) => {
    const {id, password
    } = req.body;
    let newLink = { id,password
    };
     await mySqlCnn.query('SELECT * FROM usuario WHERE id = ?', [id], async (err, rows, fields) => {
      try {
           newLink.id = rows[0].id
        newLink.password = rows[0].password
        console.log(newLink);
        if (newLink.id>0) { 
        const match = await bcrypt.compare(password, newLink.password);
        console.log(match)
        if (match){
            res.json('Password CORRECTO');
            console.log('Password CORRECTO');
            }else{
            res.status(404).send({
                message: 'Password INCORRECTO'
            });
            console.log(err);
            console.log('Password INCORRECTO');
             }
        } else {
        res.status(404).send({
            message: 'Usuario NO existe'
        });
        console.log(err);
        console.log('Usuario NO existe');
        }  
      } catch (error) {
        console.log(err);
        console.log('Usuario NO existe');
      }
    });
              
}); 

module.exports = router;