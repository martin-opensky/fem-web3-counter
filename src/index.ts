import { ethers } from "ethers";
import CounterContract from "../artifacts/contracts/Counter.sol/Counter.json";

function getMetaMask() {
    // @ts-ignore
    return window.ethereum;
}

async function hasSigners() : Promise<boolean> {
    const metamask = getMetaMask();
    const signers = await (metamask.request({method: 'eth_accounts'}) as Promise<string[]>);
    return signers.length > 0;
}

async function requestAccess() : Promise<boolean> {
    const metamask = getMetaMask();
    const accounts = await (metamask.request({method: 'eth_requestAccounts'}) as Promise<string[]>);

    return accounts && accounts.length > 0;
}

async function getContract() {
    const address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

    if (!(await hasSigners()) && !(await requestAccess())) {
        console.log("You are in trouble, no one wants to play");
    }

    // @ts-ignore
    const contract = new ethers.Contract(
        // process.env.CONTRACT_ADDRESS ,
        "0x537dE6f4322a036221529810345fb0E8ad47F89D",
        CounterContract.abi,
        new ethers.providers.Web3Provider(getMetaMask()).getSigner()
    );

    const el = document.createElement("div");
    async function setCounter(count? : number) {
        el.innerHTML = count || await contract.getCount();
    }
    setCounter();

    const btn = document.createElement("button");
    btn.innerHTML = 'increment';
    btn.onclick = async function() {
        await contract.count();
    }

    // Listen to event
    contract.on(contract.filters.CounterInc(), function(count) {
        setCounter(count);
    })

    document.body.appendChild(el);
    document.body.appendChild(btn);
}

getContract();