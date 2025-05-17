
const xlsx = require('xlsx');
const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const{icon, category, amount, date} = req.body;

        if(!category || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }
        const newExpense = new Expense({
        userId, icon, category, amount, date: new Date(date)
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    }catch (error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

/*
exports.addIncome = async (req, res) => {
    console.log(req.body);  // log the incoming data

    const userId = req.user ? req.user.id : null;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    try {
        // ✅ Destructure first!
        const { icon, source, amount, date } = req.body;

        // ✅ Then validate
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (isNaN(amount)) {
            return res.status(400).json({ message: "Amount must be a number" });
        }

        if (isNaN(new Date(date).getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
*/

exports.getAllExpense = async (req, res) => {

    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});
        res.json(expense);
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
}

exports.deleteExpense = async (req, res) => {

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted successfully"});
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

exports.downloadExpenseExcel = async (req, res) => {

    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date: -1});

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
};