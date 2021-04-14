import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('infoStudent');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBoxMin = document.getElementById("search-box-min");
var inputSearchBoxMax = document.getElementById("search-box-max");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderInfoStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderInfoStudentInTable(info) {
    console.log('Desplegando cursos');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>C\u00F3digo</td><td>" + info.codigo + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>C\u00E9dula</td><td>" + info.cedula + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Edad</td><td>" + info.edad + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Direcci\u00F3n</td><td>" + info.direccion + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Tel\u00E9fono</td><td>" + info.telefono + "</td>";
    studentTbody.appendChild(trElement);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function applyFilterByCredits() {
    var minInput = inputSearchBoxMin.value;
    var maxInput = inputSearchBoxMax.value;
    minInput = (minInput == '') ? '0' : minInput;
    maxInput = (maxInput == '') ? '10' : maxInput;
    var min = Number(minInput);
    var max = Number(maxInput);
    min = (min < 0) ? 0 : min;
    max = (max > 10) ? 10 : max;
    if (min > max) {
        clearCoursesInTable();
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>Rango inv\u00E1lido: El m\u00EDnimo no puede ser mayor al m\u00E1ximo</td>";
        coursesTbody.appendChild(trElement);
    }
    else {
        clearCoursesInTable();
        var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
        renderCoursesInTable(coursesFiltered);
    }
}
function searchCourseByCredits(minKey, maxKey, courses) {
    return (minKey === 0 && maxKey === 10) ? dataCourses : courses.filter(function (c) {
        return (c.credits >= minKey && c.credits <= maxKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
