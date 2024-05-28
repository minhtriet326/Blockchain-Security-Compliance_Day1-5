const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Access Control", () => {
    let deployer: { address: any; }, attacker: any, user: { address: any; };

    beforeEach(async function () {
        [deployer, attacker, user] = await ethers.getSigners();
        const MyPets = await ethers.getContractFactory("MyPets", deployer);
        this.myPets = await MyPets.deploy("Lu");
    });
    describe("My Pets", () => {
        it("Should set dog name at deployment", async function () {
            expect(await this.myPets.MyDog()).to.eq("Lu");
            //Vì thuộc tính MyDog là public nên solidity nó tự tạo ra hàm getMyDog(tức MyDog() ở trên)
        });

        it("Should set the deployer account as owner", async function () {
            expect(await this.myPets.owner()).to.eq(deployer.address);
        });

        it("Should be for owner to change the dog name", async function () {
            await this.myPets.updateDog("abc");
            expect(await this.myPets.MyDog()).to.eq("abc");
        })

        it("Should not be able to change dog name if not the owner", async function () {
            await expect(this.myPets.connect(attacker).updateDog("abc")).to.be.revertedWith("Ownable: caller is not the owner");
        })


        it("Should be possible for owner to transfer ownership", async function () {
            await this.myPets.transferOwnership(user.address);
            expect(await this.myPets.owner()).to.eq(user.address);
        })

        it("Should be possible for the new owner to update dog name", async function () {
            await this.myPets.transferOwnership(user.address);
            await this.myPets.connect(user).updateDog("kiki");
            expect(await this.myPets.MyDog()).to.eq("kiki");
        })

        it("Should not be possible for others to transfer ownership", async function () {
            await expect(this.myPets.connect(user).transferOwnership(attacker.address)).to.be.revertedWith("Ownable: caller is not the owner");
        })
    });
})