function showPage(pageId, button) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });


    document.getElementById(pageId)
        .classList.add("active-page");


    const buttons =
        document.querySelectorAll(".menu-btn");

    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });


    button.classList.add("active");
}



let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];
let clients = JSON.parse(localStorage.getItem("clients")) || [];


// PULNI FORMATLASH
function formatMoney(number) {
    return Number(number).toLocaleString("uz-UZ") + " so'm";
}


// ==========================
// STATISTIKA
// ==========================

function updateStats() {

    let totalIncome = 0;
    let totalExpense = 0;

    incomes.forEach(function(item) {
        totalIncome += Number(item.amount);
    });

    expenses.forEach(function(item) {
        totalExpense += Number(item.amount);
    });

    let profit = totalIncome - totalExpense;


    document.getElementById("income").textContent =
        formatMoney(totalIncome);

    document.getElementById("expense").textContent =
        formatMoney(totalExpense);

    document.getElementById("profit").textContent =
        formatMoney(profit);
}


// ==========================
// DAROMAD
// ==========================

function addIncome() {

    const nameInput = document.getElementById("incomeName");
    const amountInput = document.getElementById("incomeAmount");

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);


    if (name === "") {
        alert("Daromad nomini kiriting!");
        return;
    }

    if (!amount || amount <= 0) {
        alert("Daromad summasini kiriting!");
        return;
    }


    incomes.push({
        id: Date.now(),
        name: name,
        amount: amount
    });


    localStorage.setItem(
        "incomes",
        JSON.stringify(incomes)
    );


    nameInput.value = "";
    amountInput.value = "";


    renderIncomes();
    updateStats();
}


// DAROMADLARNI CHIQARISH

function renderIncomes() {

    const list = document.getElementById("incomeList");

    list.innerHTML = "";


    incomes.forEach(function(item) {

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>💰 ${item.name}</strong>
            <br>
            ${formatMoney(item.amount)}
            <br>
            <button onclick="deleteIncome(${item.id})"
                    class="delete-btn">
                O'chirish
            </button>
        `;


        list.appendChild(li);
    });
}


// DAROMADNI O'CHIRISH

function deleteIncome(id) {

    incomes = incomes.filter(function(item) {
        return item.id !== id;
    });


    localStorage.setItem(
        "incomes",
        JSON.stringify(incomes)
    );


    renderIncomes();
    updateStats();
}


// ==========================
// XARAJAT
// ==========================

function addExpense() {

    const nameInput = document.getElementById("expenseName");
    const amountInput = document.getElementById("expenseAmount");

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);


    if (name === "") {
        alert("Xarajat nomini kiriting!");
        return;
    }

    if (!amount || amount <= 0) {
        alert("Xarajat summasini kiriting!");
        return;
    }


    expenses.push({
        id: Date.now(),
        name: name,
        amount: amount
    });


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    nameInput.value = "";
    amountInput.value = "";


    renderExpenses();
    updateStats();
}


// XARAJATLARNI CHIQARISH

function renderExpenses() {

    const list = document.getElementById("expenseList");

    list.innerHTML = "";


    expenses.forEach(function(item) {

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>📉 ${item.name}</strong>
            <br>
            ${formatMoney(item.amount)}
            <br>
            <button onclick="deleteExpense(${item.id})"
                    class="delete-btn">
                O'chirish
            </button>
        `;


        list.appendChild(li);
    });
}


// XARAJATNI O'CHIRISH

function deleteExpense(id) {

    expenses = expenses.filter(function(item) {
        return item.id !== id;
    });


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    renderExpenses();
    updateStats();
}


// ==========================
// MAHSULOT
// ==========================

function addProduct() {

    const name =
        document.getElementById("productName").value.trim();

    const price =
        Number(document.getElementById("productPrice").value);

    const count =
        Number(document.getElementById("productCount").value);


    if (!name || price <= 0 || count <= 0) {
        alert("Mahsulot ma'lumotlarini to'g'ri kiriting!");
        return;
    }


    products.push({
        id: Date.now(),
        name: name,
        price: price,
        count: count
    });


    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCount").value = "";


    renderProducts();
}


// MAHSULOTLARNI CHIQARISH

function renderProducts() {

    const list = document.getElementById("productList");

    list.innerHTML = "";


    products.forEach(function(item) {

        const li = document.createElement("li");

        li.innerHTML = `
            📦 <strong>${item.name}</strong>
            <br>
            Narxi: ${formatMoney(item.price)}
            <br>
            Soni: ${item.count}
            <br>
            <button onclick="deleteProduct(${item.id})"
                    class="delete-btn">
                O'chirish
            </button>
        `;


        list.appendChild(li);
    });
}


// MAHSULOTNI O'CHIRISH

function deleteProduct(id) {

    products = products.filter(function(item) {
        return item.id !== id;
    });


    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    renderProducts();
}


// ==========================
// MIJOZ
// ==========================

function addClient() {

    const name =
        document.getElementById("clientName").value.trim();

    const phone =
        document.getElementById("clientPhone").value.trim();


    if (!name || !phone) {
        alert("Mijoz ismi va telefon raqamini kiriting!");
        return;
    }


    clients.push({
        id: Date.now(),
        name: name,
        phone: phone
    });


    localStorage.setItem(
        "clients",
        JSON.stringify(clients)
    );


    document.getElementById("clientName").value = "";
    document.getElementById("clientPhone").value = "";


    renderClients();
}


// MIJOZLARNI CHIQARISH

function renderClients() {

    const list = document.getElementById("clientList");

    list.innerHTML = "";


    clients.forEach(function(item) {

        const li = document.createElement("li");

        li.innerHTML = `
            👤 <strong>${item.name}</strong>
            <br>
            📞 ${item.phone}
            <br>
            <button onclick="deleteClient(${item.id})"
                    class="delete-btn">
                O'chirish
            </button>
        `;


        list.appendChild(li);
    });
}


// MIJOZNI O'CHIRISH

function deleteClient(id) {

    clients = clients.filter(function(item) {
        return item.id !== id;
    });


    localStorage.setItem(
        "clients",
        JSON.stringify(clients)
    );


    renderClients();
}


// ==========================
// DASTUR ISHGA TUSHGANDA
// ==========================

renderIncomes();
renderExpenses();
renderProducts();
renderClients();

updateStats();
function updateDashboard() {

    const clientCount =
        document.getElementById("clientCount");

    if (clientCount) {
        clientCount.textContent = clients.length;
    }


    const incomeDashboard =
        document.getElementById("dashboardIncomeList");

    const expenseDashboard =
        document.getElementById("dashboardExpenseList");


    if (incomeDashboard) {

        incomeDashboard.innerHTML = "";

        incomes.slice(-5).reverse().forEach(function(item) {

            const li = document.createElement("li");

            li.innerHTML =
                "💰 " +
                item.name +
                " — " +
                formatMoney(item.amount);

            incomeDashboard.appendChild(li);
        });
    }


    if (expenseDashboard) {

        expenseDashboard.innerHTML = "";

        expenses.slice(-5).reverse().forEach(function(item) {

            const li = document.createElement("li");

            li.innerHTML =
                "📉 " +
                item.name +
                " — " +
                formatMoney(item.amount);

            expenseDashboard.appendChild(li);
        });
    }
}


updateDashboard();