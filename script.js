const calculateMortgage = document.querySelector("#calculateMortgage");
if (calculateMortgage) {
    calculateMortgage.addEventListener("click", calculatePayments);
}


function calculatePayments(e){
    e.preventDefault();
    const mortgageType = document.getElementsByName('mortgageType');
    const container2 = document.querySelector('#container2');
    const annualPercentageRate = Number(document.querySelector("#annualPercentageRate").value);
    const mortgageLoanAmount = Number(document.querySelector("#loanAmount").value);
    const loanTerm = Number(document.querySelector("#loanTerm").value);

    const monthlyRate = (annualPercentageRate/12)/100;
    const generalRate =((1+monthlyRate)**(loanTerm*12)).toFixed(2);

    if (annualPercentageRate<=0|mortgageLoanAmount<=0|loanTerm<=0|  (!mortgageType[0].checked && !mortgageType[1].checked)){
        Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Please, enter your information',
                        
                    })
    }

    else {
        if (mortgageType[0].checked){


        
            solutionAnnuity();
        }
        else {
            solutionDifferentiated();
        }
        
        
        function solutionAnnuity() {

            const element = document.getElementById('container2');
            if (element.hasChildNodes){
                while (element.firstChild){
                    element.removeChild(element.firstChild)
                }
            }
            

            const forButton = document.querySelector('#forButton');
            if (forButton.hasChildNodes){
                while (forButton.firstChild){
                    forButton.removeChild(forButton.firstChild)
                }
            }

            const tableBody = document.querySelector('.tableBody');
            if (tableBody.hasChildNodes){
                while (tableBody.firstChild){
                    tableBody.removeChild(tableBody.firstChild)
                }
            }
            const forTable = document.querySelector('#forTable');
        
            const btn = document.createElement('button');
            btn.id = 'showPayments';
            btn.onclick = function (e) {
                e.preventDefault();

                if (forTable.style.display==='none') {
                    forTable.style.display = 'block';
                }

                else {
                    forTable.style.display = 'none';}
    }
    btn.textContent= 'Show payments';
    btn.classList.add('btn');
    forButton.appendChild(btn);
            const monthlyRate = (annualPercentageRate/12)/100;
            const generalRate =((1+monthlyRate)**(loanTerm*12));
            const monthlyPayment = ((mortgageLoanAmount * monthlyRate * generalRate)/(generalRate-1));
            let debt = mortgageLoanAmount;
            
            const item = document.createElement("li");
            item.innerText = "Monthly payment: " + monthlyPayment.toFixed(0) + " $";
            container2.appendChild(item);
            const overpayment = monthlyPayment * (loanTerm*12) - mortgageLoanAmount;
            const item2 = document.createElement('li');
            item2.innerText = "Total overpayment: " + overpayment.toFixed(0) + " $";
            container2.appendChild(item2);
    
            
            const myTable = document.querySelector('.ptable')
            for (let i=1; i < (loanTerm*12+1); i++){
                const percentage = debt * monthlyRate;
                const main_amount = monthlyPayment - percentage;
                debt = debt - main_amount;
                let new_list = [i, percentage.toFixed(0), main_amount.toFixed(0), monthlyPayment.toFixed(0),debt.toFixed(0)]
                const tr = document.createElement('tr');
                const tableBody = document.querySelector('.tableBody')
                for (let i=0; i<new_list.length; i++) {
                    
                    const td = document.createElement('td');
                    td.textContent = new_list[i];
                    tr.appendChild(td);
                    tableBody.appendChild(tr);
                    
                }
                // myTable.appendChild(tr);     
            }
        }
    
        function solutionDifferentiated(){


            const element = document.getElementById('container2');
            if (element.hasChildNodes){
                while (element.firstChild){
                    element.removeChild(element.firstChild)
                }
            }
            const tableBody = document.querySelector('.tableBody');
            if (tableBody.hasChildNodes){
                while (tableBody.firstChild){
                    tableBody.removeChild(tableBody.firstChild)
                }
            }
            
            const forButton = document.querySelector('#forButton');
            if (forButton.hasChildNodes){
                while (forButton.firstChild){
                    forButton.removeChild(forButton.firstChild)
                }
            }
           
    const forTable = document.querySelector('#forTable');
        
    const btn = document.createElement('button');
    btn.id = 'showPayments';
    btn.onclick = function (e) {
        e.preventDefault();
        if (forTable.style.display==='none') {
            forTable.style.display = 'block';
        }

        else {
            forTable.style.display = 'none';}
    }
    btn.textContent= 'Show payments';
    btn.classList.add('btn');
    forButton.appendChild(btn);
            let overpaymentDifferentiated = 0;
            let debt = mortgageLoanAmount;
            const monthlyRate = (annualPercentageRate/12)/100;
            const myTable = document.querySelector('.ptable')
            for (let i=1; i < (loanTerm*12+1); i++){
                const percentage = debt * monthlyRate;
                let monthlyDebtPayment = mortgageLoanAmount/(loanTerm*12);
                let monthlyPayment = monthlyDebtPayment + percentage;
                debt = debt - monthlyDebtPayment;
                let new_list = [i, monthlyDebtPayment.toFixed(0), percentage.toFixed(0), monthlyPayment.toFixed(0), debt.toFixed(0)];
                overpaymentDifferentiated += monthlyPayment;
                const tableBody = document.querySelector('.tableBody')
                const tr = document.createElement('tr');
                
    
                for (let i=0; i<new_list.length; i++) {
                    
                    const td = document.createElement('td');
                    td.textContent = new_list[i];
                    tr.appendChild(td);
                    tableBody.appendChild(tr);
                    
                    
                }
                // myTable.appendChild(tr);     
            }
            const item = document.createElement("li");
            item.innerText = "Monthly payment changes every month, see the payments";
            container2.appendChild(item);
    
            const totalOverpayment = overpaymentDifferentiated - mortgageLoanAmount;
            
            const item2 = document.createElement('li');
            item2.innerText = "Total overpayment: " + totalOverpayment.toFixed(0) + " $";
            container2.appendChild(item2);
    
        }


    }

}
    
