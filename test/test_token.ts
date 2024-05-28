import { BigNumber } from "ethers";
import * as chai from 'chai';
const chaiAsPromised = require('chai-as-promised');
import { ethers } from 'hardhat';

chai.use(chaiAsPromised);

describe('', function () {
    it('Owner is deploy for STMan', async function () {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("STMan");
        const token = await Token.deploy();

        const ownerAddress = await token.owner();
        chai.expect(ownerAddress).equals(owner.address);
    });
});