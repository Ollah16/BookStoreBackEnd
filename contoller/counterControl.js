const { Counter } = require("../models/counterModel")

const handleCounts = async (req, res) => {

    try {
        console.log('hi')
        let counts = await Counter.find();
        if (counts.length) {
            await Counter.findOneAndUpdate({ counterRecord: counterRecord++ })
        } else {
            let newCount = Counter({ counterRecord: 1 })
            await newCount.save()
        }
        res.status(200).json({ message: 'Counter updated successfully' });
    } catch (error) {
        console.error('Error updating counter:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { handleCounts }

