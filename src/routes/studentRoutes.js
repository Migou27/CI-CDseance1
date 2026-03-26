const express = require('express');
const router = express.Router();
const studentsData = require('../data/studentsData');

// 1. GET /students/stats (DOIT ÊTRE AVANT /:id)
router.get('/stats', (req, res) => {
    res.status(200).json(studentsData.getStats());
});

// 2. GET /students/search (DOIT ÊTRE AVANT /:id)
router.get('/search', (req, res) => {
    const q = req.query.q;
    if (!q || q.trim() === '') {
        return res.status(400).json({ error: 'Le paramètre de recherche "q" est manquant ou vide' });
    }
    res.status(200).json(studentsData.search(q));
});

// 3. GET /students
router.get('/', (req, res) => {
    res.status(200).json(studentsData.getAll());
});

// 4. POST /students
router.post('/', (req, res) => {
    const result = studentsData.create(req.body);
    if (result.hasConflict) return res.status(409).json({ errors: result.errors });
    if (result.errors) return res.status(400).json({ errors: result.errors });
    res.status(201).json(result.student);
});

// Middleware local pour vérifier que l'ID est un nombre valide
const validateId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'L\'ID doit être un nombre valide' });
    req.studentId = id;
    next();
};

// 5. GET /students/:id
router.get('/:id', validateId, (req, res) => {
    const student = studentsData.getById(req.studentId);
    if (!student) return res.status(404).json({ error: 'Étudiant non trouvé' });
    res.status(200).json(student);
});

// 6. PUT /students/:id
router.put('/:id', validateId, (req, res) => {
    const result = studentsData.update(req.studentId, req.body);
    if (result.notFound) return res.status(404).json({ error: 'Étudiant non trouvé' });
    if (result.hasConflict) return res.status(409).json({ errors: result.errors });
    if (result.errors) return res.status(400).json({ errors: result.errors });
    res.status(200).json(result.student);
});

// 7. DELETE /students/:id
router.delete('/:id', validateId, (req, res) => {
    const result = studentsData.remove(req.studentId);
    if (result.notFound) return res.status(404).json({ error: 'Étudiant non trouvé' });
    res.status(200).json({ message: 'Étudiant supprimé avec succès' });
});

module.exports = router;