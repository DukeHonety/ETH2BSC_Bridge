// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, run } from "hardhat";

async function main() {
  const adminAddress = "0xF5EB5549306b4c05B7D40b91500d3eB440c4576a";

  let Token = await ethers.getContractFactory("Spring");
  const springToken = await Token.deploy(adminAddress);
  await springToken.deployed();

  Token = await ethers.getContractFactory("Summer");
  const summerToken = await Token.deploy(adminAddress);
  await summerToken.deployed();

  Token = await ethers.getContractFactory("Autumn");
  const autumnToken = await Token.deploy(adminAddress);
  await autumnToken.deployed();

  Token = await ethers.getContractFactory("Winter");
  const winterToken = await Token.deploy(adminAddress);
  await winterToken.deployed();

  const BscBridgeContract = await ethers.getContractFactory("BscBridge");
  const bscBridgeContract = await BscBridgeContract.deploy(adminAddress);
  await bscBridgeContract.deployed();

  await run("verify:verify", {
    address: springToken.address,
    constructorArguments: [adminAddress],
  });
  await run("verify:verify", {
    address: summerToken.address,
    constructorArguments: [adminAddress],
  });
  await run("verify:verify", {
    address: autumnToken.address,
    constructorArguments: [adminAddress],
  });
  await run("verify:verify", {
    address: winterToken.address,
    constructorArguments: [adminAddress],
  });
  await run("verify:verify", {
    address: bscBridgeContract.address,
    constructorArguments: [adminAddress],
  });
  console.log("springToken: ", springToken.address);
  console.log("summerToken: ", summerToken.address);
  console.log("autumnToken: ", autumnToken.address);
  console.log("winterToken: ", winterToken.address);
  console.log("bscBridgeContract: ", bscBridgeContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
