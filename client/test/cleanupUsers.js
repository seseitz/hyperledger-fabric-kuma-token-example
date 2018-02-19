const fs = require('fs-extra');
const path = require('path');

const createUser = require('./../utils/create-user');

module.exports = async (users) => {
    // cleanup test-users
    for (const userName of users) {
        console.log(`Cleaning up user ${userName}`);
        const userInfo = await createUser({name: userName});
        await fs.remove(path.resolve(__dirname, `../../network/generated/crypto-config/auth.kunstmaan.be/users/${userInfo.name}.auth.kunstmaan.be/`));
        await fs.remove(path.resolve(__dirname, `../../network/generated/hfc-key-store/${userInfo.name}`));
        await fs.remove(path.resolve(__dirname, `../../network/generated/hfc-key-store/${userInfo.enrollment.signingIdentity}-priv`));
        await fs.remove(path.resolve(__dirname, `../../network/generated/hfc-key-store/${userInfo.enrollment.signingIdentity}-pub`));
    }
};
