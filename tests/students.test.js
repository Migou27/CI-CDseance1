const request = require('supertest');
const app = require('../src/app');
const studentsData = require('../src/data/studentsData'); // Ajout de l'import des données

describe('API Étudiants', () => {
    // On réinitialise la mémoire avant chaque test
    beforeEach(() => {
        studentsData.reset();
    });

    const validStudent = {
        firstName: 'Jean', lastName: 'Dupont', email: 'jean@dupont.fr',
        grade: 15, field: 'informatique'
    };

    it('1. Doit créer un étudiant valide', async () => {
        const res = await request(app).post('/api/students').send(validStudent);
        expect(res.statusCode).toBe(201);
        expect(res.body.id).toBe(1);
    });

    it('2. Doit rejeter un firstName trop court', async () => {
        const res = await request(app).post('/api/students').send({ ...validStudent, firstName: 'A' });
        expect(res.statusCode).toBe(400);
    });

    it('3. Doit rejeter un lastName trop court', async () => {
        const res = await request(app).post('/api/students').send({ ...validStudent, lastName: 'B' });
        expect(res.statusCode).toBe(400);
    });

    it('4. Doit rejeter un email invalide', async () => {
        const res = await request(app).post('/api/students').send({ ...validStudent, email: 'pas-un-email' });
        expect(res.statusCode).toBe(400);
    });

    it('5. Doit rejeter un email déjà utilisé', async () => {
        await request(app).post('/api/students').send(validStudent);
        const res = await request(app).post('/api/students').send(validStudent);
        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toContain('email déjà utilisé');
    });

    it('6. Doit rejeter une note < 0', async () => {
        const res = await request(app).post('/api/students').send({ ...validStudent, grade: -1 });
        expect(res.statusCode).toBe(400);
    });

    it('7. Doit rejeter une note > 20', async () => {
        const res = await request(app).post('/api/students').send({ ...validStudent, grade: 21 });
        expect(res.statusCode).toBe(400);
    });

    it('8. Doit rejeter une filière (field) non autorisée', async () => {
        const res = await request(app).post('/api/students').send({ ...validStudent, field: 'histoire' });
        expect(res.statusCode).toBe(400);
    });
});

describe('GET /api/students', () => {
    it('9. Doit retourner une liste de 10 étudiants au départ', async () => {
        const res = await request(app).get('/api/students');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([10]);
    });

    it('10. Doit retourner les étudiants créés', async () => {
        await request(app).post('/api/students').send(validStudent);
        const res = await request(app).get('/api/students');
        expect(res.body.length).toBe(1);
    });
});

describe('GET /api/students/:id', () => {
    it('11. Doit retourner un étudiant existant', async () => {
        await request(app).post('/api/students').send(validStudent);
        const res = await request(app).get('/api/students/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.firstName).toBe('Jean');
    });

    it('12. Doit retourner 404 pour un ID inexistant', async () => {
        const res = await request(app).get('/api/students/999');
        expect(res.statusCode).toBe(404);
    });
});

describe('PUT /api/students/:id', () => {
    it('13. Doit mettre à jour un étudiant existant', async () => {
        await request(app).post('/api/students').send(validStudent);
        const res = await request(app).put('/api/students/1').send({ ...validStudent, grade: 18 });
        expect(res.statusCode).toBe(200);
        expect(res.body.grade).toBe(18);
    });
});

describe('DELETE /api/students/:id', () => {
    it('14. Doit supprimer un étudiant existant', async () => {
        await request(app).post('/api/students').send(validStudent);
        const res = await request(app).delete('/api/students/1');
        expect(res.statusCode).toBe(204);
        
        const check = await request(app).get('/api/students');
        expect(check.body.length).toBe(0);
    });

    it('15. Doit retourner 404 lors de la suppression d\'un ID inexistant', async () => {
        const res = await request(app).delete('/api/students/999');
        expect(res.statusCode).toBe(404);
    });
});