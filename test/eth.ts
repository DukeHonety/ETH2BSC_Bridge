import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Seasonal Bridge Test eth network", () => {
  const adminAddress = "0xF5EB5549306b4c05B7D40b91500d3eB440c4576a";
  let Token;
  let ethBridgeContract: Contract, deployer: SignerWithAddress;
  describe("Deploy", () => {
    it("Should deploy the contracts", async () => {
      [deployer] = await ethers.getSigners();
      console.log("deployer: ", deployer.address);
      console.log("admin: ", adminAddress);
      Token = await ethers.getContractFactory("EthBridge");
      ethBridgeContract = await Token.deploy(adminAddress);
      console.log("ethBridgeContract address: ", ethBridgeContract.address);
      console.log(
        "ethBridgeContract verify: ",
        `npx hardhat verify --contract "contracts/EthBridge.sol:EthBridge" --network mainnet ${ethBridgeContract.address} ${adminAddress}`
      );
    });
  });
});
