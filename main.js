const form = document.getElementById("my-form");

let updatedId;
let updatedLi;

const onDelete = async (_id, li) => {
  await axios
    .delete(
      `https://crudcrud.com/api/d0788287bd0847c7a50be17b3253555e/expenses/${_id}`
    )

    .then(() => li.remove())
    .catch((e) => console.log(e));
};

const onEdit = (_id, expense, description, category, li) => {
  const btn = document.getElementById("submit");
  const exp = document.getElementById("expense");
  const des = document.getElementById("description");
  const cat = document.getElementById("category");

  updatedId = _id;
  updatedLi = li;

  exp.value = expense;
  des.value = description;
  cat.value = category;
  btn.value = "Edit Expense";
};
const createExpense = ({ expense, description, category, _id }) => {
  const userList = document.getElementById("showlist");
  const li = document.createElement("li");
  const del = document.createElement("button");
  const edit = document.createElement("button");

  del.appendChild(document.createTextNode("Delete"));
  del.addEventListener("click", () => onDelete(_id, li));
  edit.appendChild(document.createTextNode("Edit"));
  edit.addEventListener("click", () =>
    onEdit(_id, expense, description, category, li)
  );
  del.style.margin = "5px";
  edit.style.margin = "5px";

  li.appendChild(document.createTextNode(`${expense}  `));
  li.appendChild(document.createTextNode(`${description}  `));
  li.appendChild(document.createTextNode(`${category}`));
  li.appendChild(del);
  li.appendChild(edit);

  userList.appendChild(li);
};

const showExpenses = (expenses) => {
  expenses.forEach((expense) => {
    createExpense(expense);
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("submit");
  const exp = document.getElementById("expense");
  const des = document.getElementById("description");
  const cat = document.getElementById("category");

  const obj = {
    expense: e.target.expense.value,
    description: e.target.description.value,
    category: e.target.category.value,
  };

  if (btn.value === "Add Expense") {
    await axios
      .post(
        "https://crudcrud.com/api/d0788287bd0847c7a50be17b3253555e/expenses",
        obj
      )
      .then((res) => {
        createExpense(res.data);
        exp.value = "";
        des.value = "";
        cat.value = "";
      })
      .catch((e) => console.log(e));
  } else {
    await axios
      .put(
        `https://crudcrud.com/api/d0788287bd0847c7a50be17b3253555e/expenses/${updatedId}`,
        obj
      )
      .then((res) => {
        updatedLi.childNodes[0].nodeValue = obj.expense + "  ";
        updatedLi.childNodes[1].nodeValue = obj.description + "  ";
        updatedLi.childNodes[2].nodeValue = obj.category + "  ";
        exp.value = "";
        des.value = "";
        cat.value = "";
        btn.value = "Add Expense";
      })
      .catch((e) => console.log(e));
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await axios
    .get("https://crudcrud.com/api/d0788287bd0847c7a50be17b3253555e/expenses")
    .then((res) => showExpenses(res.data));
});
