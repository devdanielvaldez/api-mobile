const sdk = require('../utils/sharetribe');

const showListings = async (req, res) => {
    try {
        const { limit = 5, page = 1 } = req.query;
        sdk.listings.query({ perPage: +limit, page: +page, includes: 'image'}).then(response => {
            if(response.data.data.length == 0) return res.status(404).json({
                ok: true,
                msg: "No existen vehiculos a mostrar"
            })
            return res.status(200)
            .json({
                ok: true,
                data: response.data.data
                    .filter(listing => 
                        listing.id?.uuid &&
                        listing.attributes?.title &&
                        listing.attributes?.price?.amount &&
                        listing.attributes.publicData?.category &&
                        listing.attributes.publicData?.chassis &&
                        listing.attributes.publicData?.color &&
                        listing.attributes.publicData?.door &&
                        listing.attributes.publicData?.fuel &&
                        listing.attributes.publicData?.homeDelivery &&
                        listing.attributes.publicData?.identification &&
                        listing.attributes.publicData?.instantBooking &&
                        listing.attributes.publicData?.insuranceImages?.[0] &&
                        listing.attributes.publicData?.licenseplate &&
                        listing.attributes.publicData?.seat &&
                        listing.attributes.publicData?.transmission &&
                        listing.attributes.publicData?.year
                    )
                    .map(listing => {
                        return {
                            id: listing.id.uuid,
                            title: listing.attributes?.title,
                            price: listing.attributes.price?.amount,
                            category: listing.attributes.publicData?.category,
                            chassis: listing.attributes.publicData?.chassis,
                            color: listing.attributes.publicData?.color,
                            door: listing.attributes.publicData?.door,
                            fuel: listing.attributes.publicData?.fuel,
                            homeDelivery: listing.attributes.publicData?.homeDelivery,
                            identification: listing.attributes.publicData?.identification,
                            instantBooking: listing.attributes.publicData?.instantBooking,
                            image: listing.attributes?.publicData?.insuranceImages?.[0] ?? '',
                            licenseplate: listing.attributes.publicData?.licenseplate,
                            seat: listing.attributes.publicData?.seat,
                            transmission: listing.attributes.publicData?.transmission,
                            year: listing.attributes.publicData?.year
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
    showListings
}