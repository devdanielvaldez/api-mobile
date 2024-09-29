const sdk = require('../utils/sharetribe');

const showTransactions = async (req, res) => {
    try {
        const { limit = 5, page = 1 } = req.query;
        sdk.transactions.query({ perPage: +limit, page: +page}).then(response => {
            if(response.data.data.length == 0) return res.status(404).json({
                ok: true,
                msg: "No existen transacciones a mostrar"
            })
            return res.status(200)
            .json({
                ok: true,
                data: response.data.data.map(t => {
                    return {
                        id: t.id.uuid,
                        payoutTotal: t.attributes.payoutTotal.amount,
                        createdAt: t.attributes.createdAt
                    }
                }),
                pagination: response.data.meta
            });
        });
    } catch(error) {
        console.log('error -->', error);
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado del sistema",
            error: error.message || error
        });
    }
}

module.exports = {
    showTransactions
}