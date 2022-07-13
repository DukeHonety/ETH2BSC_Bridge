// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, run } from "hardhat";

async function main() {
  const adminAddress = "0xF5EB5549306b4c05B7D40b91500d3eB440c4576a";

  const Token = await ethers.getContractFactory("EthBridge");
  const ethBridgeContract = await Token.deploy(adminAddress);

  await ethBridgeContract.deployed();

  await run("verify:verify", {
    address: ethBridgeContract.address,
    constructorArguments: [adminAddress],
  });
  console.log("ethBridgeContract: ", ethBridgeContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
