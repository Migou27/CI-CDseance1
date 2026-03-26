const express = require('express');
const router = express.Router();
const studentsData = require('../data/studentsData');

router.post('/', (req, res) => {
    const result = studentsData.create(req.body);
    if (result.errors) return res.status(400).json({ errors: result.errors });
    res.status(201).json(result.student);
});

router.get('/', (req, res) => {
    res.json(studentsData.getAll());
});

router.get('/:id', (req, res) => {
    const student = studentsData.getById(parseInt(req.params.id));
    if (!student) return res.status(404).json({ error: 'Étudiant non trouvé' });
    res.json(student);
});

router.put('/:id', (req, res) => {
    const result = studentsData.update(parseInt(req.params.id), req.body);
    if (result.notFound) return res.status(404).json({ error: 'Étudiant non trouvé' });
    if (result.errors) return res.status(400).json({ errors: result.errors });
    res.json(result.student);
});

router.delete('/:id', (req, res) => {
    const result = studentsData.remove(parseInt(req.params.id));
    if (result.notFound) return res.status(404).json({ error: 'Étudiant non trouvé' });
    res.status(204).send();
});

module.exports = router;