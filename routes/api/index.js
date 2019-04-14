const express = require('express');
const router = express.Router();

const indexController = require('../../controllers/index_controller');

router.get('/', indexController.index);

router.post('/add_user/:email', indexController.add_user);

router.post('/add_ideas/:email', indexController.add_ideas);

router.get('/show_all_ideas/:email', indexController.show_all_ideas);

router.delete('/delete_ideas/:email/:id', indexController.delete_ideas);

router.post('/edit_ideas/:email/:id', indexController.edit_ideas);

module.exports = router;