document.addEventListener('DOMContentLoaded', function() {
    let isCalculated = false;

    function adjustNavbarHeight() {
        const navbar = document.querySelector('.navbar');
        const container = document.querySelector('.container');
        if (window.innerWidth <= 768) {
            navbar.style.height = 'auto';
            container.style.paddingTop = `${navbar.offsetHeight}px`;
            container.style.margin = '0 auto'; // Center container horizontally
        } else {
            navbar.style.height = '60px';
            container.style.paddingTop = '60px';
            container.style.margin = '0'; // Reset margin for larger screens
        }
    }

    window.addEventListener('resize', adjustNavbarHeight);
    adjustNavbarHeight();

    function addSubjectButtonEvent() {
        const addButton = document.getElementById('addSubjectButton');
        if (addButton) {
            addButton.addEventListener('click', function() {
                const subjectsTableBody = document.getElementById('subjectsTableBody');
                const newRow = document.createElement('tr');
                newRow.classList.add('subject');
                newRow.innerHTML = `
                    <td><button type="button" class="removeSubjectButton">✖</button></td>
                    <td><input type="text" name="subjectName" placeholder="ชื่อวิชา"></td>
                    <td><input type="number" name="subjectCredits" placeholder="หน่วยกิต"></td>
                `;
                addSubjectWithAnimation(subjectsTableBody, newRow);
                addRemoveSubjectEvent();
                if (isCalculated) {
                    addInputEvent();
                }
            });
        }
    }

    document.getElementById('addSubjectButton').addEventListener('click', function() {
        const subjectsTableBody = document.getElementById('subjectsTableBody');
        const newRow = document.createElement('tr');
        newRow.classList.add('subject');
        newRow.innerHTML = `
            <td><button type="button" class="removeSubjectButton">✖</button></td>
            <td><input type="text" name="subjectName" placeholder="ชื่อวิชา"></td>
            <td><input type="number" name="subjectCredits" placeholder="หน่วยกิต"></td>
        `;
        addSubjectWithAnimation(subjectsTableBody, newRow);
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
                    // Remove auto recalculation after removing subject
                    if (isCalculated) {
                        document.getElementById('result').innerHTML = '';
                        document.getElementById('summary').innerHTML = '';
                    }
                } else {
                    alert("ต้องมีรายวิชาอย่างน้อยหนึ่งวิชา");
                }
            });
        });
    }

    function addInputEvent() {
        // Remove auto calculation on input change
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.removeEventListener('input', calculateResults);
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
        addSubjectButtonEvent(); // Add this line
        if (isCalculated) {
            addInputEvent();
        }
        document.getElementById('result').innerHTML = '';
        document.getElementById('summary').innerHTML = '';
        isCalculated = false;
        adjustNavbarHeight(); // Adjust navbar height after reset
    });

    document.getElementById('gradeForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Form submitted");
        calculateResults();
        if (!isCalculated) {
            addInputEvent();
            isCalculated = true;
        }
    });

    // เพิ่ม translations สำหรับผลลัพธ์
    const resultTranslations = {
        th: {
            subjectNameHeader: "ชื่อวิชา",
            creditsHeader: "หน่วยกิต",
            suggestedGradeHeader: "เกรดที่แนะนำ",
            minScoreHeader: "คะแนนขั้นต่ำ",
            termGPA: "GPA ของเทอมนี้",
            calculatedGPAX: "GPAX ที่จะได้",
            targetGPAX: "GPAX ที่ต้องการ",
            successMessage: "✅ เกรดที่แนะนำจะทำให้ได้ GPAX ตามที่ต้องการ",
            warningMessage: "⚠️ เกรดที่แนะนำยังไม่เพียงพอต่อ GPAX ที่ต้องการ",
            credits: "หน่วยกิต",
            totalCredits: "หน่วยกิตรวม",
            lowGPAWarning: "ไม่สามารถทำเกรดเฉลี่ยที่ต้องการได้เพราะเกรดเฉลี่ยปัจจุบันต่ำเกินไป",
            needMoreCredits: "ไม่สามารถทำเกรดเฉลี่ยที่ต้องการได้เพราะต้องลงทะเบียนเรียนมากกว่านี้"
        },
        en: {
            subjectNameHeader: "Subject Name",
            creditsHeader: "Credits",
            suggestedGradeHeader: "Suggested Grade",
            minScoreHeader: "Minimum Score",
            termGPA: "Term GPA",
            calculatedGPAX: "Calculated GPAX",
            targetGPAX: "Target GPAX",
            successMessage: "✅ Suggested grades will achieve target GPAX",
            warningMessage: "⚠️ Suggested grades are insufficient for target GPAX",
            credits: "Credits",
            totalCredits: "Total Credits",
            lowGPAWarning: "Unable to achieve desired GPA due to current GPA being too low",
            needMoreCredits: "Unable to achieve desired GPA - need to register for more credits"
        },
        // เพิ่มการแปลสำหรับภาษาอื่นๆ ตามรูปแบบด้านบน...
    };

    function calculateResults() {
        console.log("Calculating results...");
        const currentGPA = parseFloat(document.getElementById('currentGPA').value);
        const currentCredits = parseInt(document.getElementById('currentCredits').value);
        const desiredGPA = parseFloat(document.getElementById('desiredGPA').value);
        const subjects = document.querySelectorAll('.subject');
        let newCredits = 0;
        let requiredGradePoints = 0;
        let subjectDetails = [];

        // Collect subject details
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

        // Calculate optimal grade distribution
        const optimalGrades = calculateOptimalGrades(subjectDetails, requiredGradePoints);

        // เพิ่มการตรวจสอบ GPAX
        const verification = verifyGPAX(
            currentGPA,
            currentCredits,
            desiredGPA,
            optimalGrades
        );

        // Calculate term GPA for suggested grades
        let termGradePoints = 0;
        optimalGrades.forEach(subject => {
            const gradePoints = {
                'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5,
                'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0
            };
            termGradePoints += gradePoints[subject.suggestedGrade] * subject.credits;
        });
        const termGPA = termGradePoints / newCredits;

        const currentLang = document.getElementById('languageDropdown').value;
        const t = resultTranslations[currentLang]; // ใช้การแปลตามภาษาที่เลือก

        let resultHTML = '';
        if (requiredGradePerCredit > 4.0) {
            if (currentGPA < 2.0) {
                resultHTML = `<p>${t.lowGPAWarning}</p>`;
            } else {
                resultHTML = `<p>${t.needMoreCredits}</p>`;
            }
        } else {
            resultHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>${t.subjectNameHeader}</th>
                            <th>${t.creditsHeader}</th>
                            <th>${t.suggestedGradeHeader}</th>
                            <th>${t.minScoreHeader}</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            optimalGrades.forEach((subject, index) => {
                resultHTML += `
                    <tr>
                        <td>${subject.name}</td>
                        <td>${subject.credits}</td>
                        <td>
                            <select class="gradeSelect" data-index="${index}" data-credits="${subject.credits}">
                                ${generateGradeOptions(subject.suggestedGrade)}
                            </select>
                        </td>
                        <td class="minScore">${getMinScoreForGrade(subject.suggestedGrade)}</td>
                    </tr>
                `;
            });
            resultHTML += '</tbody></table>';
            
            // เพิ่มผลการตรวจสอบ GPAX
            resultHTML += `
                <div class="verification-result ${verification.achievable ? 'success' : 'warning'}">
                    <p>${t.termGPA}: ${verification.termGPA.toFixed(2)}</p>
                    <p>${t.calculatedGPAX}: ${verification.calculatedGPAX.toFixed(2)}</p>
                    <p>${t.targetGPAX}: ${desiredGPA.toFixed(2)}</p>
                    <p>${verification.achievable ? t.successMessage : t.warningMessage}</p>
                </div>
            `;
        }

        document.getElementById('result').innerHTML = resultHTML;
        updateSummary(requiredGradePerCredit, newCredits, totalCredits);

        // Add event listeners for grade changes
        document.querySelectorAll('.gradeSelect').forEach(select => {
            select.addEventListener('change', function() {
                updateGradeCalculation(this);
            });
        });

        adjustNavbarHeight();
    }

    function generateGradeOptions(suggestedGrade) {
        const grades = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
        return grades.map(grade => 
            `<option value="${grade}" ${grade === suggestedGrade ? 'selected' : ''}>${grade}</option>`
        ).join('');
    }

    function updateGradeCalculation(select) {
        const selectedGrade = select.value;
        const minScore = getMinScoreForGrade(selectedGrade);
        select.closest('tr').querySelector('.minScore').textContent = minScore;

        // Recalculate GPAX with selected grades
        const subjects = document.querySelectorAll('tr');
        let termPoints = 0;
        let termCredits = 0;
        const gradePoints = {
            'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5,
            'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0
        };

        subjects.forEach(row => {
            const gradeSelect = row.querySelector('.gradeSelect');
            if (gradeSelect) {
                const credits = parseInt(gradeSelect.dataset.credits);
                const grade = gradeSelect.value;
                termPoints += gradePoints[grade] * credits;
                termCredits += credits;
            }
        });

        const currentGPA = parseFloat(document.getElementById('currentGPA').value);
        const currentCredits = parseInt(document.getElementById('currentCredits').value);
        const desiredGPA = parseFloat(document.getElementById('desiredGPA').value);
        
        const termGPA = termPoints / termCredits;
        const totalCredits = currentCredits + termCredits;
        const totalPoints = (currentGPA * currentCredits) + termPoints;
        const calculatedGPAX = totalPoints / totalCredits;

        const currentLang = document.getElementById('languageDropdown').value;
        const t = resultTranslations[currentLang]; // ใช้การแปลตามภาษาที่เลือก

        // Update display
        const verificationDiv = document.querySelector('.verification-result');
        const achievable = calculatedGPAX >= desiredGPA;
        verificationDiv.className = `verification-result ${achievable ? 'success' : 'warning'}`;
        verificationDiv.innerHTML = `
            <p>${t.termGPA}: ${termGPA.toFixed(2)}</p>
            <p>${t.calculatedGPAX}: ${calculatedGPAX.toFixed(2)}</p>
            <p>${t.targetGPAX}: ${desiredGPA}</p>
            <p>${achievable 
                ? t.successMessage
                : t.warningMessage}</p>
        `;

        updateSummary(termGPA, termCredits, totalCredits);
    }

    function calculateOptimalGrades(subjects, requiredPoints) {
        const gradeValues = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D'];
        const gradePoints = {
            'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5,
            'C': 2.0, 'D+': 1.5, 'D': 1.0
        };

        // เริ่มจากเกรดที่ง่ายที่สุดก่อน
        const baseGrade = 'C'; // เริ่มที่เกรด C
        let currentDistribution = subjects.map(subject => ({
            ...subject,
            suggestedGrade: baseGrade
        }));

        // ตรวจสอบ GPAX
        let verification = verifyGPAX(
            parseFloat(document.getElementById('currentGPA').value),
            parseInt(document.getElementById('currentCredits').value),
            parseFloat(document.getElementById('desiredGPA').value),
            currentDistribution
        );

        // ถ้า GPAX ไม่ถึงเป้าหมาย ค่อยๆ เพิ่มเกรดทีละวิชา
        while (!verification.achievable) {
            // หาวิชาที่ควรปรับเกรดขึ้น
            let upgraded = false;
            for (let i = 0; i < currentDistribution.length; i++) {
                const currentGrade = currentDistribution[i].suggestedGrade;
                const currentIndex = gradeValues.indexOf(currentGrade);
                
                if (currentIndex > 0) { // ถ้ายังสามารถเพิ่มเกรดได้
                    // ปรับเกรดขึ้น 1 ระดับ
                    currentDistribution[i].suggestedGrade = gradeValues[currentIndex - 1];
                    upgraded = true;

                    // ตรวจสอบ GPAX อีกครั้ง
                    verification = verifyGPAX(
                        parseFloat(document.getElementById('currentGPA').value),
                        parseInt(document.getElementById('currentCredits').value),
                        parseFloat(document.getElementById('desiredGPA').value),
                        currentDistribution
                    );

                    if (verification.achievable) {
                        break;
                    }
                }
            }

            // ถ้าไม่สามารถปรับเกรดขึ้นได้อีก
            if (!upgraded) {
                break;
            }
        }

        return currentDistribution;
    }

    function getMinScoreForGrade(grade) {
        const minScores = {
            'A': 80, 'B+': 75, 'B': 70, 'C+': 65,
            'C': 60, 'D+': 55, 'D': 50, 'F': 0
        };
        return minScores[grade];
    }

    function updateSummary(requiredGradePerCredit, newCredits, totalCredits) {
        const currentLang = document.getElementById('languageDropdown').value;
        const t = resultTranslations[currentLang]; // ใช้การแปลตามภาษาที่เลือก

        const summaryHTML = `
            <p>${t.credits}: ${newCredits} | ${t.totalCredits}: ${totalCredits}</p>
        `;
        document.getElementById('summary').innerHTML = summaryHTML;
    }

    function verifyGPAX(currentGPA, currentCredits, desiredGPA, suggestedGrades) {
        // คำนวณ GPA ของเทอมที่จะลงทะเบียน
        let totalNewPoints = 0;
        let totalNewCredits = 0;
        
        suggestedGrades.forEach(subject => {
            const gradePoints = {
                'A': 4.0, 'B+': 3.5, 'B': 3.0, 'C+': 2.5,
                'C': 2.0, 'D+': 1.5, 'D': 1.0, 'F': 0.0
            };
            totalNewPoints += gradePoints[subject.suggestedGrade] * subject.credits;
            totalNewCredits += subject.credits;
        });

        // คำนวณ GPAX และ Term GPA
        const totalCredits = currentCredits + totalNewCredits;
        const totalPoints = (currentGPA * currentCredits) + totalNewPoints;
        const calculatedGPAX = totalPoints / totalCredits;
        const termGPA = totalNewPoints / totalNewCredits;

        const achievable = calculatedGPAX >= desiredGPA;

        return {
            achievable,
            calculatedGPAX,
            termGPA,
            message: achievable 
                ? "✅ เกรดที่แนะนำจะทำให้ได้ GPAX ตามที่ต้องการ"
                : `⚠️ เกรดที่แนะนำยังไม่เพียงพอต่อ GPAX ที่ต้องการ (ต้องการ ${desiredGPA.toFixed(2)} แต่จะได้ ${calculatedGPAX.toFixed(2)})`
        };
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
        if (isCalculated) {
            calculateResults(); // คำนวณผลลัพธ์ใหม่เมื่อเปลี่ยนภาษา
        }
    });

    // Add print button event listener
    document.getElementById('printResultsButton').addEventListener('click', function() {
        printResults();
    });

    function printResults() {
        // Clone the result and summary sections
        const resultContent = document.getElementById('result').cloneNode(true);
        const summaryContent = document.getElementById('summary').cloneNode(true);
    
        // Get current values
        const currentGPA = document.getElementById('currentGPA').value;
        const currentCredits = document.getElementById('currentCredits').value;
        const desiredGPA = document.getElementById('desiredGPA').value;
    
        // Create new window
        const printWindow = window.open('', '_blank');
        
        // Replace select elements with span elements showing selected values
        resultContent.querySelectorAll('select').forEach(select => {
            const selectedText = select.options[select.selectedIndex].text;
            const span = document.createElement('span');
            span.textContent = selectedText;
            select.parentNode.replaceChild(span, select);
        });
    
        // Remove any buttons
        resultContent.querySelectorAll('button').forEach(button => button.remove());
    
        // Get current language
        const currentLang = document.getElementById('languageDropdown').value;
        const t = resultTranslations[currentLang];
    
        // Create print content
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>GPA Calculator Results</title>
                <style>
                    @page {
                        size: A4;
                        margin: 1.5cm;
                    }
                    body {
                        font-family: 'Noto Sans KR', sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background: #fff;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        padding: 20px;
                        background: linear-gradient(145deg, #f8f9fb, #ffffff);
                        border-radius: 20px;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                    }
                    .header h1 {
                        color: #2c3e50;
                        font-size: 24px;
                        margin: 0;
                    }
                    .info-box {
                        background: linear-gradient(145deg, #ffffff, #f8f9fb);
                        padding: 20px;
                        border-radius: 15px;
                        margin-bottom: 20px;
                        border: 1px solid #eef2f7;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                        background: #fff;
                    }
                    th, td {
                        border: 1px solid #eef2f7;
                        padding: 12px;
                        text-align: left;
                    }
                    th {
                        background: #f8f9fb;
                        color: #2c3e50;
                    }
                    .verification-result {
                        margin: 20px 0;
                        padding: 20px;
                        border-radius: 15px;
                    }
                    .verification-result.success {
                        background: linear-gradient(145deg, #e8f5e9, #c8e6c9);
                        border: 1px solid #a5d6a7;
                    }
                    .verification-result.warning {
                        background: linear-gradient(145deg, #fff3e0, #ffe0b2);
                        border: 1px solid #ffcc80;
                    }
                    .summary {
                        margin-top: 30px;
                        padding: 20px;
                        background: linear-gradient(145deg, #f8f9fb, #ffffff);
                        border-radius: 15px;
                        border: 1px solid #eef2f7;
                    }
                    @media print {
                        body {
                            print-color-adjust: exact;
                            -webkit-print-color-adjust: exact;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Target GPA Calculator Results</h1>
                    </div>
                    <div class="info-box">
                        <p><strong>Current GPA:</strong> ${currentGPA}</p>
                        <p><strong>Current Credits:</strong> ${currentCredits}</p>
                        <p><strong>Target GPAX:</strong> ${desiredGPA}</p>
                    </div>
                    <div class="results">
                        ${resultContent.innerHTML}
                    </div>
                    <div class="summary">
                        ${summaryContent.innerHTML}
                    </div>
                </div>
            </body>
            </html>
        `;
    
        // Write to print window
        printWindow.document.write(printContent);
        printWindow.document.close();
    
        // Print when everything is loaded
        printWindow.onload = function() {
            requestAnimationFrame(() => {
                printWindow.focus(); // Focus the new window
                printWindow.print(); // Print the window
                printWindow.onafterprint = function() {
                    printWindow.close(); // Close after printing
                };
            });
        };
    }
    
    // Update print button event listener
    document.getElementById('printResultsButton').addEventListener('click', function() {
        if (document.getElementById('result').innerHTML.trim() !== '') {
            printResults();
        } else {
            alert('Please calculate results before printing.');
        }
    });

    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .verification-result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 5px;
        }
        .verification-result.success {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        .verification-result.warning {
            background-color: #fff3cd;
            border: 1px solid #ffeeba;
            color: #856404;
        }
        .loading {
            background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        @keyframes submitting {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        button {
            position: relative;
            overflow: hidden;
        }
        button::before {
            content: '';
            position: absolute;
            top: var(--y, 0);
            left: var(--x, 0);
            width: 200%;
            height: 200%;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            transition: transform 0.3s ease-out;
        }
        button:hover::before {
            transform: translate(-50%, -50%) scale(1);
        }
    `;
    document.head.appendChild(style);

    // Initial setup
    addSubjectButtonEvent();
});

// Add grade mapping as constant at top of file
const gradeMapping = [
    { grade: 'A', points: 4.0, minScore: 80 },
    { grade: 'B+', points: 3.5, minScore: 75 },
    { grade: 'B', points: 3.0, minScore: 70 },
    { grade: 'C+', points: 2.5, minScore: 65 },
    { grade: 'C', points: 2.0, minScore: 60 },
    { grade: 'D+', points: 1.5, minScore: 55 },
    { grade: 'D', points: 1.0, minScore: 50 },
    { grade: 'F', points: 0.0, minScore: 0 }
];

// Add smooth entrance animation for new subjects
function addSubjectWithAnimation(subjectsTableBody, newRow) {
    newRow.style.opacity = '0';
    newRow.style.transform = 'translateY(20px)';
    subjectsTableBody.insertBefore(newRow, subjectsTableBody.lastElementChild);
    
    requestAnimationFrame(() => {
        newRow.style.transition = 'all 0.3s ease-out';
        newRow.style.opacity = '1';
        newRow.style.transform = 'translateY(0)';
    });
}

// Add loading animation
function showLoadingState() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.add('loading'));
}

function hideLoadingState() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('loading'));
}

// Enhance calculate button with animation
document.querySelector('.calculateButton').addEventListener('click', function() {
    this.classList.add('calculating');
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        this.classList.remove('calculating');
        calculateResults();
    }, 500);
});

// Add smooth scroll to results
function scrollToResults() {
    document.getElementById('result').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add floating effect to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// Enhance form submission with animation
const form = document.getElementById('gradeForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    button.classList.add('submitting');
    
    setTimeout(() => {
        calculateResults();
        button.classList.remove('submitting');
        scrollToResults();
    }, 500);
});

// Add event listeners for grade reference buttons
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...

    // Fix grade reference toggle
    const showGradeRefBtn = document.getElementById('showGradeReferenceButton');
    const hideGradeRefBtn = document.getElementById('hideGradeReferenceButton');
    const gradeRef = document.getElementById('gradeReference');

    if (showGradeRefBtn && hideGradeRefBtn && gradeRef) {
        showGradeRefBtn.addEventListener('click', function() {
            gradeRef.style.display = 'block';
            showGradeRefBtn.style.display = 'none';
            hideGradeRefBtn.style.display = 'block';
        });

        hideGradeRefBtn.addEventListener('click', function() {
            gradeRef.style.display = 'none';
            showGradeRefBtn.style.display = 'block';
            hideGradeRefBtn.style.display = 'none';
        });
    }

    // Fix print button
    const printBtn = document.getElementById('printButton');
    if (printBtn) {
        printBtn.addEventListener('click', printResults);
    }
});

// ...existing code...

