const sdk = require('../utils/sharetribe');

const getMetrics = async (_, res) => {
    try {
        const nUsers = await sdk.users.query({});
        const nListings = await sdk.listings.query({});
        const nTransactions = await sdk.transactions.query({});

        const amountTransactions = nTransactions.data.data.reduce((sum, transaction) => {
                return sum + transaction.attributes.payoutTotal.amount;
        }, 0);

        return res.status(200).json({
            ok: true,
            shortMetrics: {
                users: nUsers.data.data.length,
                listings: nListings.data.data.length,
                transactions: nTransactions.data.data.length,
                amountTransactions: amountTransactions
            },
            charts_transactions: nTransactions.data.data.map(t => {
                return {
                    id: t.id.uuid,
                    type: t.type,
                    amount: t.attributes.payoutTotal.amount,
                    createdAt: t.attributes.createdAt
                }
            })
        });
    } catch (error) {
        console.log('error -->', error);
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado del sistema",
            error: error.message || error
        });
    }
};

module.exports = {
    getMetrics
};
