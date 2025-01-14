document.addEventListener('DOMContentLoaded', function() {
    let isCalculated = false;

    document.getElementById('addSubjectButton').addEventListener('click', function() {
        const subjectsTableBody = document.getElementById('subjectsTableBody');
        const newRow = document.createElement('tr');
        newRow.classList.add('subject');
        newRow.innerHTML = `
            <td><button type="button" class="removeSubjectButton">✖</button></td>
            <td><input type="text" name="subjectName" placeholder="ชื่อวิชา"></td>
            <td><input type="number" name="subjectCredits" placeholder="หน่วยกิต"></td>
        `;
        subjectsTableBody.insertBefore(newRow, subjectsTableBody.lastElementChild);
        addRemoveSubjectEvent();
        if (isCalculated) {
            addInputEvent();
        }
    });

    function addRemoveSubjectEvent() {
        const removeButtons = document.querySelectorAll('.removeSubjectButton');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const subjects = document.querySelectorAll('.subject');
                if (subjects.length > 1) {
                    button.closest('tr').remove();
                    if (isCalculated) {
                        calculateResults();
                    }
                } else {
                    alert("ต้องมีรายวิชาอย่างน้อยหนึ่งวิชา");
                }
            });
        });
    }

    function addInputEvent() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', calculateResults);
        });
    }

    addRemoveSubjectEvent();

    document.getElementById('resetFormButton').addEventListener('click', function() {
        document.getElementById('gradeForm').reset();
        document.getElementById('subjectsTableBody').innerHTML = `
            <tr class="subject">
                <td><button type="button" class="removeSubjectButton">✖</button></td>
                <td><input type="text" name="subjectName" placeholder="ชื่อวิชา"></td>
                <td><input type="number" name="subjectCredits" placeholder="หน่วยกิต"></td>
            </tr>
            <tr class="subject">
                <td><button type="button" class="removeSubjectButton">✖</button></td>
                <td><input type="text" name="subjectName" placeholder="ชื่อวิชา"></td>
                <td><input type="number" name="subjectCredits" placeholder="หน่วยกิต"></td>
            </tr>
            <tr class="subject">
                <td><button type="button" class="removeSubjectButton">✖</button></td>
                <td><input type="text" name="subjectName" placeholder="ชื่อวิชา"></td>
                <td><input type="number" name="subjectCredits" placeholder="หน่วยกิต"></td>
            </tr>
            <tr class="subject">
                <td><button type="button" class="removeSubjectButton">✖</button></td>
                <td><input type="text" name="subjectName" placeholder="ชื่อวิชา"></td>
                <td><input type="number" name="subjectCredits" placeholder="หน่วยกิต"></td>
            </tr>
            <tr class="subject">
                <td><button type="button" class="removeSubjectButton">✖</button></td>
                <td><input type="text" name="subjectName" placeholder="ชื่อวิชา"></td>
                <td><input type="number" name="subjectCredits" placeholder="หน่วยกิต"></td>
            </tr>
            <tr>
                <td colspan="3"><button type="button" id="addSubjectButton" class="addSubjectButton"><i class="fas fa-plus"></i> เพิ่มรายวิชา</button></td>
            </tr>
        `;
        addRemoveSubjectEvent();
        if (isCalculated) {
            addInputEvent();
        }
        document.getElementById('result').innerHTML = '';
        document.getElementById('summary').innerHTML = '';
        isCalculated = false;
    });

    document.getElementById('gradeForm').addEventListener('submit', function(event) {
        event.preventDefault();
        calculateResults();
        if (!isCalculated) {
            addInputEvent();
            isCalculated = true;
        }
    });

    function calculateResults() {
        const currentGPA = parseFloat(document.getElementById('currentGPA').value);
        const currentCredits = parseInt(document.getElementById('currentCredits').value);
        const desiredGPA = parseFloat(document.getElementById('desiredGPA').value);
        const subjects = document.querySelectorAll('.subject');
        let newCredits = 0;
        let requiredGradePoints = 0;
        let subjectDetails = [];

        subjects.forEach(subject => {
            const subjectName = subject.querySelector('input[name="subjectName"]').value;
            const subjectCredits = parseInt(subject.querySelector('input[name="subjectCredits"]').value);
            if (!isNaN(subjectCredits) && subjectCredits > 0) {
                newCredits += subjectCredits;
                subjectDetails.push({ name: subjectName, credits: subjectCredits });
            }
        });

        if (newCredits === 0) {
            document.getElementById('result').textContent = "กรุณากรอกหน่วยกิตอย่างน้อยหนึ่งวิชา.";
            return;
        }

        const totalCredits = currentCredits + newCredits;
        requiredGradePoints = (desiredGPA * totalCredits) - (currentGPA * currentCredits);
        const requiredGradePerCredit = requiredGradePoints / newCredits;

        const gradeMapping = [
            { grade: 'A', points: 4.0, minScore: 80, maxScore: 100 },
            { grade: 'B+', points: 3.5, minScore: 75, maxScore: 79 },
            { grade: 'B', points: 3.0, minScore: 70, maxScore: 74 },
            { grade: 'C+', points: 2.5, minScore: 65, maxScore: 69 },
            { grade: 'C', points: 2.0, minScore: 60, maxScore: 64 },
            { grade: 'D+', points: 1.5, minScore: 55, maxScore: 59 },
            { grade: 'D', points: 1.0, minScore: 50, maxScore: 54 },
            { grade: 'F', points: 0.0, minScore: 0, maxScore: 49 }
        ];

        let resultHTML = '';
        if (requiredGradePerCredit > 4.0) {
            if (currentGPA < 2.0) {
                resultHTML = "<p>ไม่สามารถทำเกรดเฉลี่ยที่ต้องการได้เพราะเกรดเฉลี่ยปัจจุบันต่ำเกินไป.</p>";
            } else {
                resultHTML = "<p>ไม่สามารถทำเกรดเฉลี่ยที่ต้องการได้เพราะต้องลงทะเบียนเรียนมากกว่านี้.</p>";
            }
        } else {
            resultHTML = '<table><thead><tr><th>ชื่อวิชา</th><th>หน่วยกิต</th><th>เกรดขั้นต่ำที่ต้องทำ</th><th>คะแนนขั้นต่ำที่ต้องทำ</th></tr></thead><tbody>';
            subjectDetails.forEach(subject => {
                const requiredGradePoints = requiredGradePerCredit * subject.credits;
                const gradeInfo = gradeMapping.find(grade => requiredGradePoints >= grade.points * subject.credits);
                const minScore = gradeInfo.minScore;
                resultHTML += `<tr><td>${subject.name}</td><td>${subject.credits}</td><td>${gradeInfo.grade}</td><td>${minScore}</td></tr>`;
            });
            resultHTML += '</tbody></table>';
        }

        document.getElementById('result').innerHTML = resultHTML;

        const summaryHTML = `
            <p>หน่วยกิต: ${newCredits} | หน่วยกิตรวม: ${totalCredits}</p>
            <p><span class="highlight-summary">GPA รวมของเทอมที่ขั้นต่ำต้องทำ: ${requiredGradePerCredit.toFixed(2)}</span></p>
        `;
        document.getElementById('summary').innerHTML = summaryHTML;
    }

    // Save data to local storage
    document.getElementById('saveDataButton').addEventListener('click', function() {
        const currentGPA = document.getElementById('currentGPA').value;
        const currentCredits = document.getElementById('currentCredits').value;
        const desiredGPA = document.getElementById('desiredGPA').value;
        const subjects = [];
        document.querySelectorAll('.subject').forEach(subject => {
            const subjectName = subject.querySelector('input[name="subjectName"]').value;
            const subjectCredits = subject.querySelector('input[name="subjectCredits"]').value;
            subjects.push({ name: subjectName, credits: subjectCredits });
        });
        const data = { currentGPA, currentCredits, desiredGPA, subjects };
        localStorage.setItem('gradeCalculatorData', JSON.stringify(data));
        alert('ข้อมูลถูกบันทึกเรียบร้อยแล้ว 💾');
    });

    // Load data from local storage
    document.getElementById('loadDataButton').addEventListener('click', function() {
        const data = JSON.parse(localStorage.getItem('gradeCalculatorData'));
        if (data) {
            document.getElementById('currentGPA').value = data.currentGPA;
            document.getElementById('currentCredits').value = data.currentCredits;
            document.getElementById('desiredGPA').value = data.desiredGPA;
            const subjectsTableBody = document.getElementById('subjectsTableBody');
            subjectsTableBody.innerHTML = '';
            data.subjects.forEach(subject => {
                const newRow = document.createElement('tr');
                newRow.classList.add('subject');
                newRow.innerHTML = `
                    <td><button type="button" class="removeSubjectButton">✖</button></td>
                    <td><input type="text" name="subjectName" placeholder="ชื่อวิชา" value="${subject.name}"></td>
                    <td><input type="number" name="subjectCredits" placeholder="หน่วยกิต" value="${subject.credits}"></td>
                `;
                subjectsTableBody.appendChild(newRow);
            });
            const addRow = document.createElement('tr');
            addRow.innerHTML = `
                <td colspan="3"><button type="button" id="addSubjectButton" class="addSubjectButton"><i class="fas fa-plus"></i> เพิ่มรายวิชา</button></td>
            `;
            subjectsTableBody.appendChild(addRow);
            addRemoveSubjectEvent();
            addInputEvent();
            calculateResults();
            isCalculated = true;
            alert('ข้อมูลถูกโหลดเรียบร้อยแล้ว 📂');
        } else {
            alert('ไม่พบข้อมูลที่บันทึกไว้ ❌');
        }
    });

    // Update button text on language change
    document.getElementById('languageDropdown').addEventListener('change', function() {
        const selectedLanguage = this.value;
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang');
            element.textContent = translations[selectedLanguage][key];
        });
        const placeholders = document.querySelectorAll('[data-lang-placeholder]');
        placeholders.forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            element.placeholder = translations[selectedLanguage][key];
        });
        document.getElementById('saveDataButton').innerHTML = `<i class="fas fa-save"></i> ${translations[selectedLanguage]['saveData']}`;
        document.getElementById('loadDataButton').innerHTML = `<i class="fas fa-upload"></i> ${translations[selectedLanguage]['loadData']}`;
    });
});
