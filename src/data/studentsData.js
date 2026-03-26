const initialStudents = [
    { id: 1, firstName: 'Miyabi', lastName: 'Hoshimi', email: 'miyabi.hoshimi@cicd.fr', grade: 5, field: 'mathématiques' },
    { id: 2, firstName: 'Kazuma', lastName: 'Sato', email: 'kazuma.sato@cicd.fr', grade: 16, field: 'informatique' },
    { id: 3, firstName: 'Hidetaka', lastName: 'Miyazaki', email: 'hidetaka.miyazaki@cicd.fr', grade: 19, field: 'informatique' },
    { id: 4, firstName: 'Yu', lastName: 'Narukami', email: 'yu.narukami@cicd.fr', grade: 20, field: 'physique' },
    { id: 5, firstName: 'Rainbow', lastName: 'Dash', email: 'rainbow.dash@cicd.fr', grade: 12, field: 'chimie' },
    { id: 6, firstName: 'Sacha', lastName: 'Ketchum', email: 'sacha.ketchum@cicd.fr', grade: 7, field: 'physique' },
    { id: 7, firstName: 'John', lastName: 'Doe', email: 'john.doe@cicd.fr', grade: 10, field: 'chimie' },
    { id: 8, firstName: 'Mickey', lastName: 'Mouse', email: 'mickey.mouse@cicd.fr', grade: 18, field: 'mathématiques' },
    { id: 9, firstName: 'Dio', lastName: 'Brando', email: 'dio.brando@cicd.fr', grade: 11, field: 'chimie' },
    { id: 10, firstName: 'Captain', lastName: 'Falcon', email: 'captain.falcon@cicd.fr', grade: 17, field: 'physique' }
];

let students = initialStudents.map(student => ({ ...student }));
let nextId = 11;

const validFields = ['informatique', 'mathématiques', 'physique', 'chimie'];

const validateStudent = (data, studentId = null) => {
    const errors = [];
    let hasConflict = false;
    
    if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.trim().length < 2) errors.push('firstName invalide (min 2 caractères)');
    if (!data.lastName || typeof data.lastName !== 'string' || data.lastName.trim().length < 2) errors.push('lastName invalide (min 2 caractères)');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('email invalide');
    } else {
        const emailExists = students.some(s => s.email === data.email && s.id !== studentId);
        if (emailExists) {
            errors.push('email déjà utilisé');
            hasConflict = true;
        }
    }

    if (data.grade === undefined || typeof data.grade !== 'number' || data.grade < 0 || data.grade > 20) {
        errors.push('grade invalide (doit être entre 0 et 20)');
    }

    if (!data.field || !validFields.includes(data.field)) {
        errors.push('field invalide (doit être informatique, mathématiques, physique ou chimie)');
    }

    return { errors, hasConflict };
};

module.exports = {
    getAll: () => students,
    getById: (id) => students.find(s => s.id === id),
    create: (data) => {
        const validation = validateStudent(data);
        if (validation.hasConflict) return { hasConflict: true, errors: validation.errors };
        if (validation.errors.length > 0) return { errors: validation.errors };
        
        const newStudent = { id: nextId++, ...data };
        students.push(newStudent);
        return { student: newStudent };
    },
    update: (id, data) => {
        const index = students.findIndex(s => s.id === id);
        if (index === -1) return { notFound: true };

        const validation = validateStudent(data, id);
        if (validation.hasConflict) return { hasConflict: true, errors: validation.errors };
        if (validation.errors.length > 0) return { errors: validation.errors };

        students[index] = { id, ...data };
        return { student: students[index] };
    },
    remove: (id) => {
        const index = students.findIndex(s => s.id === id);
        if (index === -1) return { notFound: true };

        students.splice(index, 1);
        return { success: true };
    },
    getStats: () => {
        if (students.length === 0) return { totalStudents: 0, averageGrade: 0, studentsByField: {}, bestStudent: null };
        
        const totalStudents = students.length;
        const sumGrades = students.reduce((sum, s) => sum + s.grade, 0);
        const averageGrade = Number((sumGrades / totalStudents).toFixed(2));
        
        const studentsByField = students.reduce((acc, s) => {
            acc[s.field] = (acc[s.field] || 0) + 1;
            return acc;
        }, {});
        
        const bestStudent = [...students].sort((a, b) => b.grade - a.grade)[0];
        
        return { totalStudents, averageGrade, studentsByField, bestStudent };
    },
    search: (query) => {
        const lowerQuery = query.toLowerCase();
        return students.filter(s => 
            s.firstName.toLowerCase().includes(lowerQuery) || 
            s.lastName.toLowerCase().includes(lowerQuery)
        );
    },
    reset: () => {
        students = initialStudents.map(student => ({ ...student }));
        nextId = 11;
    }
};