const request = require('supertest');
const app = require('../src/app');
const studentsData = require('../src/data/studentsData');

describe('API Étudiants', () => {
    // On réinitialise la mémoire avant chaque test
    beforeEach(() => {
        studentsData.reset();
    });

    const newValidStudent = {
        firstName: 'Grace',
        lastName: 'Howart',
        email: 'grace.howart@edtech.fr',
        grade: 16,
        field: 'informatique'
    };

    describe('GET /api/students', () => {
        it('1. Doit retourner la liste des étudiants initiaux (10 étudiants)', async () => {
            const res = await request(app).get('/api/students');
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(10);
        });
    });

    describe('GET /api/students/:id', () => {
        it('2. Doit retourner un étudiant existant (Code 200)', async () => {
            const res = await request(app).get('/api/students/1');
            expect(res.statusCode).toBe(200);
            expect(res.body.firstName).toBe('Miyabi');
        });

        it('3. Doit retourner 404 si l\'ID n\'existe pas', async () => {
            const res = await request(app).get('/api/students/999');
            expect(res.statusCode).toBe(404);
        });

        it('4. Doit retourner 400 si l\'ID n\'est pas un nombre', async () => {
            const res = await request(app).get('/api/students/abc');
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBeDefined();
        });
    });

    describe('POST /api/students', () => {
        it('5. Doit créer un étudiant valide (Code 201)', async () => {
            const res = await request(app).post('/api/students').send(newValidStudent);
            expect(res.statusCode).toBe(201);
            expect(res.body.id).toBe(11);
            expect(res.body.firstName).toBe('Grace');
        });

        it('6. Doit retourner 400 si validation échoue (ex: prénom trop court)', async () => {
            const res = await request(app).post('/api/students').send({ ...newValidStudent, firstName: 'A' });
            expect(res.statusCode).toBe(400);
        });

        it('7. Doit retourner 409 si l\'email est déjà utilisé', async () => {
            // ada@edtech.fr est l'email de l'étudiant ID 1
            const res = await request(app).post('/api/students').send({ ...newValidStudent, email: 'yu.narukami@cicd.fr' });
            expect(res.statusCode).toBe(409);
        });
    });

    describe('PUT /api/students/:id', () => {
        it('8. Doit mettre à jour un étudiant existant (Code 200)', async () => {
            const res = await request(app).put('/api/students/1').send({ ...newValidStudent, email: 'miyabi.new@cicd.fr' });
            expect(res.statusCode).toBe(200);
            expect(res.body.email).toBe('miyabi.new@cicd.fr');
        });

        it('9. Doit retourner 404 si l\'étudiant à modifier n\'existe pas', async () => {
            const res = await request(app).put('/api/students/999').send(newValidStudent);
            expect(res.statusCode).toBe(404);
        });

        it('10. Doit retourner 409 si le nouvel email est pris par un AUTRE étudiant', async () => {
            const res = await request(app).put('/api/students/1').send({ ...newValidStudent, email: 'yu.narukami@cicd.fr' });
            expect(res.statusCode).toBe(409);
        });
    });

    describe('DELETE /api/students/:id', () => {
        it('11. Doit supprimer un étudiant et renvoyer un message (Code 200)', async () => {
            const res = await request(app).delete('/api/students/1');
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBeDefined();
            
            // Vérification que l'étudiant n'est plus là
            const check = await request(app).get('/api/students/1');
            expect(check.statusCode).toBe(404);
        });

        it('12. Doit retourner 404 si l\'ID à supprimer n\'existe pas', async () => {
            const res = await request(app).delete('/api/students/999');
            expect(res.statusCode).toBe(404);
        });
    });

    describe('GET /api/students/stats', () => {
        it('13. Doit retourner les statistiques correctes (Code 200)', async () => {
            const res = await request(app).get('/api/students/stats');
            expect(res.statusCode).toBe(200);
            expect(res.body.totalStudents).toBe(10);
            expect(res.body.averageGrade).toBe(13.5);
            expect(res.body.studentsByField.informatique).toBe(2);
            expect(res.body.bestStudent.firstName).toBe('Yu');
        });
    });

    describe('GET /api/students/search', () => {
        it('14. Doit retourner les étudiants correspondant à la recherche (insensible à la casse)', async () => {
            const res = await request(app).get('/api/students/search?q=Yu');
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].firstName).toBe('Yu');
        });

        it('15. Doit trouver sur le nom de famille', async () => {
            const res = await request(app).get('/api/students/search?q=Narukami');
            expect(res.statusCode).toBe(200);
            expect(res.body[0].lastName).toBe('Narukami');
        });

        it('16. Doit retourner un tableau vide si aucun résultat', async () => {
            const res = await request(app).get('/api/students/search?q=xyz');
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(0);
        });

        it('17. Doit retourner 400 si le paramètre q est manquant ou vide', async () => {
            const res1 = await request(app).get('/api/students/search');
            expect(res1.statusCode).toBe(400);

            const res2 = await request(app).get('/api/students/search?q=');
            expect(res2.statusCode).toBe(400);
        });
    });

    describe('Bonus : Cas limites, Pagination et Tri', () => {
        it('18. Doit paginer les résultats (limit=2)', async () => {
            const res = await request(app).get('/api/students?page=1&limit=2');
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(2);
        });

        it('19. Doit trier les étudiants par note décroissante', async () => {
            const res = await request(app).get('/api/students?sort=grade&order=desc');
            expect(res.statusCode).toBe(200);
            expect(res.body[0].grade).toBe(20); // Marie Curie a 20
            expect(res.body[2].grade).toBe(18); // Alan Turing a 18
        });

        it('20. Doit accepter un prénom avec caractères spéciaux (tirets, accents)', async () => {
            const specialStudent = {
                firstName: 'Jean-François', lastName: 'O\'Connor', email: 'jfo@edtech.fr',
                grade: 12, field: 'chimie'
            };
            const res = await request(app).post('/api/students').send(specialStudent);
            expect(res.statusCode).toBe(201);
            expect(res.body.firstName).toBe('Jean-François');
        });

        it('21. Doit retourner 400 si le corps de la requête est totalement vide', async () => {
            const res = await request(app).post('/api/students').send({});
            expect(res.statusCode).toBe(400);
            expect(res.body.errors).toBeDefined();
        });
    });
});