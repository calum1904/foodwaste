const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DailyWasteSchema = new Schema({
    Date: Date,
    Hour: [{
        Time: String,
        Customers: Number,
        Fillets: Number,
        Wings: Number,
        Chicken: Number,
        Thighs: Number,
        DoubleBreast: Number,
    }],
    Waste: [{
        FilletsWaste: Number,
        WingsWaste: Number,
        ChickenWaste: Number,
        ThighsWaste: Number,
        DoubleBreastWaste: Number,
    }]
});

const Waste = mongoose.model('Waste', DailyWasteSchema);

module.exports = Waste;