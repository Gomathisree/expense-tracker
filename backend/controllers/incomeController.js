
const xlsx = require('xlsx');
const Income = require("../models/Income");

/*exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    if (isNaN(new Date(date))) {
    return res.status(400).json({ message: "Invalid date format" });
}

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    try{
        const{icon, source, amount, date} = req.body;

        if(!source || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }
        const newIncome = new Income({
            userId, icon, source, amount, date: new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome);
    }catch (error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}*/


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


exports.getAllIncome = async (req, res) => {

    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1});
        res.json(income);
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
}

exports.deleteIncome = async (req, res) => {

    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted successfully"});
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

exports.downloadIncomeExcel = async (req, res) => {

    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date: -1});

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
};