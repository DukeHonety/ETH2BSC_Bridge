import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Seasonal Bridge Test eth network", () => {
  let Token;

  let springToken: Contract,
    ethBridgeContract: Contract,
    deployer: SignerWithAddress,
    admin: SignerWithAddress;
  describe("Deploy", () => {
    it("Should deploy the contracts", async () => {
      [deployer, admin] = await ethers.getSigners();  //??
      console.log("deployer: ", deployer.address);
      console.log("admin: ", admin.address);
      Token = await ethers.getContractFactory("Spring");
      springToken = await Token.deploy(admin.address);
      console.log("springToken address: ", springToken.address);
      console.log(
        "springToken verify: ",
        `npx hardhat verify --contract "contracts/Spring.sol:Spring" --network rinkeby ${springToken.address} ${admin.address}`
      );
      Token = await ethers.getContractFactory("EthBridge");
      ethBridgeContract = await Token.deploy(admin.address);
      console.log("ethBridgeContract address: ", ethBridgeContract.address);
      console.log(
        "ethBridgeContract verify: ",
        `npx hardhat verify --contract "contracts/EthBridge.sol:EthBridge" --network rinkeby ${ethBridgeContract.address} ${admin.address}`
      );
    });
  });

  describe("Spring Token Mint", () => {
    it("Should mint tokens between accounts", async () => {
      let tx = await springToken
        .connect(admin)
        .mint(deployer.address, "100000000000000000000000000000000000000000");
      await tx.wait();
      tx = await springToken
        .connect(admin)
        .mint(admin.address, "100000000000000000000000000000000000000000");
      await tx.wait();
    });
  });

  describe("Approve Spring Token to EthBridge", () => {
    it("Should approve spring token to ethBridge", async () => {
      const tx = await springToken
        .connect(deployer)
        .approve(
          ethBridgeContract.address,
          "100000000000000000000000000000000000000000"
        );
      await tx.wait();
    });
  });

  describe("Swap Spring Token from Eth", () => {
    it("Should swap spring token from eth", async () => {
      const tx = await ethBridgeContract
        .connect(deployer)
        .swapFromEth(springToken.address, "10000000000000000000");
      await tx.wait();
    });
  });
});
