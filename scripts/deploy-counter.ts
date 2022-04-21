import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

async function deploy() {
    // get contract factory
    const counterContract = await ethers.getContractFactory("Counter");

    // deploy contract
    const counter =  await counterContract.deploy();

    // ensure deployed
    await counter.deployed();
    
    console.log(await counter.count());
    // 0x5FbDB2315678afecb367f032d93F642f64180aa3
}

deploy();