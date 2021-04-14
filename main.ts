import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('infoStudent')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBoxMin: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box-min")!;
const inputSearchBoxMax: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box-max")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderInfoStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderInfoStudentInTable(info: Student): void {
  console.log('Desplegando cursos');

  let trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Código</td><td>${info.codigo}</td>`;
  studentTbody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Cédula</td><td>${info.cedula}</td>`;
  studentTbody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Edad</td><td>${info.edad}</td>`;
  studentTbody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Dirección</td><td>${info.direccion}</td>`;
  studentTbody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Teléfono</td><td>${info.telefono}</td>`;
  studentTbody.appendChild(trElement);
}


function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.match(nameKey));
}

function applyFilterByCredits() {
  let minInput = inputSearchBoxMin.value;
  let maxInput = inputSearchBoxMax.value;
  minInput = (minInput == '') ? '0' : minInput;
  maxInput = (maxInput == '') ? '10' : maxInput;
  let min = Number(minInput);
  let max = Number(maxInput);
  min = (min < 0) ? 0 : min;
  max = (max > 10) ? 10 : max;
  if (min > max) {
    clearCoursesInTable();
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Rango inválido: El mínimo no puede ser mayor al máximo</td>`;
    coursesTbody.appendChild(trElement);
  }
  else{
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
  renderCoursesInTable(coursesFiltered);}
}

function searchCourseByCredits(minKey: number, maxKey: number, courses: Course[]) {
  return (minKey === 0 && maxKey === 10) ? dataCourses : courses.filter(c =>
    (c.credits >= minKey && c.credits <= maxKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);

    }
  }
}