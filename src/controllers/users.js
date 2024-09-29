const sdk = require('../utils/sharetribe');

const showUsers = async (req, res) => {
    try {
        const { limit = 5, page = 1 } = req.query;

        sdk.users.query({ perPage: +limit, page: +page, includes: 'image'}).then(response => {
            if(response.data.data.length == 0) return res.status(404).json({
                ok: true,
                msg: "No existen usuarios a mostrar"
            })
            return res.status(200)
            .json({
                ok: true,
                data: response.data.data.map(users => {
                    return {
                        id: users.id.uuid,
                        banned: users.attributes.banned,
                        deleted: users.attributes.deleted,
                        email: users.attributes.email,
                        createAt: users.attributes.createdAt,
                        state: users.attributes.state,
                        email_verified: users.attributes.emailVerified,
                        full_name: users.attributes.profile.displayName,
                        driverIdentityStatus: users.attributes.profile?.protectedData?.driverMetaData?.driverIdentityStatus,
                        gender: users.attributes.profile.protectedData?.driverMetaData?.holderDetails?.gender,
                        verificationPhoneNumber: users.attributes.profile?.protectedData?.verifiedPhoneNumber,
                        verification_status: users.attributes.profile?.protectedData?.verification_status,
                        phoneNumber: users.attributes.profile?.protectedData?.phoneNumber
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
    showUsers
}