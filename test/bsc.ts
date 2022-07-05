import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Seasonal Bridge Bsc test network", () => {
  let Token;

  let springToken: Contract,
    bscBridgeContract: Contract,
    deployer: SignerWithAddress,
    admin: SignerWithAddress;
  describe("Deploy", () => {
    it("Should deploy the contracts", async () => {
      [deployer, admin] = await ethers.getSigners();
      console.log("deployer: ", deployer.address);
      console.log("admin: ", admin.address);
      Token = await ethers.getContractFactory("Spring");
      springToken = await Token.deploy(admin.address);
      console.log("springToken address: ", springToken.address);
      console.log(
        "springToken verify: ",
        `npx hardhat verify --contract "contracts/Spring.sol:Spring" --network bscTestnet ${springToken.address} ${admin.address}`
      );
      const BscBridgeContract = await ethers.getContractFactory("BscBridge");
      bscBridgeContract = await BscBridgeContract.deploy(admin.address);
      console.log("bscBridgeContract address: ", bscBridgeContract.address);
      console.log(
        "bscBridgeContract verify: ",
        `npx hardhat verify --contract "contracts/BscBridge.sol:BscBridge" --network bscTestnet ${bscBridgeContract.address} ${admin.address}`
      );
    });
  });

});
