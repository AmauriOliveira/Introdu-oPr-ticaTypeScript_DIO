enum Occupation {
  SoftwareEngineer = 'Software Engineer',
  UXDesigner = 'UX Designer',
  WebDeveloper = 'Web Developer',
  MobileDeveloper = 'Mobile Developer',
  DataScientist = 'Data Scientist',
  DataAnalyst = 'Data Analyst',
}

interface Person {
  name: string;
  age: number;
  profession?: Occupation;
}

interface Student extends Person {
  grade: number;
  subjects: string[];
}

const person = {
  name: 'Amauri Oliveira',
  age: 36,
  profession: Occupation.WebDeveloper,
};

const otherPerson: Person = {
  name: 'John Doe',
  age: 27,
  profession: Occupation.DataScientist,
};

const student: Student = {
  name: 'Ana Silva',
  age: 17,
  profession: Occupation.UXDesigner,
  grade: 9,
  subjects: ['Math', 'Science', 'English'],
};

const otherStudent: Student = {
  name: 'Johnny Doe',
  age: 16,
  grade: 8,
  subjects: ['History', 'Science'],
};

function listAll(list: string[]) {
  for (const item of list) {
    console.log(` - ${item}.`);
  }
  console.log('\n');
}

listAll(student.subjects);
listAll(otherStudent.subjects);
